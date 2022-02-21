<template>
  <div
    class="top-nav gt-sm fixed-top-right, absolute-top-right row q-my-lg q-mr-xl q-px-lg"
  >
    <div class="col q-pa-lg">
      <router-link :to="{ name: 'Home' }" class="nav-link">
        <span>Start</span>
      </router-link>
    </div>
    <div class="col q-pa-lg">
      <router-link :to="{ name: 'Map' }" class="nav-link">
        <span>Karte</span>
      </router-link>
    </div>
    <div class="col q-pa-lg">
      <router-link :to="{ name: 'Info' }" class="nav-link">
        <span>Info</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.top-nav {
  z-index: 999;
  background-color: white;
  border-radius: 69px;
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
