<template>
  <div class="map-wrap">
    <q-resize-observer @resize="onResize"></q-resize-observer>
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
        v-if="quasar.platform.is.mobile"
        class="q-my-sm"
        :size="quasar.screen.gt.xs ? 'lg' : 'md'"
        round
        :color="followPosition ? 'black' : 'white'"
        :text-color="followPosition ? 'white' : 'black'"
        icon="my_location"
        @click="startWatchLocation()"
      ></q-btn>

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
import { Map as MaplibreMap, LngLat, MapLibreEvent } from 'maplibre-gl';
import { useStolpersteinMap } from 'src/common/StolpersteinMap';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import { usePosition } from 'src/use/usePosition';

const quasar = useQuasar();
const store = useStore();
const {
  createMap,
  resize,
  initMap,
  setStolpersteinSource,
  selectedStolperstein,
} = useStolpersteinMap();

const { watchLocation, clearWatch, followPosition, watchActiv } = usePosition();

const dresden = new LngLat(13.7372621, 51.0504088);
const apiKey = process.env.MAPTILER_API_KEY ?? '';

const isLoading = ref(true);

let map: MaplibreMap;
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
  () => selectedStolperstein.value,
  (value) => {
    store.mutations.selectStolpersteine(value);
    if (value?.length ?? 0 > 0) {
      followPosition.value = false;
    }
  }
);

onMounted(() => {
  map = createMap(apiKey, dresden);
  map.on('load', () => {
    initMap(map, stolpersteine.value);
    map.resize();
    isLoading.value = false;
  });
  map.on('dragstart', () => {
    followPosition.value = false;
  });
  map.on(
    'zoomstart',
    (
      event: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
    ) => {
      if (event.originalEvent) {
        followPosition.value = false;
      }
    }
  );
});

onBeforeUnmount(() => {
  map?.remove();
});

const onResize = () => {
  resize(map);
};

const zoomIn = () => {
  map?.zoomIn({ animate: true });
  followPosition.value = false;
};
const zoomOut = () => {
  map?.zoomOut({ animate: true });
  followPosition.value = false;
};

const startWatchLocation = () => {
  if (followPosition.value && watchActiv.value) {
    clearWatch();
  } else {
    watchLocation(map);
  }
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
