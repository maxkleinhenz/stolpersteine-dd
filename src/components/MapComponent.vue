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
  onActivated,
  onDeactivated,
  computed,
  watch,
} from 'vue';
import { Map as MaplibreMap, LngLat } from 'maplibre-gl';
import { useStolpersteinMap } from 'src/common/StolpersteinMap';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'MapComponent',
  components: {},
  setup() {
    const store = useStore();
    const { createMap, resize, setLayer, setStolpersteinSource } =
      useStolpersteinMap();

    const dresden = new LngLat(13.7372621, 51.0504088);
    const apiKey = process.env.MAPTILER_API_KEY ?? '';

    let map: MaplibreMap;
    let mapInitializeTimer: NodeJS.Timeout;

    const stolpersteine = computed(() => store.getters.filteredStolpersteine());
    watch(
      () => store.getters.filteredStolpersteine(),
      (stolpersteine) => {
        if (map?.isStyleLoaded()) {
          setStolpersteinSource(map, stolpersteine);
        }
      }
    );

    const toggle = computed(() => store.state.isStolpersteinSidebarVisible);
    watch(
      () => toggle.value,
      () => {
        resize(map);
      }
    );

    onMounted(() => {
      mapInitializeTimer = setTimeout(function () {
        map = createMap(apiKey, dresden);
        map.on('load', () => {
          setStolpersteinSource(map, stolpersteine.value);
          setLayer(map);
          //markers = setMarker(map, stolpersteine.value);
          map.resize();
        });
      }, 400);
    });

    onBeforeUnmount(() => {
      clearTimeout(mapInitializeTimer);

      map?.remove();
    });

    onActivated(() => {
      window.addEventListener('resize', onResize);
      onResize();
    });

    onDeactivated(() => {
      window.removeEventListener('resize', onResize);
    });

    const onResize = () => {
      resize(map);
    };

    return {};
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
