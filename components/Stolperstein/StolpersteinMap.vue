<template>
  <div class="relative flex h-full w-full flex-1 overflow-hidden">
    <div id="map" ref="mapContainer" class="flex-1"></div>
    <div class="absolute bottom-0 left-0">
      <a href="https://www.maptiler.com"
        ><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"
      /></a>
    </div>

    <div class="absolute bottom-12 right-6 grid gap-2">
      <AppButton
        :intent="positionStore.followPosition ? 'black' : 'white'"
        shape="rounded"
        size="medium"
        class="shadow-md"
        @click="positionStore.toggleWatch()"
        ><AppIcon
          :name="positionStore.watchActiv ? 'ic:baseline-my-location' : 'ic:baseline-location-searching'"
          size="medium"
      /></AppButton>
      <AppButton intent="white" shape="rounded" size="medium" class="shadow-md" @click="zoom('in')"
        ><AppIcon name="ic:baseline-plus" size="medium"
      /></AppButton>
      <AppButton intent="white" shape="rounded" size="medium" class="shadow-md" @click="zoom('out')"
        ><AppIcon name="ic:baseline-minus" size="medium"
      /></AppButton>
    </div>

    <StolpersteinSlider class="absolute inset-x-0 bottom-0 overflow-hidden" />
  </div>
</template>

<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLat, Map, MapLibreEvent } from "maplibre-gl";
import { usePositionStore } from "~~/stores/position-store";

const positionStore = usePositionStore();
const { setMap } = usePosition();

const mapContainer = ref(null);

const config = useRuntimeConfig();
const dresden = new LngLat(13.7372621, 51.0504088);
const apiKey = config.public.MAPTILER_API_KEY;

let map: Map;
const { createMap, debounceResize } = useStolpersteinMap();

onMounted(() => {
  map = createMap(apiKey, dresden);
  map.on("load", () => {
    setMap(map);
  });

  map.on("dragstart", () => {
    positionStore.followPosition = false;
  });
  map.on("zoomstart", (event: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => {
    if (event.originalEvent) {
      positionStore.followPosition = false;
    }
  });
});

useResizeObserver(mapContainer, (entries) => {
  debounceResize();
});

function zoom(z: "in" | "out") {
  if (z === "in") map?.zoomIn({ animate: true });
  else map?.zoomOut({ animate: true });
}
</script>

<style scoped></style>
