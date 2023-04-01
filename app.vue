<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";
import { register } from "swiper/element/bundle";

const store = useStolpersteinStore();
store.fetchStolpersteine();

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
