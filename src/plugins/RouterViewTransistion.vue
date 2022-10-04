<template>
  <router-view v-slot="{ Component }">
    <!-- 
    
                 :enter-active-class="
        displayTransition ? props.enterActiveClass : undefined
      "
      :leave-active-class="
        displayTransition ? props.leaveActiveClass : undefined
      "
      
    
    -->
    <transition
      :name="displayTransition ? props.name : undefined"
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
    default: null,
  },
  enterActiveClass: {
    type: String,
    default: null,
  },
  leaveActiveClass: {
    type: String,
    default: null,
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
    (key) => key === Object.keys(withTransitionParam)[0]
  );
  displayTransition.value = hasTransitionParam || !quasar.platform.is.ios;

  console.log(
    'Object.keys(withTransitionParam)[0]',
    Object.keys(withTransitionParam)[0]
  );
  console.log('displayTransition', displayTransition.value);
});
</script>

<style scoped></style>
