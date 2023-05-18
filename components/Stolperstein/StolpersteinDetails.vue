<script setup lang="ts">
defineProps<{ stolpersteinId?: number }>();
</script>

<template>
  <div class="min-h-screen w-screen max-w-2xl bg-base-1 shadow-[15px_0_15px_0_rgba(0,0,0,0.1)]">
    {{ stolpersteinId }} details
  </div>
</template>
