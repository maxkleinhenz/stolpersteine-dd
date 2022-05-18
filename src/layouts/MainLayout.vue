<template>
  <q-layout view="hHh LpR fFf">
    <TopNavComponent class="gt-sm"></TopNavComponent>

    <q-drawer
      v-if="quasar.screen.gt.xs"
      v-model="sidebarOpen"
      :width="400"
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
          :name="pageRecord.Home.routeName"
          :icon="
            route.name?.toString().startsWith(pageRecord.Home.routeName)
              ? matHome
              : outlinedHome
          "
          label="Start"
          :to="{ name: pageRecord.Home.routeName }"
        />
        <q-route-tab
          :name="pageRecord.Map.routeName"
          :icon="
            route.name?.toString().startsWith(pageRecord.Map.routeName)
              ? matMap
              : outlinedMap
          "
          label="Karte"
          :to="{ name: pageRecord.Map.routeName }"
        />
        <q-route-tab
          :name="pageRecord.Info.routeName"
          :icon="
            route.name?.toString().startsWith(pageRecord.Info.routeName)
              ? matInfo
              : outlinedInfo
          "
          label="Info"
          :to="{ name: pageRecord.Info.routeName }"
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
import { useMeta, useQuasar } from 'quasar';
import { useStore } from 'src/store';
import StolpersteinSidebar from 'src/components/StolpersteinSidebar.vue';
import { usePages } from 'src/common/PageList';

const store = useStore();
const quasar = useQuasar();
const { pageRecord } = usePages();

useMeta({
  titleTemplate: (title) => `${title} - Stolpersteine Dresden`,
  title: 'Startseite',
});
const route = useRoute();

const sidebarOpen = computed({
  get() {
    // show drawer only on map page
    if (!route.name?.toString().startsWith(pageRecord.Map.routeName))
      return false;
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
