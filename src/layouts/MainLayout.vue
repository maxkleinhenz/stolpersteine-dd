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

    <BottomNavComponent></BottomNavComponent>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TopNavComponent from 'src/components/Nav/TopNavComponent.vue';
import BottomNavComponent from 'src/components/Nav/BottomNavComponent.vue';
import { useMeta, useQuasar } from 'quasar';
import StolpersteinSidebar from 'src/components/StolpersteinList/StolpersteinSidebar.vue';
import { usePages } from 'src/use/usePages';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { computed, onMounted } from 'vue';

const store = useStolpersteinStore();
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
    return store.isStolpersteinSidebarVisible || quasar.screen.gt.sm;
  },
  set(value: boolean): void {
    store.isStolpersteinSidebarVisible = value;
  },
});

onMounted(async () => {
  await store.loadStolpersteineFeatures();
});
</script>

<style scoped lang="scss"></style>
