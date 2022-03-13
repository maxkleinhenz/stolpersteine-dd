<template>
  <div class="full-height">
    <InfoBackButton></InfoBackButton>
    <q-scroll-area class="full-height">
      <div class="content full-height q-px-md q-pb-xl">
        <slot></slot>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import InfoBackButton from './InfoBackButton.vue';
</script>

<style scoped lang="scss">
.content {
  @media (max-width: $breakpoint-sm-max) {
    padding-top: 3rem;
  }
}
</style>
