<template>
  <div
    class="dialog-content shadow-5 full-height app-bg scroll z-top"
    ref="dialogRef"
  >
    <div class="absolute flex justify-end full-width z-top">
      <q-btn
        class="fixed q-ma-md"
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
    </div>
    <div class="full-width full-height">
      <StolpersteinDetail
        :stolperstein="stolperstein"
        @to-top="goToTop()"
      ></StolpersteinDetail>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import StolpersteinDetail from 'src/components/StolpersteinDetails.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';
import { routeNames, withTransitionParam } from 'src/router/routes';
import { useMeta, scroll } from 'quasar';

const store = useStore();
const route = useRoute();
const { setVerticalScrollPosition } = scroll;

const stolperstein = ref<StolpersteinFeature | undefined>(undefined);
const dialogRef = ref<HTMLElement>();

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
    }
  }
};

const goToTop = () => {
  if (dialogRef.value) setVerticalScrollPosition(dialogRef.value, 0, 200);
};
</script>

<style scoped lang="scss">
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
