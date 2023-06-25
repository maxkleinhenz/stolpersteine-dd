<script setup lang="ts">
const links = {
  start: { name: "Start", to: "/", icon: "ic:outline-home", selectedIcon: "ic:baseline-home" },
  karte: { name: "Karte", to: "/karte", icon: "ic:outline-map", selectedIcon: "ic:baseline-map" },
  info: { name: "Info", to: "/info", icon: "ic:outline-info", selectedIcon: "ic:baseline-info" },
};
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-20 flex rounded-t-2xl bg-white text-lg shadow-top md:bottom-auto md:left-auto md:top-0 md:m-8 md:rounded-full md:px-8 md:shadow-md"
  >
    <AppButton
      v-for="link in links"
      class="flex-1 flex-col border-b-4 border-transparent px-0 py-2 text-center text-sm hover:border-accent-2 md:px-5 md:py-5 md:text-base"
      intent="default"
      size="small"
      :to="link.to"
      ><span class="inline-block md:hidden">
        <AppIcon size="small" class="!h-5 !w-5" :name="$route.path === link.to ? link.selectedIcon : link.icon" />
      </span>
      {{ link.name }}
    </AppButton>
  </nav>
</template>
