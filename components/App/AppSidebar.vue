<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
  overlay: boolean;
  appear?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:open", open: boolean): void;
  (e: "onAfterLeave"): void;
}>();

const isOpen = useVModel(props, "open", emit);

function onAfterLeave() {
  emit("onAfterLeave");
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body" :disabled="!overlay">
      <Transition
        :appear="appear"
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div
          v-if="overlay && open"
          class="absolute inset-0 z-20 min-h-screen cursor-pointer bg-gray-700/30"
          @click="() => (isOpen = false)"
        ></div>
      </Transition>

      <Transition
        :appear="appear"
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform -translate-x-full"
        enter-to-class=""
        leave-active-class="duration-300 ease-in"
        leave-from-class=""
        leave-to-class="transform -translate-x-full"
        @after-leave="onAfterLeave"
        @leave-cancelled="onAfterLeave"
      >
        <div
          v-show="isOpen || !overlay"
          class="left-0 top-0 z-20 min-h-screen"
          :class="{ absolute: overlay, relative: !overlay }"
        >
          <slot name="sidebar" />
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>

  <div class="flex-1">
    <slot name="main" />
  </div>
</template>
