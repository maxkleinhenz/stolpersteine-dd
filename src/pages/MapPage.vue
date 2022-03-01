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
        class="dialog-close absolute-top-right q-pa-md q-mx-md q-my-sm"
        unelevated
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

  <q-page class="relative-position">
    <div class="absolute-top-left row q-my-lg q-px-lg" style="z-index: 100">
      <q-btn
        unelevated
        round
        text-color="black"
        color="white"
        :icon="roundMenu"
        class="datails-toggler sm q-pa-lg"
        @click="toggle"
      />
    </div>

    <div class="map-wrapper absolute full-height full-width">
      <MapComponent ref="map" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onActivated, onMounted, ref, watch } from 'vue';
import MapComponent from 'components/MapComponent.vue';
import { useStore } from 'src/store';
import { roundMenu } from '@quasar/extras/material-icons-round';
import { useRoute, useRouter } from 'vue-router';
import StolpersteinDetail from 'src/components/StolpersteinDetail.vue';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { routeNames } from 'src/router/routes';

const store = useStore();
const router = useRouter();
const route = useRoute();

const detailStolperstein = ref<StolpersteinFeature | undefined>(undefined);

const toggle = store.mutations.toggleStolpersteinSidebarVisibility;

const navigateToMap = async () => {
  await router.push({ name: routeNames.map });
};

const setDetailStolperstein = (stolpersteinId: number) => {
  console.log('setDetailStolperstein', stolpersteinId);
  if (stolpersteinId === NaN) {
    detailStolperstein.value = undefined;
    return;
  }
  // find detail stolperstein
  const stolperstein = store.state.stolpersteine.filter((s) => {
    return s.stolperstein.id === stolpersteinId;
  });

  console.log('setDetailStolperstein', stolperstein);

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
.datails-toggler {
  box-shadow: 0 3px 8px #0000001f;
}

.dialog-content {
  width: min(100vw, 650px);
}

.dialog-close {
  z-index: 1;
  box-shadow: 0 3px 8px #0000001f;
}
</style>
