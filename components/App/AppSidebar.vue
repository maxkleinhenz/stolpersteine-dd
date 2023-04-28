<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
  overlay: boolean;
}>();

const emit = defineEmits(["update:open"]);
const isOpen = useVModel(props, "open", emit);
</script>

<template>
  <div class="flex min-h-screen flex-row">
    <ClientOnly>
      <Teleport to="body" :disabled="!overlay">
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <div
            v-if="overlay && open"
            class="absolute inset-0 cursor-pointer bg-gray-700/30"
            @click="() => (isOpen = false)"
          ></div>
        </Transition>

        <div
          class="left-0 top-0 z-20 min-h-screen transition-transform duration-300"
          :class="{ '-translate-x-full': !isOpen, absolute: overlay, relative: !overlay }"
        >
          <slot name="sidebar" />
        </div>
      </Teleport>
    </ClientOnly>

    <div class="flex-1">
      <slot name="main" />
    </div>
  </div>
</template>
