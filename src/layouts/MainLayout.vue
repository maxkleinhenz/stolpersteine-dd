<template>
  <q-layout view="hHh LpR fFf">
    <TopNavComponent class="gt-sm"></TopNavComponent>

    <q-drawer
      v-if="quasar.screen.gt.xs"
      v-model="sidebarOpen"
      :width="370"
      :behavior="quasar.screen.gt.sm ? 'desktop' : 'mobile'"
      elevated
      no-swipe-open
      class="app-bg text-black"
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

    <q-footer bordered class="footer lt-md app-bg text-black">
      <q-tabs class="text-black" dense narrow-indicator>
        <q-route-tab
          :name="routeNames.home"
          :icon="
            route.name?.toString().startsWith(routeNames.home)
              ? matHome
              : outlinedHome
          "
          label="Start"
          :to="{ name: routeNames.home }"
        />
        <q-route-tab
          :name="routeNames.map"
          :icon="
            route.name?.toString().startsWith(routeNames.map)
              ? matMap
              : outlinedMap
          "
          label="Karte"
          :to="{ name: routeNames.map }"
        />
        <q-route-tab
          :name="routeNames.infoMenu"
          :icon="
            route.name?.toString().startsWith(routeNames.infoMenu)
              ? matInfo
              : outlinedInfo
          "
          label="Info"
          :to="{ name: routeNames.infoMenu }"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
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
import StolpersteinSidebar from 'src/components/StolpersteinSidebar.vue';
import { routeNames } from 'src/router/routes';

const store = useStore();
const quasar = useQuasar();
const route = useRoute();

const sidebarOpen = computed({
  get() {
    // show drawer only on map page
    if (!route.name?.toString().startsWith(routeNames.map)) return false;
    return store.state.isStolpersteinSidebarVisible || quasar.screen.gt.sm;
  },
  set(value: boolean): void {
    store.mutations.setStolpersteinSidebarVisibility(value);
  },
});

onMounted(async () => {
  await store.actions.loadStolpersteineFeatures();
});
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid $primary;
}
</style>
