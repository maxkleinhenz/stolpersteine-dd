<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
  overlay: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", open: boolean): void;
  (e: "onAfterLeave"): void;
}>();
const isOpen = useVModel(props, "open", emit);

const slots = useSlots();
const showMain = computed(() => !!slots.main);
</script>

<template>
  <div class="flex min-h-screen flex-row" v-if="showMain">
    <AppSidebar v-model:open="isOpen" :overlay="overlay" @on-after-leave="emit('onAfterLeave')">
      <template v-slot:sidebar>
        <slot name="sidebar" />
      </template>
      <template v-slot:main>
        <slot name="main" />
      </template>
    </AppSidebar>
  </div>
</template>
