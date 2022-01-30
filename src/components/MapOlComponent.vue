<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";

import "ol/ol.css";
import { Circle, Fill, Style } from "ol/style";
import { Feature, Map, Overlay, View } from "ol/index";
import { OSM, Vector as VectorSource } from "ol/source";
import { Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import "ol-ext/filter/Base";
//import "ol-ext/filter/Colorize";
import Colorize from "ol-ext/filter/Colorize";
//import ol_filter_Colorize from "ol-ext/filter/Colorize";
import Crop from "ol-ext/filter/Crop";
import olms from "ol-mapbox-style";

export default defineComponent({
  name: "MapOlComponent",
  components: {},
  setup() {
    let map: Map;

    function invalidateMapSize() {
      //       map.invalidateSize({
      //         pan: false,
      //         duration: 0.2,
      //         animate: true,
      //       });
    }

    const dresden = [13.7372621, 51.0504088];
    const layers = [new TileLayer({ source: new OSM() })];
    var layer = layers[0];
    //layer.addFilter(new Colorize({}));

    //var filter: any = new Colorize({ color: "sepia" });
    //filter.setFilter({ color: "sepia" });
    //const filter = new ();
    //const ss = new ol_filter_Colorize();
    // const filter = new Colorize({
    //   operation: "sepia",
    // });
    //layer.addFilter(filter);

    onMounted(() => {
      useGeographic();

      const map = new Map({
        target: "map",
        view: new View({
          center: dresden,
          zoom: 12,
        }),
        layers: layers,
      });
    });

    onBeforeUnmount(() => {
      //       if (map) {
      //         map.remove();
      //       }
    });

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
