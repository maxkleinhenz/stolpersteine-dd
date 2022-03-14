<template>
  <q-page class="page column">
    <div class="content-container row">
      <div class="col-12">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.page {
  overflow: hidden;
}

.content-container {
  flex: 1;
}

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
