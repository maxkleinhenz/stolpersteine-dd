<template>
  <q-layout view="hHh lpR fFf">
    <TopNavComponent v-show="quasar.screen.gt.sm"></TopNavComponent>

    <!-- show-if-above -->
    <q-drawer
      v-if="quasar.screen.gt.sm"
      :model-value="quasar.screen.gt.sm && route.name === 'Map'"
      :width="370"
      elevated
      class="app-bg text-black"
      behavior="desktop"
    >
      <StolpersteinSidebar></StolpersteinSidebar>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <StolpersteinListBottomSheet
      class="lt-md"
      v-if="quasar.screen.lt.md"
      :show="quasar.screen.lt.md && route.name === 'Map'"
    >
    </StolpersteinListBottomSheet>

    <q-footer bordered class="footer lt-md app-bg text-black">
      <q-tabs class="text-black" dense align="center">
        <q-route-tab
          name="home"
          :icon="route.name === 'Home' ? matHome : outlinedHome"
          label="Start"
          :to="{ name: 'Home' }"
        />
        <q-route-tab
          name="map"
          :icon="route.name === 'Map' ? matMap : outlinedMap"
          label="Karte"
          :to="{ name: 'Map' }"
        />
        <q-route-tab
          name="info"
          :icon="route.name === 'Info' ? matInfo : outlinedInfo"
          label="Info"
          :to="{ name: 'Info' }"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { matHome, matMap, matInfo } from '@quasar/extras/material-icons';
import {
  outlinedHome,
  outlinedMap,
  outlinedInfo,
} from '@quasar/extras/material-icons-outlined';
import { useRoute } from 'vue-router';
import TopNavComponent from 'src/components/TopNavComponent.vue';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import StolpersteinListBottomSheet from 'src/components/StolpersteinBottomSheet.vue';
import StolpersteinBottomSheet from 'src/components/StolpersteinBottomSheet.vue';
import StolpersteinSidebar from 'src/components/StolpersteinSidebar.vue';

export default defineComponent({
  components: {
    TopNavComponent,
    StolpersteinListBottomSheet,
    StolpersteinBottomSheet,
    StolpersteinSidebar,
  },
  setup() {
    const store = useStore();
    const quasar = useQuasar();
    const route = useRoute();

    onMounted(async () => {
      await store.actions.loadStolpersteineFeatures();
    });

    return {
      quasar,
      route,
      matHome,
      matMap,
      matInfo,
      outlinedHome,
      outlinedMap,
      outlinedInfo,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid $primary;
}
</style>
