<script lang="ts" setup>
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();

const stolpersteine = computed(() => store.stolpersteine);

definePageMeta({
  layout: "map",
});
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <h1>Karte</h1>
  </main>
</template>

<style scoped></style>
