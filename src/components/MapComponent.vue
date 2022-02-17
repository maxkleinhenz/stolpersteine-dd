<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark q-px-xs"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
    <div id="map" ref="mapContainer"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
  ref,
  onActivated,
} from 'vue';
import {
  Map as MaplibreMap,
  NavigationControl,
  Marker,
  LngLat,
  AttributionControl,
} from 'maplibre-gl';
import Stolperstein from 'src/models/stolperstein.model';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'MapComponent',
  components: {},
  setup() {
    const store = useStore();
    const mapContainer = ref<HTMLDivElement>();
    let canvas: HTMLCanvasElement | undefined;
    let map: MaplibreMap;
    let mapInitializeTimer: NodeJS.Timeout;

    const stolpersteine = ref(
      computed(() => store.getters.filteredStolpersteine())
    );

    const dresden = new LngLat(13.7372621, 51.0504088);
    const stolersteineMarkers = new Map<
      string,
      {
        marker: Marker;
        stolpersteine: Array<Stolperstein>;
      }
    >();

    onMounted(() => {
      console.log('onMounted');

      mapInitializeTimer = setTimeout(function () {
        const apiKey = process.env.MAPTILER_API_KEY ?? '';
        map = new MaplibreMap({
          container: 'map',
          style: `https://api.maptiler.com/maps/e79c1d05-b6e6-4dcd-8aad-05d3ec97c7d5/style.json?key=${apiKey}`,
          center: dresden,
          zoom: 12,
          trackResize: true,
          attributionControl: false,
        });
        map.addControl(
          new AttributionControl({
            customAttribution:
              '<a href="https://maplibre.org/" target="_blank">© MapLibre</a>',
          }),
          'bottom-right'
        );
        map.addControl(
          new NavigationControl({
            showCompass: true,
            showZoom: true,
          }),
          'bottom-right'
        );

        setMarker(stolpersteine.value);
        map.resize();

        canvas = mapContainer.value?.querySelectorAll('canvas')?.item(0);
        window.addEventListener('resize', onResize);
      }, 400);
    });

    onActivated(() => {
      onResize();
    });

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');

      clearTimeout(mapInitializeTimer);
      window.removeEventListener('resize', onResize);
      clearMarkers();
      map?.remove();
    });

    watch(
      () => store.getters.filteredStolpersteine(),
      (stolpersteine) => {
        setMarker(stolpersteine);
      }
    );

    const setMarker = (stolpersteine: Array<Stolperstein>) => {
      clearMarkers();

      if (map == null) return;

      // set new markers
      stolpersteine.forEach((stolperstein) => {
        var m = stolersteineMarkers.get(
          `${stolperstein.point.lon},${stolperstein.point.lat}`
        );
        if (m) {
          m.stolpersteine.push(stolperstein);
        } else {
          var markerElement = document.createElement('button');
          markerElement.className =
            'stolperstein-marker q-btn--actionable q-focusable q-hoverable';
          // markerElement.onclick = function () {
          //   store.commit(
          //     MutationTypes.SELECT_STOLPERSTEINE,
          //     stolersteineMarkers.get(
          //       `${stolperstein.point.lon},${stolperstein.point.lat}`
          //     )?.stolpersteine
          //   );
          // };

          const marker = new Marker({ element: markerElement })
            .setLngLat([stolperstein.point.lon, stolperstein.point.lat])
            .addTo(map);
          stolersteineMarkers.set(
            `${stolperstein.point.lon},${stolperstein.point.lat}`,
            {
              marker: marker,
              stolpersteine: [stolperstein],
            }
          );
        }
      });
    };

    const clearMarkers = () => {
      stolersteineMarkers.forEach((marker) => {
        marker.marker.remove();
      });
      stolersteineMarkers.clear();
    };

    const onResize = () => {
      setTimeout(() => {
        if (canvas) {
          canvas.height = mapContainer.value?.clientHeight ?? 0;
          canvas.width = mapContainer.value?.clientWidth ?? 0;
          map?.resize();
        }
      }, 400);
    };

    return { mapContainer };
  },
});
</script>

<style lang="scss" scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';

.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1 1 100%;
}
.watermark {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: all 0.3s ease-in-out;
}
</style>
