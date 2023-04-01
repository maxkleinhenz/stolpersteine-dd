<template>
  <div class="relative flex h-full w-full flex-1">
    <div id="map" ref="mapContainer" class="flex-1"></div>
    <div class="absolute bottom-0 left-0">
      <a href="https://www.maptiler.com"
        ><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"
      /></a>
    </div>

    <!-- <div class="map-controls column absolute-bottom-right"></div> -->
  </div>
</template>

<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import { LngLat } from "maplibre-gl";
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const mapContainer = ref(null);

const config = useRuntimeConfig();
const dresden = new LngLat(13.7372621, 51.0504088);
const apiKey = config.public.MAPTILER_API_KEY;

const store = useStolpersteinStore();
useResizeObserver(mapContainer, (entries) => {
  map?.resize();
});

const { createMap, map } = useStolpersteinMap();

onMounted(() => {
  createMap(apiKey, dresden);
});

// map.on('dragstart', () => {
//   followPosition.value = false;
// });
// map.on(
//   'zoomstart',
//   (
//     event: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
//   ) => {
//     if (event.originalEvent) {
//       followPosition.value = false;
//     }
//   }
// );
</script>

<style scoped></style>
