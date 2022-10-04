<template>
  <div class="content-container">
    <div class="back-button-container">
      <q-btn
        v-show="$route.name !== pageRecord.Info.routeName"
        :size="$q.screen.gt.xs ? 'lg' : 'md'"
        round
        text-color="black"
        color="white"
        icon="arrow_back"
        @click="
          $router.push({
            name: pageRecord.Info.routeName,
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
import { usePages } from 'src/common/PageList';

const { pageRecord } = usePages();
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
