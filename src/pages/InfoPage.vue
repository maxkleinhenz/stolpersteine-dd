<template>
  <q-page class="info-page column" :class="{ 'footer-space': $q.screen.lt.sm }">
    <div class="column items-center">
      <RouterViewTransistion :name="'fade'"></RouterViewTransistion>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RouterViewTransistion from 'src/plugins/RouterViewTransistion.vue';
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-from {
  opacity: 1;
}
</style>
