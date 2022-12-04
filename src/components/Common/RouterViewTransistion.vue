<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="enableTransition ? props.name : undefined"
      :enter-active-class="
        enableTransition ? props.enterActiveClass : undefined
      "
      :leave-active-class="
        enableTransition ? props.leaveActiveClass : undefined
      "
      :mode="props.mode"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { PropType, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  enterActiveClass: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  leaveActiveClass: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  mode: {
    type: String as PropType<'in-out' | 'out-in' | 'default'>,
    default: 'out-in',
  },
});

const quasar = useQuasar();

const enableTransition = ref(true);
onBeforeRouteUpdate(() => {
  enableTransition.value = !quasar.platform.is.ios;
});
</script>

<style scoped></style>
