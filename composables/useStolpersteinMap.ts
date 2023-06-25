import { Point } from "geojson";
import {
  Map as MaplibreMap,
  Marker,
  AttributionControl,
  LngLatLike,
  GeoJSONSource,
  GeoJSONSourceSpecification,
} from "maplibre-gl";
import { GroupedStolpersteinFeature, StolpersteinFeature } from "~~/models/stolperstein.model";
import { useStolpersteinStore } from "~~/stores/stolperstein-store";
import { groupStolpersteinByCoords } from "../utils/stolperstein-utils";

const StolpersteinSource = "stolpersteine";
const StolpersteinClusterLayer = "clusters";
const StolpersteinClusterCountLayer = "cluster-count";
const StolpersteinPointLayer = "stolperstein-point";

interface GroupedGeoJsonFeature extends GroupedStolpersteinFeature {
  type: "Feature";
}

export function useStolpersteinMap() {
  const store = useStolpersteinStore();
  const config = useRuntimeConfig();

  let map: MaplibreMap | undefined;

  function createMap(apiKey: string, center: LngLatLike) {
    map = new MaplibreMap({
      container: "map",
      // style: `https://api.maptiler.com/maps/e79c1d05-b6e6-4dcd-8aad-05d3ec97c7d5/style.json?key=${apiKey}`,
      style: `${config.app.baseURL}map/map-style.json`,
      center: center,
      zoom: 12,
      trackResize: false,
      attributionControl: false,
    });

    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    map.touchPitch.disable();
    map.keyboard.disable();

    map.addControl(
      new AttributionControl({
        customAttribution: '<a href="https://maplibre.org/" target="_blank">© MapLibre</a>',
      }),
      "bottom-right"
    );

    map.on("load", () => {
      initMap(map);
      map?.resize();
      //isLoading.value = false;
    });

    return map;
  }

  const debounceResize = useDebounceFn(
    () => {
      if (map?.loaded) map?.resize();
    },
    500,
    { maxWait: 5000 }
  );

  function initMap(map: MaplibreMap | undefined) {
    if (!map) return;
    const stolpersteine = store.filteredStolpersteine;
    setStolpersteinSource(map, stolpersteine);

    map.loadImage(`${config.app.baseURL}images/stolperstein-glyph.png`, (error, image) => {
      if (error) {
        console.log("error loadimage images/stolperstein-glyph.png", error);
        return;
      }

      if (image) {
        map.addImage("stolperstein-glyph", image);
      }

      initMapImpl(map);
    });
  }

  function initMapImpl(map: MaplibreMap) {
    map.addLayer({
      id: StolpersteinClusterLayer,
      type: "circle",
      source: StolpersteinSource,
      filter: ["has", "point_count"],
      paint: {
        // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
        "circle-color": "#ceb82a",
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    map.addLayer({
      id: StolpersteinClusterCountLayer,
      type: "symbol",
      source: StolpersteinSource,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    map.addLayer({
      id: StolpersteinPointLayer,
      type: "symbol",
      source: StolpersteinSource,
      filter: ["!", ["has", "point_count"]],
      layout: {
        // 'text-field': [
        //   'get',
        //   'id',
        //   [
        //     'get',
        //     'stolperstein',
        //     ['object', ['at', 0, ['array', ['properties']]]],
        //   ],
        // ],

        "icon-image": "stolperstein-glyph",
        "icon-size": 0.2,
        "icon-allow-overlap": true,
      },
    });

    // click handler are executed in order there are registered
    // click on "empty" map -> reset selected stolpersteine
    // click on stolperstein point layer -> set selected stolpersteine
    map.on("click", () => {
      store.selectedStolpersteine = undefined;
    });

    map.on("click", StolpersteinClusterLayer, function (e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [StolpersteinClusterLayer],
      }) as GeoJSON.GeoJSON[];

      const feature = features[0] as GeoJSON.Feature;
      const clusterId = feature?.properties?.cluster_id as number;
      const source = map?.getSource(StolpersteinSource) as GeoJSONSource;
      source.getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;

        map.easeTo({
          center: (feature.geometry as Point).coordinates as LngLatLike,
          zoom: zoom ?? 14,
        });
      });
    });

    map.on("click", StolpersteinPointLayer, function (e) {
      if (!e.features) return;
      e.originalEvent.cancelBubble = true;
      const stolpersteine = <StolpersteinFeature[]>[];

      const proxy = e.features[0].properties as string[];
      const keys = Object.keys(proxy);
      keys.forEach((key) => {
        const e = proxy[key as unknown as number];
        stolpersteine.push(JSON.parse(e) as StolpersteinFeature);
      });
      store.selectedStolpersteine = stolpersteine;
    });

    map.on("mouseenter", StolpersteinClusterLayer, function () {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", StolpersteinClusterLayer, function () {
      map.getCanvas().style.cursor = "";
    });

    map.on("mouseenter", StolpersteinPointLayer, function () {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", StolpersteinPointLayer, function () {
      map.getCanvas().style.cursor = "";
    });
  }

  onUnmounted(() => {
    map?.remove();
  });

  watchEffect(() => {
    setStolpersteinSource(map, store.filteredStolpersteine);
  });

  function setStolpersteinSource(map: MaplibreMap | undefined, stolpersteinFeatures: Array<StolpersteinFeature>) {
    if (!map) return;
    setGroupFeatureSource(map, stolpersteinFeatures, StolpersteinSource);
  }

  function setGroupFeatureSource(
    map: MaplibreMap,
    stolpersteinFeatures: Array<StolpersteinFeature> | undefined,
    sourceId: string,
    cluser = true
  ) {
    const features: Array<GroupedGeoJsonFeature> = [];
    if (stolpersteinFeatures) {
      const group = groupStolpersteinByCoords(stolpersteinFeatures);
      group.forEach((element) => {
        features.push({
          type: "Feature",
          properties: element.properties,
          geometry: element.geometry,
        });
      });
    }

    const sourceSpec: GeoJSONSourceSpecification = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
      cluster: cluser,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    };

    const source = map.getSource(sourceId) as GeoJSONSource;
    if (source) {
      source.setData(sourceSpec.data as GeoJSON.GeoJSON);
    } else {
      map.addSource(sourceId, sourceSpec);
    }
  }

  const selectedStolpersteinMarker = (function () {
    const el = document.createElement("div");
    el.className = "selected-stolperstein-marker";

    const marker = new Marker(el);
    el.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();
      flyToCoords(marker.getLngLat());
    });

    return marker;
  })();

  const selectedStolpersteine = computed(() => store.selectedStolpersteine);
  watchEffect(() => {
    const value = selectedStolpersteine.value;
    selectedStolpersteinMarker.remove();
    // center map on point
    if (map && value && value.length > 0) {
      const geometry = value[0].geometry;
      flyToCoords(geometry.coordinates);

      selectedStolpersteinMarker.setLngLat([geometry.coordinates[0], geometry.coordinates[1]]).addTo(map);
    }
  });

  function flyToCoords(coordinates: LngLatLike) {
    //positionStore.followPosition = false;
    map?.flyTo({
      center: coordinates,
    });
  }

  return { createMap, debounceResize };
}
