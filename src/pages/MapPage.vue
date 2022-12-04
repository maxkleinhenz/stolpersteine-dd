<template>
  <q-page class="map-page relative-position">
    <div class="absolute-top-left row q-ma-lg">
      <q-btn
        round
        size="lg"
        text-color="black"
        color="white"
        icon="r_menu"
        class="sidebar-toggler sm"
        @click="store.toggleStolpersteinSidebarVisibility"
      />
    </div>

    <div class="map-wrapper absolute full-height full-width">
      <MapComponent ref="map" />
    </div>

    <StolpersteinBottomSheet v-if="quasar.screen.lt.sm">
    </StolpersteinBottomSheet>

    <StolpersteinSlider
      :stolpersteine="selectedStolpersteine"
    ></StolpersteinSlider>

    <StolpersteinDetailsDialog
      :stolperstein-id="Number(route.params.id)"
    ></StolpersteinDetailsDialog>
  </q-page>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import MapComponent from 'src/components/Map/MapComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import StolpersteinBottomSheet from 'src/components/StolpersteinList/StolpersteinBottomSheet.vue';
import StolpersteinSlider from 'src/components/StolpersteinList/StolpersteinSlider.vue';
import StolpersteinDetailsDialog from 'src/components/StolpersteinDetails/StolpersteinDetailsDialog.vue';
import { usePages } from 'src/use/usePages';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { storeToRefs } from 'pinia';

const store = useStolpersteinStore();
const router = useRouter();
const route = useRoute();
const quasar = useQuasar();
const { pageRecord } = usePages();

const { selectedStolpersteine } = storeToRefs(store);

watch(
  () => route.params.id,
  (value) => {
    console.log('map route', value);
    console.log('map route', Number(route.params.id));
  }
);

watch(
  () => store.selectedStolpersteine,
  async (value) => {
    if (value && value.length === 1) {
      await router.push({
        name: pageRecord.Map_Details.routeName,
        params: { id: value[0].stolperstein.id },
      });
    }
  }
);
</script>

<style lang="scss" scoped>
.map-page {
  overflow: hidden;
}

.sidebar-toggler {
  z-index: 2;
}
</style>
