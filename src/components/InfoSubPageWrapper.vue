<template>
  <div class="content-container">
    <div class="back-button-container">
      <q-btn
        v-show="$route.name !== routeNames.info"
        :size="$q.screen.gt.xs ? 'lg' : 'md'"
        round
        text-color="black"
        color="white"
        icon="arrow_back"
        @click="
          $router.push({
            name: routeNames.info,
            params: { withTransitionParam },
          })
        "
      />
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from 'src/router/routes';
import { withTransitionParam } from 'src/router/routes';
</script>

<style scoped lang="scss">
.content-container {
  width: min(100%, #{$breakpoint-md-min});
}

.back-button-container {
  position: fixed;
  z-index: 11;
  padding-left: 2rem;
  padding-top: 2rem;
}
</style>
