<template>
  <div class="top-nav fixed-top-right row q-my-lg q-mr-xl q-px-lg">
    <div class="col q-pa-lg">
      <router-link :to="{ name: routeNames.home }" class="nav-link">
        <span>Start</span>
      </router-link>
    </div>
    <div class="col q-pa-lg">
      <router-link :to="{ name: routeNames.map }" class="nav-link">
        <span>Karte</span>
      </router-link>
    </div>
    <div class="col q-pa-lg">
      <router-link :to="{ name: routeNames.info }" class="nav-link">
        <span>Info</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from 'src/router/routes';
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

  &.router-link-exact-active {
    text-decoration: underline;
  }
}
</style>
