<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark q-px-xs"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
    <div id="map" ref="mapContainer"></div>
    <div class="map-controls column absolute-bottom-right">
      <q-btn
        class="q-my-sm"
        size="lg"
        round
        color="white"
        text-color="black"
        icon="add"
        @click="zoomIn"
      ></q-btn>
      <q-btn
        class="q-my-sm"
        size="lg"
        round
        color="white"
        text-color="black"
        icon="remove"
        @click="zoomOut"
      ></q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
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

const store = useStore();
const {
  createMap,
  resize,
  setLayer,
  setStolpersteinSource,
  selectedStolpersteine,
} = useStolpersteinMap();

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

watch(
  () => selectedStolpersteine.value,
  (value) => {
    store.mutations.selectStolpersteine(value);
  }
);

onMounted(() => {
  mapInitializeTimer = setTimeout(function () {
    map = createMap(apiKey, dresden);
    map.on('load', () => {
      setStolpersteinSource(map, stolpersteine.value);
      setLayer(map);
      map.resize();
    });
    map.keyboard.disable();
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

const zoomIn = () => {
  map?.zoomIn({ animate: true });
};
const zoomOut = () => {
  map?.zoomOut({ animate: true });
};
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

.map-controls {
  margin: 90px 20px;

  @media (min-width: $breakpoint-sm-min) {
    margin: 40px 20px;
  }

  @media (min-width: $breakpoint-md-min) {
    margin: 40px 48px;
  }
}
</style>
