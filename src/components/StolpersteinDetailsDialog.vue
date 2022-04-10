<template>
  <div class="dialog-content full-height app-bg z-top">
    <q-btn
      class="dialog-close absolute-top-right q-ma-md"
      :size="$q.screen.gt.xs ? 'lg' : 'md'"
      round
      text-color="black"
      color="white"
      icon="close"
      @click="
        $router.push({
          name: routeNames.map,
          params: { withTransitionParam },
        })
      "
    />
    <q-scroll-area class="full-width full-height" ref="scrollRef">
      <StolpersteinDetail
        :stolperstein="stolperstein"
        @to-top="goToTop()"
      ></StolpersteinDetail>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import StolpersteinDetail from 'src/components/StolpersteinDetails.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';
import { routeNames, withTransitionParam } from 'src/router/routes';
import { QScrollArea, useMeta } from 'quasar';

const store = useStore();
const route = useRoute();

const scrollRef = ref<QScrollArea>();
const stolperstein = ref<StolpersteinFeature | undefined>(undefined);

onMounted(() => {
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
    }
  }
};

const goToTop = () => {
  scrollRef.value?.setScrollPosition('vertical', 0, 200);
};
</script>

<style scoped lang="scss">
.dialog-close {
  z-index: 1;
}

.dialog-content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: min(100vw, #{$stolperstein-details-width});

  @media (min-width: $breakpoint-sm-min) {
    position: fixed;
  }
}
</style>
