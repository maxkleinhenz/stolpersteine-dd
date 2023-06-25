import { GeoJSONSource, GeoJSONSourceSpecification, Map, Marker } from "maplibre-gl";
import { usePositionStore } from "~~/stores/position-store";
import * as turf from "@turf/turf";

function posInRange(p: number) {
  return p >= -90 && p <= 90;
}

const AccuracyPositionSource = "accuracy-position";
const AccuracyPositionLayer = "accuracy-position-circle-layer";
const AccuracyPositionOutlineLayer = "accuracy-position-circle-outline-layer";

export const usePosition = () => {
  const positionStore = usePositionStore();
  let myMap: Map;

  const positionMarker = (() => {
    const el = document.createElement("div");
    el.className = "position-marker";
    const marker = new Marker(el);

    el.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();
      followPosition();
    });

    el.addEventListener("dblclick", (event: MouseEvent) => {
      event.stopPropagation();
      followPosition();
      myMap?.zoomIn({ animate: true });
    });

    return marker;
  })();

  watchEffect(() => {
    const lon = positionStore.position?.longitude;
    const lat = positionStore.position?.latitude;

    if (positionStore.watchActiv && myMap && posInRange(lon) && posInRange(lat)) {
      setMarker(positionStore.position);
    } else {
      positionMarker.remove();
      setAccuracyCircleSource(undefined, undefined);
    }
  });

  function setMarker(position: GeolocationCoordinates) {
    const lon = position?.longitude;
    const lat = position?.latitude;

    positionMarker.setLngLat([lon, lat]).addTo(myMap);
    setAccuracyCircleSource([position.longitude, position.latitude], position.accuracy);

    if (positionStore.followPosition) followPosition();
  }

  function setAccuracyCircleSource(postion: number[] | undefined, radius: number | undefined) {
    if (!myMap) return;

    if (postion === undefined || radius === undefined || radius <= 50) {
      if (myMap.getLayer(AccuracyPositionLayer)) myMap.removeLayer(AccuracyPositionLayer);
      if (myMap.getLayer(AccuracyPositionOutlineLayer)) myMap.removeLayer(AccuracyPositionOutlineLayer);
      if (myMap.getSource(AccuracyPositionSource)) myMap.removeSource(AccuracyPositionSource);
    } else {
      const circle = turf.circle(postion, radius, {
        steps: 64,
        units: "meters",
      });

      const sourceSpec: GeoJSONSourceSpecification = {
        type: "geojson",
        data: circle,
        cluster: false,
      };

      const source = myMap.getSource(AccuracyPositionSource) as GeoJSONSource;
      if (source) {
        source.setData(sourceSpec.data as GeoJSON.GeoJSON);
      } else {
        myMap.addSource(AccuracyPositionSource, sourceSpec);
      }

      // Circle
      if (!myMap.getLayer(AccuracyPositionLayer)) {
        myMap.addLayer({
          id: AccuracyPositionLayer,
          type: "fill",
          source: AccuracyPositionSource,
          paint: {
            "fill-color": "#42a5f5",
            "fill-opacity": 0.2,
          },
        });
      }

      // Outline
      if (!myMap.getLayer(AccuracyPositionOutlineLayer)) {
        myMap.addLayer({
          id: AccuracyPositionOutlineLayer,
          type: "line",
          source: AccuracyPositionSource,
          paint: {
            "line-color": "#42a5f5",
            "line-width": 3,
          },
        });
      }
    }
  }

  function setMap(map: Map) {
    myMap = map;
  }

  function followPosition() {
    positionStore.followPosition = true;
    myMap?.flyTo({
      center: positionMarker.getLngLat(),
      animate: true,
    });
  }

  return { setMap };
};
