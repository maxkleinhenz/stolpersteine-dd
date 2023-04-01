<script lang="ts" setup>
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();

const stolpersteine = computed(() => store.stolpersteine);

definePageMeta({
  layout: "map-layout",
});

useHead({
  title: "Karte",
});
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <StolpersteinMap />
  </main>
</template>

<style scoped></style>
