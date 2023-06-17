<script setup lang="ts">
const links = {
  start: { name: "Start", to: "/" },
  karte: { name: "Karte", to: "/karte" },
  info: { name: "Info", to: "/info" },
};
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-20 flex rounded-t-2xl bg-white text-lg shadow-top md:bottom-auto md:left-auto md:top-0 md:m-8 md:rounded-full md:px-6 md:shadow-md"
  >
    <AppButton
      v-for="link in links"
      class="flex-1 border-b-4 border-transparent px-0 py-5 text-center hover:border-accent-2 md:px-5"
      intent="default"
      :to="link.to"
      >{{ link.name }}</AppButton
    >
  </nav>
</template>
