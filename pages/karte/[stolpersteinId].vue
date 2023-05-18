<template>
  <AppSidebar
    :appear="true"
    :open="isSidebarOpen"
    @update:open="onUpdateOpen"
    :overlay="true"
    @on-after-leave="onAfterLeave"
  >
    <template v-slot:sidebar>
      <aside class="relative w-screen max-w-[420px]">
        <AppButton
          intent="default"
          shape="rounded"
          class="absolute right-0 top-0 m-4 aspect-square w-10 bg-white shadow-md hover:bg-gray-200 sm:hidden"
          @click="onUpdateOpen(false)"
          ><AppIcon size="small" name="ic:baseline-close"
        /></AppButton>
        <StolpersteinDetails :stolperstein-id="stolpersteinId"></StolpersteinDetails>
      </aside>
    </template>
  </AppSidebar>
</template>

<script setup lang="ts">
import { RouteLocationNormalized } from "vue-router";
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();

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
