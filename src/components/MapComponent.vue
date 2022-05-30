<template>
  <div class="map-wrap">
    <q-resize-observer :debounce="200" @resize="onResize"></q-resize-observer>
    <a href="https://www.maptiler.com" class="watermark q-px-xs"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
    <div id="map" ref="mapContainer"></div>
    <div
      class="map-controls column absolute-bottom-right"
      :class="{ 'footer-space': $q.screen.lt.sm }"
    >
      <q-btn
        class="q-my-sm"
        :size="quasar.screen.gt.xs ? 'lg' : 'md'"
        round
        color="white"
        text-color="black"
        icon="add"
        @click="zoomIn"
      ></q-btn>
      <q-btn
        class="q-my-sm"
        :size="quasar.screen.gt.xs ? 'lg' : 'md'"
        round
        color="white"
        text-color="black"
        icon="remove"
        @click="zoomOut"
      ></q-btn>
    </div>

    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="spinner-container relative-position" v-if="isLoading">
        <div class="backdrop"></div>
        <q-spinner class="spinner" color="primary" size="8em" :thickness="4" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, watch, ref } from 'vue';
import { Map as MaplibreMap, LngLat } from 'maplibre-gl';
import { useStolpersteinMap } from 'src/common/StolpersteinMap';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';

const quasar = useQuasar();
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

const isLoading = ref(true);

let map: MaplibreMap;
// let mapInitializeTimer: NodeJS.Timeout;

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
  // mapInitializeTimer = setTimeout(function () {
  map = createMap(apiKey, dresden);
  map.on('load', () => {
    setStolpersteinSource(map, stolpersteine.value);
    setLayer(map);
    map.resize();
    isLoading.value = false;
  });
  map.keyboard.disable();
  // }, 0);
});

onBeforeUnmount(() => {
  // clearTimeout(mapInitializeTimer);

  map?.remove();
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
  margin-bottom: 120px;
  margin-right: 15px;

  @media (min-width: $breakpoint-sm-min) {
    margin-bottom: 30px;
    margin-right: 20px;
  }

  @media (min-width: $breakpoint-md-min) {
    margin-bottom: 30px;
    margin-right: 48px;
  }
}

.spinner-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .backdrop {
    position: absolute;
    background-color: $dark;
    opacity: $backdrop-opacity;
    height: 100%;
    width: 100%;
  }
}
</style>
