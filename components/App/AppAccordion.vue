<template>
  <div
    class="rounded-3xl border-gray-300 transition-all duration-300"
    :class="{ border: isExpanded, 'shadow-md': isExpanded }"
  >
    <div>
      <AppButton
        intent="white"
        :shape="isExpanded ? 'default' : 'pill'"
        class="w-full"
        :class="{ 'border-0': isExpanded, 'rounded-t-3xl': isExpanded, 'bg-gray-200': isExpanded }"
        @click="toggle"
      >
        <slot name="header" />
      </AppButton>
    </div>
    <div class="content border-gray-300" :class="{ 'is-open': isExpanded, 'border-t': isExpanded }">
      <div class="overflow-hidden"><slot name="content" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  expanded?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:expanded", open: boolean): void;
}>();

const isExpanded = ref(props.expanded);

function toggle() {
  isExpanded.value = !isExpanded.value;
  emit("update:expanded", isExpanded.value);
}
</script>

<style scoped>
.content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.content.is-open {
  grid-template-rows: 1fr;
}
</style>
