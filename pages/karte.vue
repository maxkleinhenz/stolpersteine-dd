<script lang="ts" setup>
useRouter();

definePageMeta({
  layout: "map-layout",
  keepalive: true,
});

useHead({
  title: "Karte",
});
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <ClientOnly>
      <StolpersteinMap />
    </ClientOnly>
  </main>
  <ClientOnly>
    <Teleport to="body">
      <NuxtPage :keepalive="true"></NuxtPage>
    </Teleport>
  </ClientOnly>
</template>

<style scoped></style>
