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
        class="q-my-sm"
        :size="quasar.screen.gt.xs ? 'lg' : 'md'"
        round
        :color="followPosition ? 'black' : 'white'"
        :text-color="followPosition ? 'white' : 'black'"
        :icon="watchActiv ? 'gps_fixed' : 'gps_not_fixed'"
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
      <div v-if="isLoading" class="spinner-container relative-position">
        <div class="backdrop"></div>
        <q-spinner class="spinner" color="primary" size="8em" :thickness="4" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';

import { onMounted, onBeforeUnmount, ref, onDeactivated } from 'vue';
import { Map as MaplibreMap, LngLat, MapLibreEvent } from 'maplibre-gl';
import { useStolpersteinMap } from 'src/common/StolpersteinMap';
import { useQuasar } from 'quasar';
import { usePosition } from 'src/use/usePosition';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { usePositionStore } from 'src/store/position-store';
import { storeToRefs } from 'pinia';

const quasar = useQuasar();
const store = useStolpersteinStore();
const positionStore = usePositionStore();
const { createMap, resize, initMap } = useStolpersteinMap();

const { watchPosition, clearPositionWatch } = usePosition();
const { followPosition, watchActiv } = storeToRefs(positionStore);

const dresden = new LngLat(13.7372621, 51.0504088);
const apiKey = process.env.MAPTILER_API_KEY ?? '';

const isLoading = ref(true);

let map: MaplibreMap;

onMounted(() => {
  map = createMap(apiKey, dresden);
  map.on('load', () => {
    initMap(map, store.filteredStolpersteine);
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

onDeactivated(() => {
  clearPositionWatch();
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
  if (positionStore.followPosition && positionStore.watchActiv) {
    clearPositionWatch();
  } else {
    watchPosition(map);
  }
};
</script>

<style lang="scss" scoped>
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
  z-index: 30;

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
