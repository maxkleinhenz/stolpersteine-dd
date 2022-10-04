import {
  GeoJSONSource,
  GeoJSONSourceSpecification,
  Map as MaplibreMap,
  Marker,
} from 'maplibre-gl';
import { useQuasar } from 'quasar';
import { usePositionStore } from 'src/store/position-store';
import { computed, ref } from 'vue';
import * as turf from '@turf/turf';

export const usePosition = () => {
  const AccuracyPositionSource = 'accuracy-position';
  const AccuracyPositionLayer = 'accuracy-position-circle-layer';
  const AccuracyPositionOutlineLayer = 'accuracy-position-circle-outline-layer';

  const quasar = useQuasar();
  const store = usePositionStore();
  let mapInstance: MaplibreMap;

  const createSelectedStolpersteinMarker = () => {
    const el = document.createElement('div');
    el.className = 'position-marker';
    const marker = new Marker(el);

    el.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();
      flyToMarkerPostion();
    });

    el.addEventListener('dblclick', (event: MouseEvent) => {
      event.stopPropagation();
      flyToMarkerPostion();
      mapInstance?.zoomIn({ animate: true });
    });

    return marker;
  };
  const positionMarker = createSelectedStolpersteinMarker();

  const watchIdRef = ref<number | undefined>(undefined);
  const watchId = computed({
    get(): number | undefined {
      return watchIdRef.value;
    },
    set(val: number | undefined) {
      watchIdRef.value = val;
      store.watchActiv = !!val;

      if (!val) {
        store.followPosition = false;
        store.position = undefined;
        positionMarker.remove();

        // remove accuracy circle
        setAccuracyCircleSource(undefined, undefined);
      }
    },
  });

  const flyToMarkerPostion = () => {
    store.followPosition = true;
    mapInstance?.flyTo({
      center: positionMarker.getLngLat(),
      animate: true,
    });
  };

  const geolocationSuccess = (position: GeolocationPosition) => {
    store.position = position;
    if (mapInstance) {
      if (store.followPosition) {
        mapInstance.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          animate: true,
        });
      }

      positionMarker
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(mapInstance);

      setAccuracyCircleSource(
        [position.coords.longitude, position.coords.latitude],
        position.coords.accuracy
      );
    }
  };

  const geolocationError = (error: GeolocationPositionError) => {
    if (error.code === 1) {
      quasar.dialog({
        title: 'Standortfreigabe',
        message:
          'Die Standortfreigabe muss erst im Browser für diese Webseite aktiviert werden.',
      });
    } else {
      quasar.dialog({
        title: 'Standort nicht verfügbar',
        message: `Der aktuelle Standort kann zur Zeit nicht ermittelt werden. Error Code = ${error.code}`,
      });
    }
  };

  const setAccuracyCircleSource = (
    postion: number[] | undefined,
    radius: number | undefined
  ) => {
    if (postion === undefined || radius === undefined || radius <= 50) {
      if (mapInstance.getLayer(AccuracyPositionLayer))
        mapInstance.removeLayer(AccuracyPositionLayer);
      if (mapInstance.getLayer(AccuracyPositionOutlineLayer))
        mapInstance.removeLayer(AccuracyPositionOutlineLayer);
      if (mapInstance.getSource(AccuracyPositionSource))
        mapInstance.removeSource(AccuracyPositionSource);
    } else {
      const circle = turf.circle(postion, radius, {
        steps: 64,
        units: 'meters',
      });

      const sourceSpec: GeoJSONSourceSpecification = {
        type: 'geojson',
        data: circle,
        cluster: false,
      };

      const source = mapInstance.getSource(
        AccuracyPositionSource
      ) as GeoJSONSource;
      if (source) {
        source.setData(sourceSpec.data as GeoJSON.GeoJSON);
      } else {
        mapInstance.addSource(AccuracyPositionSource, sourceSpec);
      }

      // Circle
      if (!mapInstance.getLayer(AccuracyPositionLayer)) {
        mapInstance.addLayer({
          id: AccuracyPositionLayer,
          type: 'fill',
          source: AccuracyPositionSource,
          paint: {
            'fill-color': '#42a5f5',
            'fill-opacity': 0.2,
          },
        });
      }

      // Outline
      if (!mapInstance.getLayer(AccuracyPositionOutlineLayer)) {
        mapInstance.addLayer({
          id: AccuracyPositionOutlineLayer,
          type: 'line',
          source: AccuracyPositionSource,
          paint: {
            'line-color': '#42a5f5',
            'line-width': 3,
          },
        });
      }
    }
  };

  const watchPosition = (map: MaplibreMap) => {
    mapInstance = map;

    if (store.watchActiv) {
      flyToMarkerPostion();
    } else if (checkGeolocationSupported()) {
      store.followPosition = true;
      watchId.value = navigator.geolocation.watchPosition(
        geolocationSuccess,
        geolocationError,
        {
          timeout: 10000, // 10 sec
          maximumAge: 60 * 1000, //1 min
        }
      );
    } else {
      clearPositionWatch();
    }
  };

  const checkGeolocationSupported = (): boolean => {
    if (!navigator.geolocation) {
      quasar.dialog({
        title: 'Standort nicht unterstützt',
        message: 'Der Browser unterstützt die Standortabfrage nicht.',
      });
      return false;
    } else {
      return true;
    }
  };

  const clearPositionWatch = () => {
    if (watchId.value) {
      navigator.geolocation.clearWatch(watchId.value);
      watchId.value = undefined;
    }
  };

  return {
    watchPosition,
    clearPositionWatch,
  };
};
