<template>
  <AppSidebar
    :appear="true"
    :open="isSidebarOpen"
    @update:open="onUpdateOpen"
    :overlay="true"
    @on-after-leave="onAfterLeave"
  >
    <template v-slot:sidebar>
      <aside class="relative min-h-screen w-screen max-w-2xl shadow-[15px_0_15px_0_rgba(0,0,0,0.1)]">
        <StolpersteinDetails :stolperstein-id="stolpersteinId"></StolpersteinDetails>
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
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const isSidebarOpen = ref(true);

const routeParams = toRef(useRoute(), "params");
const stolpersteinId = computed(() => {
  const stolpersteinIdParam = routeParams.value.stolpersteinId.toString();
  const parsed = Number(stolpersteinIdParam);
  if (!isNaN(parsed)) return parsed;
  onAfterLeave();
});

function onUpdateOpen(open: boolean) {
  if (!open) {
    isSidebarOpen.value = false;
  }
}

function onAfterLeave() {
  navigateTo("/karte");
}

definePageMeta({
  middleware: (to: RouteLocationNormalized) => {
    const store = useStolpersteinStore();
    const isNumber = /^\d+$/.test(to.params.stolpersteinId.toString());
    if (isNumber) {
      const stolpersteinId = Number(to.params.stolpersteinId);
      const valid = store.stolpersteine.some((s) => s.stolperstein.id === stolpersteinId);
      if (valid) return true;
    }

    return "/karte";
  },
});
</script>
