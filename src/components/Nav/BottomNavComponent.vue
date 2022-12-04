<template>
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
</template>

<script setup lang="ts">
import { matHome, matMap, matInfo } from '@quasar/extras/material-icons';
import {
  outlinedHome,
  outlinedMap,
  outlinedInfo,
} from '@quasar/extras/material-icons-outlined';
import { usePages } from 'src/use/usePages';
import { useRoute } from 'vue-router';

const route = useRoute();
const { pageRecord } = usePages();
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
  border-radius: 15px 15px 0 0;
}
</style>
