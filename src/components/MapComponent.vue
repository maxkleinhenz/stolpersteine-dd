<template>
  <div class="map-wrap">
    <a
      href="https://www.maptiler.com"
      class="watermark"
      :style="{ left: controlOffset + 'px' }"
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
  Map as MaplibreMap,
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
    let map: MaplibreMap;
    const dresden = new LngLat(13.7372621, 51.0504088);
    const stolersteineMarkers = new Map<
      string,
      {
        marker: Marker;
        stolpersteine: Array<Stolperstein>;
      }
    >();

    onMounted(() => {
      const bounds = new LngLatBounds();
      bounds.setNorthEast(new LngLat(13.972, 51.18));
      bounds.setSouthWest(new LngLat(13.586, 50.978));

      const apiKey = process.env.VUE_APP_MAPTILER_API_KEY;
      map = new MaplibreMap({
        container: "map",
        style: `https://api.maptiler.com/maps/e79c1d05-b6e6-4dcd-8aad-05d3ec97c7d5/style.json?key=${apiKey}`,
        center: dresden,
        zoom: 12,
        trackResize: true,
        attributionControl: false,
      });
      map.addControl(attributionControl, "bottom-right");
      map.addControl(navigationControl, "bottom-right");

      setPositionMapControls(props.controlOffset);
    });

    onBeforeUnmount(() => {
      clearMarkers();
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
        clearMarkers();

        // set new markers
        stolpersteine.forEach((stolperstein) => {
          var m = stolersteineMarkers.get(
            `${stolperstein.point.lon},${stolperstein.point.lat}`
          );
          if (m) {
            m.stolpersteine.push(stolperstein);
          } else {
            var markerElement = document.createElement("Button");
            markerElement.className =
              "btn p-0 stolperstein-marker border border-dark app-shadow";
            markerElement.onclick = function () {
              store.commit(
                MutationTypes.SELECT_STOLPERSTEINE,
                stolersteineMarkers.get(
                  `${stolperstein.point.lon},${stolperstein.point.lat}`
                )?.stolpersteine
              );
            };

            const marker = new Marker({ element: markerElement })
              .setLngLat([stolperstein.point.lon, stolperstein.point.lat])
              .addTo(map);
            stolersteineMarkers.set(
              `${stolperstein.point.lon},${stolperstein.point.lat}`,
              {
                marker: marker,
                stolpersteine: [stolperstein],
              }
            );
          }
        });
      }
    );

    function clearMarkers() {
      stolersteineMarkers.forEach((marker) => {
        marker.marker.remove();
      });
      stolersteineMarkers.clear();
    }

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
  height: 100%;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.watermark {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease-in-out;
}
</style>
