<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();
store.fetchStolpersteine();

useHead({
  bodyAttrs: {
    class: "bg-base-1",
  },
});
</script>
