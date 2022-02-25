<template>
  <q-layout view="hHh lpR fFf">
    <TopNavComponent class="gt-sm"></TopNavComponent>

    <q-drawer
      v-if="quasar.screen.gt.xs"
      v-model="sidebarOpen"
      :width="370"
      :behavior="quasar.screen.gt.sm ? 'desktop' : 'mobile'"
      elevated
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

    <StolpersteinListBottomSheet
      class="lt-md"
      v-if="quasar.screen.lt.sm"
      :show="route.name === 'Map'"
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
import { computed, defineComponent, onMounted } from 'vue';
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

    const sidebarOpen = computed({
      get() {
        return (
          route.name === 'Map' &&
          (store.state.isStolpersteinSidebarVisible || quasar.screen.gt.sm)
        );
      },
      set(value: boolean): void {
        store.mutations.setStolpersteinSidebarVisibility(value);
      },
    });

    onMounted(async () => {
      await store.actions.loadStolpersteineFeatures();
    });

    return {
      quasar,
      route,
      sidebarOpen,
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
