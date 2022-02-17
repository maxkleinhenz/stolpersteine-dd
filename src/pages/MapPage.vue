<template>
  <q-page class="relative-position">
    <div class="map-wrapper absolute full-height full-width">
      <MapComponent ref="map" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapComponent from 'components/MapComponent.vue';

export default defineComponent({
  components: { MapComponent },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
// .map-wrapper {
//   transition: transform 0.3s ease-in-out;
// }
</style>
