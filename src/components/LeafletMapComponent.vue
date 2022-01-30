<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default defineComponent({
  name: "LeafletMapComponent",
  components: {},
  setup() {
    let map: L.Map;

    onMounted(() => {
      map = L.map("map").setView([51.0504088, 13.7372621], 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    });

    onBeforeUnmount(() => {
      if (map) {
        map.remove();
      }
    });

    function invalidateMapSize() {
      map.invalidateSize({
        pan: false,
        duration: 0.2,
        animate: true,
      });
    }

    return {
      invalidateMapSize,
    };
  },
});
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
