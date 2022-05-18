<template>
  <nav
    class="top-nav fixed-top-right row q-my-lg q-mr-xl q-px-lg"
    role="navigation"
    aria-label="Hauptmenu"
  >
    <div class="col q-pa-lg">
      <router-link
        :to="{ name: pageRecord.Home.routeName }"
        class="nav-link"
        :class="{
          'link-active': $route.name
            ?.toString()
            .startsWith(pageRecord.Home.routeName),
        }"
      >
        <span>Start</span>
      </router-link>
    </div>
    <div class="col q-pa-lg">
      <router-link
        :to="{ name: pageRecord.Map.routeName }"
        class="nav-link"
        :class="{
          'link-active': $route.name
            ?.toString()
            .startsWith(pageRecord.Map.routeName),
        }"
      >
        <span>Karte</span>
      </router-link>
    </div>
    <div class="col q-pa-lg">
      <router-link
        :to="{ name: pageRecord.Info.routeName }"
        class="nav-link"
        :class="{
          'link-active': $route.name
            ?.toString()
            .startsWith(pageRecord.Info.routeName),
        }"
      >
        <span>Info</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { usePages } from 'src/common/PageList';

const { pageRecord } = usePages();
</script>

<style lang="scss" scoped>
.top-nav {
  z-index: 999;
  background-color: white;
  border-radius: 72px;
  box-shadow: 0 3px 8px #0000001f;
}

.nav-link {
  text-decoration: none;
  color: black;
  font-size: 1rem;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &.link-active {
    text-decoration: underline;
  }
}
</style>
