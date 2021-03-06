<template>
  <div
    class="dialog-content shadow-5 full-height app-bg scroll"
    ref="dialogRef"
    v-scroll="onScroll"
    v-touch-pan.horizontal.prevent="handlePan"
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
    <div class="full-width full-height">
      <StolpersteinDetail :stolperstein="stolperstein"></StolpersteinDetail>
    </div>

    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        class="page-scroller absolute flex justify-center full-width z-top"
        v-show="showPageScroller"
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
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import StolpersteinDetail from 'src/components/StolpersteinDetails.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { withTransitionParam } from 'src/router/routes';
import { useMeta, scroll, useQuasar } from 'quasar';
import { usePages } from 'src/common/PageList';

const quasar = useQuasar();
const store = useStore();
const route = useRoute();
const router = useRouter();
const { setVerticalScrollPosition } = scroll;
const { pageRecord } = usePages();

const stolperstein = ref<StolpersteinFeature | undefined>(undefined);
const dialogRef = ref<HTMLElement>();
const showPageScroller = ref(false);

onMounted(async () => {
  if (!store.state.stolpersteine.length) {
    await store.actions.loadStolpersteineFeatures();
  }
  setDetailStolperstein(Number(route.params.id));
});

watch(
  () => route.params.id,
  (value) => {
    setDetailStolperstein(Number(value));
  }
);

const setDetailStolperstein = (stolpersteinId: number) => {
  if (stolpersteinId === NaN) {
    stolperstein.value = undefined;
    return;
  } else {
    // find detail stolperstein
    const foundStolperstein = store.state.stolpersteine.filter((s) => {
      return s.stolperstein.id === stolpersteinId;
    });

    if (foundStolperstein?.length) {
      stolperstein.value = foundStolperstein[0];
      goToTop();

      useMeta({
        title: foundStolperstein[0].stolperstein.name,
      });
    } else {
      stolperstein.value = undefined;
      void goToMap();
    }
  }
};

const goToTop = () => {
  if (dialogRef.value) setVerticalScrollPosition(dialogRef.value, 0, 200);
};

const goToMap = async () => {
  await router.push({
    name: pageRecord.Map.routeName,
    params: { withTransitionParam },
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
</style>
