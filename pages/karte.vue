<script lang="ts" setup>
useRouter();
const params = toRef(useRoute(), "params");
const stolpersteinIdParam = computed(() => params.value.stolpersteinId);

const stolpersteinId = computed(() => {
  if (typeof stolpersteinIdParam.value === "string") {
    const parsed = Number(stolpersteinIdParam.value);
    console.log("id", parsed);
    if (!isNaN(parsed)) return parsed;
  }
  return undefined;
});

const isOpen = computed(() => {
  const open = (stolpersteinId.value ?? 0) > 0;
  console.log("open", open);
  return open;
});

function goBack() {
  navigateTo("/karte");
}

definePageMeta({
  layout: "map-layout",
  keepalive: true,
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
  <div class="absolute inset-0">
    <NuxtPage></NuxtPage>
  </div>
</template>

<style scoped></style>
