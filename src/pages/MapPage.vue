<template>
  <q-page class="map-page relative-position">
    <div class="absolute-top-left row q-ma-lg">
      <q-btn
        round
        size="lg"
        text-color="black"
        color="white"
        icon="r_menu"
        class="datails-toggler sm"
        @click="store.toggleStolpersteinSidebarVisibility"
      />
    </div>

    <div class="map-wrapper absolute full-height full-width">
      <MapComponent ref="map" />
    </div>

    <StolpersteinBottomSheet v-if="quasar.screen.lt.sm">
    </StolpersteinBottomSheet>

    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <div
        class="stolperstein-slider-container absolute-bottom"
        :class="{ 'footer-space': $q.screen.lt.sm }"
        v-if="showSelectedSlide"
      >
        <StolpersteinSlider
          :stolpersteine="selectedStolpersteine"
        ></StolpersteinSlider>
      </div>
    </transition>

    <div>
      <transition name="backdrop" mode="out-in">
        <div
          class="backdrop"
          @click="goToMap()"
          v-show="$route.params.id"
        ></div>
      </transition>

      <RouterViewTransistion
        :enter-active-class="
          quasar.screen.gt.xs ? 'animated slideInLeft' : 'animated slideInRight'
        "
        :leave-active-class="
          quasar.screen.gt.xs
            ? 'animated slideOutLeft'
            : 'animated slideOutRight'
        "
      ></RouterViewTransistion>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import MapComponent from 'components/MapComponent.vue';
import { useRouter } from 'vue-router';

import { withTransitionParam } from 'src/router/routes';
import { useQuasar } from 'quasar';
import StolpersteinBottomSheet from 'src/components/StolpersteinBottomSheet.vue';
import StolpersteinSlider from 'src/components/StolpersteinSlider.vue';
import RouterViewTransistion from 'src/plugins/RouterViewTransistion.vue';
import { usePages } from 'src/common/PageList';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { storeToRefs } from 'pinia';

const store = useStolpersteinStore();
const router = useRouter();
const quasar = useQuasar();
const { pageRecord } = usePages();

const showSelectedSlide = computed(
  () => (store.selectedStolpersteine?.length ?? 0) > 1
);

const { selectedStolpersteine } = storeToRefs(store);

watch(
  () => store.selectedStolpersteine,
  async (value) => {
    if (value && value.length === 1) {
      await router.push({
        name: pageRecord.Map_Details.routeName,
        params: { id: value[0].stolperstein.id, withTransitionParam },
      });
    }
  }
);

const goToMap = async () => {
  // store.selectedStolpersteine = undefined;
  await router.push({
    name: pageRecord.Map.routeName,
    params: { withTransitionParam },
  });
};
</script>

<style lang="scss" scoped>
.map-page {
  overflow: hidden;
}

.datails-toggler {
  z-index: 2;
}

.stolperstein-slider-container {
  z-index: 3;
  margin-bottom: 100px;

  @media (min-width: $breakpoint-sm-min) {
    margin-bottom: 16px;
  }
}

.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: $dark;
  opacity: $backdrop-opacity;

  @media (min-width: $breakpoint-sm-min) {
    z-index: 7000;
  }

  .backdrop-enter-active,
  .backdrop-leave-active {
    transition: opacity 0.2s ease-out;
  }
  .backdrop-enter-from,
  .backdrop-leave-to {
    opacity: 0;
  }

  .backdrop-enter-to,
  .backdrop-leave-from {
    opacity: $backdrop-opacity;
  }
}
</style>
