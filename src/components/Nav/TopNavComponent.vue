<template>
  <nav
    class="top-nav fixed-top-right q-my-lg q-mr-xl"
    role="navigation"
    aria-label="Hauptmenu"
  >
    <q-tabs no-caps indicator-color="primary">
      <q-route-tab
        label="Start"
        class="nav-link"
        :to="{ name: pageRecord.Home.routeName }"
      />
      <q-route-tab
        label="Karte"
        class="nav-link"
        :to="{ name: pageRecord.Map.routeName }"
      />
      <q-route-tab
        label="Info"
        class="nav-link"
        :to="{ name: pageRecord.Info.routeName }"
      />
    </q-tabs>
  </nav>
</template>

<script setup lang="ts">
import { usePages } from 'src/use/usePages';

const { pageRecord } = usePages();
</script>

<style lang="scss" scoped>
.top-nav {
  z-index: 999;
  background-color: white;
  border-radius: 72px;
  box-shadow: 0 3px 8px #0000001f;
  padding-inline: 28px;

  @media (min-width: $breakpoint-md-min) {
    padding-inline: 32px;
  }
}

.nav-link {
  text-decoration: none;
  color: black;
  // margin: 6px;
  padding-block: 12.3px;
  padding-inline: 18px;

  :deep(.q-tab__label) {
    font-size: 1rem;
    font-weight: 400;
  }

  @media (min-width: $breakpoint-md-min) {
    padding-inline: 18px;
    padding-block: 14px;
  }
}
</style>
