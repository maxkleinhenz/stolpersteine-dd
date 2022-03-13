<template>
  <q-btn
    v-show="$q.screen.lt.md && $route.name !== routeNames.infoMenu"
    class="back-button"
    size="md"
    round
    text-color="black"
    color="white"
    icon="arrow_back"
    @click="$router.push({ name: routeNames.infoMenu })"
  />
</template>

<script setup lang="ts">
import { routeNames } from 'src/router/routes';
</script>

<style scoped lang="scss">
.back-button {
  position: fixed;
  top: 2em;
  left: 2em;
  z-index: 11;
}
</style>
