<script setup lang="ts">
defineProps<{ stolpersteinId?: number }>();
</script>

<template>
  <aside class="relative h-screen w-screen max-w-2xl">
    <div class="flex h-full flex-col bg-base-1 shadow-[15px_0_15px_0_rgba(0,0,0,0.1)]">
      <div>{{ stolpersteinId }} details</div>
    </div>
  </aside>
</template>
