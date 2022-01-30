<template>
  <div class="map-wrap">
    <a
      href="https://www.maptiler.com"
      class="watermark"
      :style="{ right: controlOffset + 'px' }"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
    <div id="map" ref="mapContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, watch } from "vue";
import {
  Map,
  NavigationControl,
  Marker,
  LngLat,
  LngLatBounds,
  AttributionControl,
} from "maplibre-gl";
import { useStore } from "@/store";
import Stolperstein from "@/models/stolperstein.model";
import { MutationTypes } from "@/store/mutations";

export default defineComponent({
  name: "MapComponent",
  components: {},
  props: {
    controlOffset: {
      required: false,
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore();
    let map: Map;
    const dresden = new LngLat(13.7372621, 51.0504088);
    const stolersteineMarkers: Array<{
      marker: Marker;
      stolperstein: Stolperstein;
    }> = [];

    onMounted(() => {
      const bounds = new LngLatBounds();
      bounds.setNorthEast(new LngLat(13.972, 51.18));
      bounds.setSouthWest(new LngLat(13.586, 50.978));

      const apiKey = process.env.VUE_APP_MAPTILER_API_KEY;
      map = new Map({
        container: "map",
        style: `https://api.maptiler.com/maps/e79c1d05-b6e6-4dcd-8aad-05d3ec97c7d5/style.json?key=${apiKey}`,
        center: dresden,
        zoom: 12,
        attributionControl: false,
      });
      map.addControl(navigationControl, "top-right");
      map.addControl(attributionControl, "bottom-right");

      setPositionMapControls(props.controlOffset);
    });

    onBeforeUnmount(() => {
      map?.remove();
    });

    watch(
      () => props.controlOffset,
      (value) => {
        setPositionMapControls(value);
      }
    );

    watch(
      () => store.getters.filteredStolpersteine,
      (stolpersteine) => {
        // remove current markers
        stolersteineMarkers.forEach((marker) => {
          marker.marker.remove();
        });

        // set new markers
        stolpersteine.forEach((stolperstein) => {
          var el = document.createElement("div");
          el.className = "border border-dark rounded";
          el.style.width = "2em";
          el.style.height = "2em";
          el.style.backgroundColor = "#b5a642";
          el.style.cursor = "pointer";
          el.onclick = function () {
            store.commit(MutationTypes.SELECT_STOLPERSTEIN, stolperstein);
          };

          const marker = new Marker({ color: "#FF0000", element: el })
            .setLngLat([stolperstein.point.lon, stolperstein.point.lat])
            .addTo(map);
          stolersteineMarkers.push({
            marker: marker,
            stolperstein: stolperstein,
          });
        });
      }
    );

    function invalidateMapSize() {
      map?.resize();
    }

    const navigationControl = new NavigationControl({
      showCompass: true,
      showZoom: true,
    });
    const attributionControl = new AttributionControl({
      customAttribution:
        '<a href="https://maplibre.org/" target="_blank">© MapLibre</a>',
    });

    function setPositionMapControls(widthSidebar: number) {
      const navigationParent = navigationControl?._container?.parentElement;
      if (navigationParent) {
        navigationParent.style.right = `${widthSidebar}px`;
        navigationParent.style.transition = "all 0.3s ease-in-out";
      }

      const attributionParent = attributionControl?._container?.parentElement;
      if (attributionParent) {
        attributionParent.style.right = `${widthSidebar}px`;
        attributionParent.style.transition = "all 0.3s ease-in-out";
      }
    }

    return { invalidateMapSize };
  },
});
</script>

<style lang="scss" scoped>
@import "~maplibre-gl/dist/maplibre-gl.css";

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - $navbar-height);
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.watermark {
  position: absolute;
  bottom: 20px;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease-in-out;
}

.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  background-color: aqua;
  width: 50px;
  height: 50px;
}
</style>
