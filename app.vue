<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { register } from "swiper/element/bundle";

await loadStolpersteine();

// register Swiper custom elements
register();

useHead({
  bodyAttrs: {
    class: "bg-base-1",
  },
  titleTemplate: (title) => {
    if (title) return `${title} - Stolpersteine Dresden`;

    return "Stolpersteine Dresden";
  },
});
</script>
