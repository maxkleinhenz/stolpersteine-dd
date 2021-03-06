<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="displayTransition ? props.name : undefined"
      :enter-active-class="
        displayTransition ? props.enterActiveClass : undefined
      "
      :leave-active-class="
        displayTransition ? props.leaveActiveClass : undefined
      "
      mode="out-in"
      @before-leave="onBeforeLeave"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
import { withTransitionParam } from 'src/router/routes';

const props = defineProps({
  name: {
    type: String,
  },
  enterActiveClass: {
    type: String,
  },
  leaveActiveClass: {
    type: String,
  },
});

const quasar = useQuasar();

const displayTransition = ref(true);

const onBeforeLeave = (el: HTMLElement) => {
  if (displayTransition.value) el.style.display = 'block';
  else el.style.display = 'none';
};

onBeforeRouteUpdate((to: RouteLocationNormalized) => {
  const hasTransitionParam = Object.keys(to.params).some(
    (key) => key === withTransitionParam
  );
  displayTransition.value = hasTransitionParam || !quasar.platform.is.ios;
});
</script>

<style scoped></style>
