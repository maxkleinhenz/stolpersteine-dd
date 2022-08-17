import { Map as MaplibreMap, Marker } from 'maplibre-gl';
import { useQuasar } from 'quasar';
import { usePositionStore } from 'src/store/position-store';
import { computed, ref } from 'vue';

export const usePosition = () => {
  const quasar = useQuasar();
  const store = usePositionStore();
  let mapInstance: MaplibreMap;

  const createSelectedStolpersteinMarker = () => {
    const el = document.createElement('div');
    el.className = 'position-marker';
    return new Marker(el);
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
        positionMarker.remove();
      }
    },
  });

  const geolocationSuccess = (position: GeolocationPosition) => {
    if (mapInstance) {
      if (store.followPosition) {
        mapInstance.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
        });
      }

      positionMarker
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(mapInstance);
    }
  };

  const geolocationError = (error: GeolocationPositionError) => {
    store.followPosition = false;

    if (error.code === 1) {
      quasar.dialog({
        title: 'Standortfreigabe',
        message:
          'Die Standortfreigabe muss erst im Browser für diese Webseite aktiviert werden.',
      });
    } else {
      quasar.dialog({
        title: 'Standort nicht verfügbar',
        message: 'Der aktuelle Standort kann zur Zeit nicht ermittelt werden.',
      });
    }
  };

  const watchLocation = (map: MaplibreMap) => {
    mapInstance = map;

    clearWatch();

    if (checkGeoloctionSupported()) {
      store.followPosition = true;
      watchId.value = navigator.geolocation.watchPosition(
        geolocationSuccess,
        geolocationError,
        {
          timeout: 2000,
        }
      );
    } else {
      watchId.value = undefined;
    }
  };

  const checkGeoloctionSupported = (): boolean => {
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

  const clearWatch = () => {
    if (watchId.value) {
      navigator.geolocation.clearWatch(watchId.value);
      watchId.value = undefined;
    }
  };

  return {
    watchLocation,
    clearWatch,
  };
};
