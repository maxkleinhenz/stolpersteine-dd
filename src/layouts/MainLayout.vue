<template>
  <q-layout view="hHh LpR fFf">
    <TopNavComponent class="gt-xs"></TopNavComponent>

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

    <footer class="footer fixed-bottom footer z-max lt-sm app-bg text-black">
      <q-tabs class="nav-tabs text-black" dense narrow-indicator>
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
    </footer>
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
  height: $app-footer-height;
  background-color: #fbf3e4;
  box-shadow: 0 -4px 8px 0px #0000001f;
  border-color: $primary;
  border-width: 1px 1px 0 1px;
  border-style: solid;
  box-sizing: content-box;
  right: -1px;
  left: -1px;
}

.footer,
.nav-tabs {
  border-radius: $app-card-border-radius $app-card-border-radius 0 0;
}
</style>
