<template>
  <Transition
    :enter-active-class="
      quasar.screen.gt.xs ? 'animated slideInLeft' : 'animated slideInRight'
    "
    :leave-active-class="
      quasar.screen.gt.xs ? 'animated slideOutLeft' : 'animated slideOutRight'
    "
  >
    <div
      v-if="props.stolpersteinId"
      ref="dialogRef"
      v-scroll="onScroll"
      v-touch-pan.horizontal.prevent="handlePan"
      class="dialog-content shadow-5 full-height app-bg scroll"
    >
      <div class="absolute flex justify-end full-width z-top">
        <q-btn
          class="fixed q-ma-md"
          :size="$q.screen.gt.xs ? 'lg' : 'md'"
          round
          text-color="black"
          color="white"
          icon="close"
          @click="goToMap()"
        />
      </div>
      <div v-if="stolperstein" class="full-width full-height">
        <StolpersteinDetails :stolperstein="stolperstein"></StolpersteinDetails>
      </div>

      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          v-show="showPageScroller"
          class="page-scroller absolute flex justify-center full-width z-top"
          :class="{ 'footer-space': $q.screen.lt.sm }"
        >
          <q-btn
            class="fixed q-ma-md"
            :size="$q.screen.gt.xs ? 'lg' : 'md'"
            round
            text-color="black"
            color="white"
            icon="expand_less"
            @click="goToTop()"
          />
        </div>
      </transition>
    </div>
  </Transition>
  <div v-show="props.stolpersteinId" class="backdrop" @click="goToMap()"></div>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import StolpersteinDetails from 'src/components/StolpersteinDetails/StolpersteinDetails.vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta, scroll, useQuasar, QBtn } from 'quasar';
import { usePages } from 'src/use/usePages';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { useStolpersteinUtils } from 'src/use/useStolpersteinUtils';

const props = defineProps({
  stolpersteinId: {
    type: Number,
    required: true,
    default: undefined,
  },
});

const quasar = useQuasar();
const store = useStolpersteinStore();
const router = useRouter();
const { setVerticalScrollPosition } = scroll;
const { pageRecord } = usePages();
const { findStolpersteinById } = useStolpersteinUtils();

const stolperstein = ref<StolpersteinFeature | undefined>(undefined);
const dialogRef = ref<HTMLElement>();
const showPageScroller = ref(false);

onMounted(async () => {
  if (!store.stolpersteine.length) {
    await store.loadStolpersteineFeatures();
  }
  if (props.stolpersteinId) setDetailStolperstein(props.stolpersteinId);
});

watch(
  () => props.stolpersteinId,
  (value) => {
    if (value) setDetailStolperstein(value);
  }
);

const setDetailStolperstein = (stolpersteinId: number) => {
  if (stolpersteinId === NaN) {
    stolperstein.value = undefined;
    void goToMap();
    return;
  } else {
    // find detail stolperstein
    const foundStolperstein = findStolpersteinById(
      stolpersteinId,
      store.stolpersteine
    );

    if (foundStolperstein) {
      stolperstein.value = foundStolperstein;
      goToTop();

      useMeta({
        title: foundStolperstein.stolperstein.name,
      });
    } else {
      stolperstein.value = undefined;
      void goToMap();
      return;
    }
  }
};

const goToTop = () => {
  if (dialogRef.value) setVerticalScrollPosition(dialogRef.value, 0, 200);
};

const goToMap = async () => {
  stolperstein.value = undefined;
  await router.push({
    name: pageRecord.Map.routeName,
  });
};

const onScroll = (postion: number) => {
  showPageScroller.value = postion >= 200;
};

const handlePan = (ev: {
  offset: {
    x: number;
    y: number;
  };
}) => {
  if (
    // gt sx -> opens sidebar from left
    // lt sm -> opens sidebar from right
    (quasar.screen.gt.xs && ev.offset.x < -150) ||
    (!quasar.screen.gt.xs && ev.offset.x > 150)
  ) {
    void goToMap();
  }
};
</script>

<style scoped lang="scss">
.dialog-content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: min(100vw, #{$stolperstein-details-width});
  z-index: 999;

  @media (min-width: $breakpoint-sm-min) {
    position: fixed;
    z-index: 99999;
  }
}

.page-scroller {
  bottom: 80px;

  @media (min-width: $breakpoint-sm-min) {
    bottom: 100px;
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
