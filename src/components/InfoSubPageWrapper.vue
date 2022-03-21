<template>
  <div class="full-height">
    <q-scroll-area class="full-height">
      <div class="column items-center">
        <div class="content q-px-md q-pb-xl">
          <q-btn
            v-show="$route.name !== routeNames.info"
            class="back-button"
            size="md"
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
          <slot></slot>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from 'src/router/routes';
import { withTransitionParam } from 'src/router/routes';
</script>

<style scoped lang="scss">
.content {
  max-width: $breakpoint-md-min;
  padding-top: 2rem;

  @media (min-width: $breakpoint-sm-min) {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.back-button {
  position: sticky;
  top: 2rem;
  z-index: 11;
}
</style>
