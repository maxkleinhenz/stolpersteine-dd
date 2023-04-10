<script lang="ts" setup>
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
