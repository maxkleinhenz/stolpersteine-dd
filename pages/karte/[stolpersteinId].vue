<template>
  <AppSidebar :appear="true" :open="isSidebarOpen" @update:open="onUpdateOpen" :overlay="true">
    <template v-slot:sidebar>
      <aside class="relative min-h-screen w-screen max-w-2xl shadow-[15px_0_15px_0_rgba(0,0,0,0.1)]">
        <StolpersteinDetails :stolperstein="stolperstein"></StolpersteinDetails>
        <AppButton
          intent="white"
          shape="rounded"
          size="medium"
          class="absolute right-0 top-0 z-10 m-6 shadow-md"
          @click="onUpdateOpen(false)"
          ><AppIcon size="medium" name="ic:baseline-close"
        /></AppButton>
      </aside>
    </template>
  </AppSidebar>
</template>

<script setup lang="ts">
import { RouteLocationNormalized } from "vue-router";

const isSidebarOpen = ref(true);
const stolperstein = computed(() => useCurrentStolperstein().value);

function onUpdateOpen(open: boolean) {
  if (!open) {
    isSidebarOpen.value = false;
    dbNavigateToKarte();
  }
}

const dbNavigateToKarte = useDebounceFn(() => navigateToKarte(), 300, { maxWait: 500 });

function navigateToKarte() {
  navigateTo("/karte");
}

onActivated(() => (isSidebarOpen.value = true));

onDeactivated(() => (isSidebarOpen.value = false));

useHead({
  title: stolperstein.value?.stolperstein.name,
});

definePageMeta({
  middleware: async (to: RouteLocationNormalized) => {
    const id = parseInt(to.params.stolpersteinId.toString() ?? "") as number;
    if (Number.isInteger(id)) {
      const loaded = await loadStolperstein(id);
      if (loaded) {
        const currentStolperstein = useCurrentStolperstein();
        currentStolperstein.value = loaded;
        return true;
      }
    }

    return "/karte";
  },
});
</script>
