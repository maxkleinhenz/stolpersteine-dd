<template>
  <div class="relative flex h-full w-full flex-1 overflow-hidden">
    <div id="map" ref="mapContainer" class="flex-1"></div>
    <div class="absolute bottom-0 left-0">
      <a href="https://www.maptiler.com"
        ><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"
      /></a>
    </div>

    <div class="absolute bottom-0 right-0 grid gap-4 px-6 py-12">
      <AppButton intent="white" shape="rounded" size="medium" class="shadow-md" @click="zoom('in')"
        ><AppIcon name="ic:baseline-plus" size="medium"
      /></AppButton>
      <AppButton intent="white" shape="rounded" size="medium" class="shadow-md" @click="zoom('out')"
        ><AppIcon name="ic:baseline-minus" size="medium"
      /></AppButton>
    </div>

    <StolpersteinSlider class="absolute inset-x-0 bottom-0 overflow-hidden" />

    <!-- <div class="map-controls column absolute-bottom-right"></div> -->
  </div>
</template>

<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import { LngLat, Map } from "maplibre-gl";

const mapContainer = ref(null);

const config = useRuntimeConfig();
const dresden = new LngLat(13.7372621, 51.0504088);
const apiKey = config.public.MAPTILER_API_KEY;

let map: Map;
const { createMap, debounceResize } = useStolpersteinMap();

onMounted(() => {
  map = createMap(apiKey, dresden);
});

useResizeObserver(mapContainer, (entries) => {
  debounceResize();
});

watchEffect(() => {});

function zoom(z: "in" | "out") {
  if (z === "in") map?.zoomIn({ animate: true });
  else map?.zoomOut({ animate: true });
}

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
