<template>
  <div>
    <div class="header text-center">
      <h1>Informationen</h1>
    </div>
    <nav role="navigation" aria-label="Info-Menü">
      <div
        v-for="entry in menuEntries"
        :key="entry.to"
        class="text-center q-px-md q-py-lg"
      >
        <router-link
          class="info-link"
          :to="{ name: entry.to, params: { withTransitionParam } }"
          >{{ entry.name }}</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { menuEntries } from 'src/common/InfoMenuEntries';
import { withTransitionParam } from 'src/router/routes';
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
</style>
