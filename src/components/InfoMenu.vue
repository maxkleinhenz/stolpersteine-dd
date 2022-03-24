<template>
  <div class="menu-container">
    <div class="header text-center">
      <h1>Informationen</h1>
    </div>

    <nav role="navigation" aria-label="Info-Menü">
      <router-link
        v-for="entry in menuEntries"
        :key="entry.to"
        class="info-link text-center q-px-md q-py-md q-my-md"
        :to="{ name: entry.to, params: { withTransitionParam } }"
        >{{ entry.name }}</router-link
      >
    </nav>
  </div>
</template>

<script setup lang="ts">
import { menuEntries } from 'src/common/InfoMenuEntries';
import { withTransitionParam } from 'src/router/routes';
</script>

<style scoped lang="scss">
.menu-container {
  width: 100%;
  max-width: 500px;
}

.header {
  h1 {
    font-size: clamp(3rem, 5vw, 4rem);
  }
}

nav {
  padding-top: 2rem;
}

.info-link {
  display: block;
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  text-align: center;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
}
</style>
