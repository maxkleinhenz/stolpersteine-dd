<script lang="ts" setup>
useRouter();

definePageMeta({
  layout: "map-layout",
  keepalive: true,
  // pageTransition: {
  //   enterActiveClass: "transform-transition duration-1000 ease-out",
  //   enterFromClass: "-translate-x-full",
  //   enterToClass: "translate-x-0",
  //   leaveActiveClass: "transform-transition duration-300 ease",
  //   leaveFromClass: "translate-x-0",
  //   leaveToClass: "-translate-x-full",
  //   mode: "out-in",
  // },
});

useHead({
  title: "Karte",
});
</script>

<template>
  <!-- <AppSidebar :open="isOpen" @update:open="goBack" :overlay="true">
    <template v-slot:sidebar>
      <aside>
        <StolpersteinDetailsSidebar :stolperstein-id="stolpersteinId" />
      </aside>
    </template>

    <template v-slot:main> -->
  <main class="flex min-h-screen flex-col items-center justify-center">
    <StolpersteinMap />
  </main>
  <!-- </template>
  </AppSidebar> -->
  <ClientOnly>
    <Teleport to="body">
      <NuxtPage
        :keepalive="true"
        :transition="{
          enterActiveClass: 'transform-transition duration-1000 ease-out',
          enterFromClass: '-translate-x-full',
          enterToClass: 'translate-x-0',
          leaveActiveClass: 'transform-transition duration-300 ease',
          leaveFromClass: 'translate-x-0',
          leaveToClass: '-translate-x-full',
          mode: 'out-in',
        }"
      ></NuxtPage>
    </Teleport>
  </ClientOnly>
</template>

<style scoped></style>
