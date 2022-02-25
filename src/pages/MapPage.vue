<template>
  <q-page class="relative-position">
    <div class="absolute-top-left row q-my-lg q-px-lg" style="z-index: 100">
      <q-btn
        unelevated
        round
        text-color="black"
        color="white"
        :icon="roundMenu"
        class="toggler sm q-pa-lg"
        @click="toggle"
      />
    </div>

    <div class="map-wrapper absolute full-height full-width">
      <MapComponent ref="map" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapComponent from 'components/MapComponent.vue';
import { useStore } from 'src/store';
import { roundMenu } from '@quasar/extras/material-icons-round';

export default defineComponent({
  components: { MapComponent },
  setup() {
    const store = useStore();
    const toggle = store.mutations.toggleStolpersteinSidebarVisibility;

    return { toggle, roundMenu };
  },
});
</script>

<style lang="scss" scoped>
.toggler {
  box-shadow: 0 3px 8px #0000001f;
}
</style>
