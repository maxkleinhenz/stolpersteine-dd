<template>
  <q-layout view="hHh lpR fFf">
    <top-nav-component></top-nav-component>

    <!-- show-if-above -->
    <q-drawer
      :width="370"
      elevated
      class="app-bg text-black"
      :model-value="isDesktop && route.name === 'Map'"
      behavior="desktop"
    >
      <stolperstein-list></stolperstein-list>
    </q-drawer>

    <q-page-container class="app-bg">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

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
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { matHome, matMap, matInfo } from '@quasar/extras/material-icons';
import {
  outlinedHome,
  outlinedMap,
  outlinedInfo,
} from '@quasar/extras/material-icons-outlined';
import { useRoute } from 'vue-router';
import StolpersteinList from 'src/components/StolpersteinList.vue';
import TopNavComponent from 'src/components/TopNavComponent.vue';

export default defineComponent({
  components: {
    TopNavComponent,
    StolpersteinList,
  },
  setup() {
    const route = useRoute();
    const breakpoint = 1023;
    const isDesktop = ref(false);

    onMounted(() => {
      window.addEventListener('resize', onResize);
      onResize();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    const onResize = () => {
      isDesktop.value = window.innerWidth > breakpoint;
    };

    return {
      breakpoint,
      isDesktop,
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
