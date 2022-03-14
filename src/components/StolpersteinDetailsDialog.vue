<template>
  <div class="dialog-content full-height app-bg">
    <q-btn
      class="dialog-close absolute-top-right q-ma-md"
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
      round
      text-color="black"
      color="white"
      icon="close"
      @click="$router.push({ name: routeNames.map })"
    />
    <q-scroll-area class="full-width full-height">
      <StolpersteinDetail :stolperstein="stolperstein"></StolpersteinDetail>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import StolpersteinDetail from 'src/components/StolpersteinDetails.vue';
import { onActivated, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';
import { routeNames } from 'src/router/routes';

const store = useStore();
const route = useRoute();

const stolperstein = ref<StolpersteinFeature | undefined>(undefined);

onActivated(() => {
  console.log('onActivated');
});

onMounted(() => {
  console.log('onMounted');
  setDetailStolperstein(Number(route.params.id));
});

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
    } else {
      stolperstein.value = undefined;
    }
  }
};
</script>

<style scoped lang="scss">
.dialog-close {
  z-index: 1;
}

.dialog-content {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 7000;
  width: min(100vw, #{$stolperstein-details-width});
}
</style>
