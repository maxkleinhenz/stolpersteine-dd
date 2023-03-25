<script setup lang="ts">
const links = {
  start: { name: "Start", to: "/" },
  karte: { name: "Karte", to: "/karte" },
  info: { name: "Info", to: "/info" },
};
</script>

<template>
  <nav class="fixed right-0 top-0 z-50 m-8 flex rounded-full bg-white px-9 text-lg drop-shadow-md">
    <AppButton
      v-for="link in links"
      class="border-b-4 border-transparent py-5 px-6 hover:border-accent-2"
      intent="default"
      :to="link.to"
      >{{ link.name }}</AppButton
    >
  </nav>
</template>
