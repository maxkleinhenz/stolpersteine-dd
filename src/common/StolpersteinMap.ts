import { Point } from 'geojson';
import {
  Map as MaplibreMap,
  AttributionControl,
  LngLatLike,
  GeoJSONSource,
  GeoJSONSourceSpecification,
} from 'maplibre-gl';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { ref } from 'vue';

const StolpersteinSourceName = 'stolpersteine';
const StolpersteinClusterLayer = 'clusters';
const StolpersteinClusterCountLayer = 'cluster-count';
const StolpersteinPointLayer = 'stolperstein-point';

interface Feature {
  type: 'Feature';
  properties: Array<StolpersteinFeature>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export function useStolpersteinMap() {
  return {
    createMap,
    resize,
    setLayer,
    setStolpersteinSource,
    selectedStolpersteine,
  };
}

const selectedStolpersteine = ref<StolpersteinFeature[] | undefined>(undefined);

const createMap = (apiKey: string, center: LngLatLike): MaplibreMap => {
  const map = new MaplibreMap({
    container: 'map',
    style: `https://api.maptiler.com/maps/e79c1d05-b6e6-4dcd-8aad-05d3ec97c7d5/style.json?key=${apiKey}`,
    center: center,
    zoom: 12,
    trackResize: true,
    attributionControl: false,
  });

  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();
  map.touchPitch.disable();

  map.addControl(
    new AttributionControl({
      customAttribution:
        '<a href="https://maplibre.org/" target="_blank">© MapLibre</a>',
    }),
    'bottom-right'
  );

  return map;
};

const setStolpersteinSource = (
  map: MaplibreMap,
  stolpersteinFeatures: Array<StolpersteinFeature>
): void => {
  if (!map) return;

  const features: Array<Feature> = [];

  stolpersteinFeatures.forEach((stolpersteinFeature) => {
    // check whether response stolperstein coordinates already exists in stolpersteinFeatureCollection
    const existsFeature = features.filter((feature) => {
      return (
        feature.geometry.coordinates[0] ===
          stolpersteinFeature.geometry.coordinates[0] &&
        feature.geometry.coordinates[1] ===
          stolpersteinFeature.geometry.coordinates[1]
      );
    });

    // when feature exists append stolperstein to proterties
    // otherwise create new feature
    if (existsFeature?.length > 0) {
      existsFeature[0].properties.push(stolpersteinFeature);
    } else {
      features.push({
        type: 'Feature',
        properties: [stolpersteinFeature],
        geometry: stolpersteinFeature.geometry,
      });
    }
  });

  const sourceSpec: GeoJSONSourceSpecification = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: features,
    },
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  };

  const source = map.getSource(StolpersteinSourceName) as GeoJSONSource;
  if (source) {
    source.setData(sourceSpec.data as GeoJSON.GeoJSON);
  } else {
    map.addSource(StolpersteinSourceName, sourceSpec);
  }
};

const setLayer = (map: MaplibreMap) => {
  if (!map) return;

  map.loadImage('images/stolperstein-glyph.png', (error, image) => {
    if (error) {
      console.log('error loadimage', error);
      return;
    }
    if (image) {
      map.addImage('stolperstein-glyph', image);
    }
    map.addLayer({
      id: StolpersteinClusterLayer,
      type: 'circle',
      source: StolpersteinSourceName,
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#ceb82a',
          100,
          '#e2c70e',
          750,
          '#e2c70e',
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      },
    });

    map.addLayer({
      id: StolpersteinClusterCountLayer,
      type: 'symbol',
      source: StolpersteinSourceName,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });

    map.addLayer({
      id: StolpersteinPointLayer,
      type: 'symbol',
      source: StolpersteinSourceName,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': 'stolperstein-glyph',
        'icon-size': 0.2,
        'icon-allow-overlap': true,
      },
    });

    // click handeler are executed in order there are registered
    // click on "empty" map -> reset selected stolpersteine
    // click on stolperstein point layer -> set selected stolpersteine
    map.on('click', () => {
      selectedStolpersteine.value = undefined;
    });

    map.on('click', StolpersteinClusterLayer, function (e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [StolpersteinClusterLayer],
      }) as GeoJSON.GeoJSON[];

      const feature = features[0] as GeoJSON.Feature;
      const clusterId = feature?.properties?.cluster_id as number;
      const source = map?.getSource(StolpersteinSourceName) as GeoJSONSource;
      source.getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;

        map.easeTo({
          center: (feature.geometry as Point).coordinates as LngLatLike,
          zoom: zoom ?? 14,
        });
      });
    });

    map.on('click', StolpersteinPointLayer, function (e) {
      if (!e.features) return;
      e.originalEvent.cancelBubble = true;
      const stolpersteine = <StolpersteinFeature[]>[];

      const proxy = e.features[0].properties as string[];
      const keys = Object.keys(proxy);
      keys.forEach((key) => {
        const e = proxy[key as unknown as number];
        stolpersteine.push(JSON.parse(e) as StolpersteinFeature);
      });
      selectedStolpersteine.value = stolpersteine;
    });

    map.on('mouseenter', StolpersteinClusterLayer, function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', StolpersteinClusterLayer, function () {
      map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', StolpersteinPointLayer, function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', StolpersteinPointLayer, function () {
      map.getCanvas().style.cursor = '';
    });
  });
};

const resize = (map: MaplibreMap) => {
  setTimeout(() => {
    if (map?.getCanvas() && map?.getContainer()) {
      map.getCanvas().height = map.getContainer().clientHeight ?? 0;
      map.getCanvas().width = map.getContainer().clientWidth ?? 0;
      map?.resize();
    }
  }, 400);
};
