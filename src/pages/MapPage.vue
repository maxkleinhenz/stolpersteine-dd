<template>
  <q-dialog
    class="dialog"
    :model-value="!!detailStolperstein"
    full-height
    maximized
    position="left"
    @before-hide="navigateToMap()"
  >
    <div class="dialog-content app-bg">
      <q-btn
        class="dialog-close absolute-top-right q-pa-md q-ma-md"
        round
        text-color="black"
        color="white"
        icon="close"
        v-close-popup
      />
      <q-scroll-area class="full-width full-height">
        <StolpersteinDetail
          :stolperstein="detailStolperstein"
        ></StolpersteinDetail>
      </q-scroll-area>
    </div>
  </q-dialog>

  <q-page class="map-page relative-position">
    <div class="absolute-top-left row q-ma-lg">
      <q-btn
        round
        size="lg"
        text-color="black"
        color="white"
        icon="r_menu"
        class="datails-toggler sm"
        @click="toggleStolpersteinSidebar"
      />
    </div>

    <div class="map-wrapper absolute full-height full-width">
      <MapComponent ref="map" />
    </div>

    <StolpersteinListBottomSheet
      class="lt-md"
      v-if="quasar.screen.lt.sm"
      :show="
        route.name === routeNames.map || route.name === routeNames.mapDetails
      "
    >
    </StolpersteinListBottomSheet>

    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <div
        class="stolperstein-slider-container absolute-bottom"
        v-show="showSelectedSlide"
      >
        <SelectedStolpersteineSlider
          :stolpersteine="selectedStolpersteine"
        ></SelectedStolpersteineSlider>
      </div>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { onActivated, onMounted, ref, watch } from 'vue';
import MapComponent from 'components/MapComponent.vue';
import { useStore } from 'src/store';
import { useRoute, useRouter } from 'vue-router';
import StolpersteinDetail from 'src/components/StolpersteinDetail.vue';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { routeNames } from 'src/router/routes';
import StolpersteinListBottomSheet from 'src/components/StolpersteinBottomSheet.vue';
import SelectedStolpersteineSlider from 'src/components/StolpersteinSlider.vue';
import { useQuasar } from 'quasar';

const store = useStore();
const router = useRouter();
const route = useRoute();
const quasar = useQuasar();

const detailStolperstein = ref<StolpersteinFeature | undefined>(undefined);
const showSelectedSlide = ref(false);
const selectedStolpersteine = ref<StolpersteinFeature[] | undefined>();
watch(
  () => store.state.selectedStolpersteine,
  async (value) => {
    if (!value?.length) {
      showSelectedSlide.value = false;
    } else if (value.length === 1) {
      showSelectedSlide.value = false;
      await router.push({
        name: routeNames.mapDetails,
        params: { id: value[0].stolperstein.id },
      });
    } else {
      showSelectedSlide.value = true;
      selectedStolpersteine.value = value;
    }
  }
);

const toggleStolpersteinSidebar =
  store.mutations.toggleStolpersteinSidebarVisibility;

const navigateToMap = async () => {
  await router.push({ name: routeNames.map });
};

const setDetailStolperstein = (stolpersteinId: number) => {
  if (stolpersteinId === NaN) {
    detailStolperstein.value = undefined;
    return;
  }
  // find detail stolperstein
  const stolperstein = store.state.stolpersteine.filter((s) => {
    return s.stolperstein.id === stolpersteinId;
  });

  if (stolperstein?.length) {
    detailStolperstein.value = stolperstein[0];
  } else {
    detailStolperstein.value = undefined;
  }
};

onMounted(() => {
  setDetailStolperstein(Number(route.params.id));
});

onActivated(() => {
  setDetailStolperstein(Number(route.params.id));
});

watch(
  () => route.params.id,
  (value) => {
    setDetailStolperstein(Number(value));
  }
);
</script>

<style lang="scss" scoped>
.map-page {
  overflow: hidden;
}

.datails-toggler {
  z-index: 2;
}

.dialog-content {
  width: min(100vw, #{$stolperstein-details-width});
}

.dialog-close {
  z-index: 1;
}

.stolperstein-slider-container {
  z-index: 3;
  margin-bottom: 80px;

  @media (min-width: $breakpoint-sm-min) {
    margin-bottom: 16px;
  }
}
</style>
