<template>
  <q-scroll-area class="full-height">
    <div class="header text-center">
      <h1>Informationen</h1>
    </div>
    <nav role="navigation" aria-label="Info-Menü">
      <div
        v-for="entry in menuEntries"
        :key="entry.to"
        class="text-center q-px-md q-py-lg"
      >
        <router-link class="info-link" :to="{ name: entry.to }">{{
          entry.name
        }}</router-link>
      </div>
    </nav>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { menuEntries } from 'src/common/InfoMenuEntries';
</script>

<style scoped lang="scss">
.header {
  h1 {
    font-size: clamp(3rem, 5vw, 4rem);
  }
}

nav {
  padding-top: 2rem;
}

.info-link {
  text-decoration: none;
  color: black;
  font-size: 1.2rem;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &.router-link-exact-active {
    text-decoration: underline;
  }
}

.list-item {
  font-size: 1rem;
  padding: 1.5rem 1rem;

  &.active {
    background-color: $primary;
    color: white;
  }
}
</style>
