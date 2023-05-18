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
const isSidebarOpen = ref(true);

const routeParams = toRef(useRoute(), "params");
const stolpersteinId = computed(() => {
  const stolpersteinIdParam = routeParams.value.stolpersteinId;
  if (typeof stolpersteinIdParam === "string") {
    const parsed = Number(stolpersteinIdParam);
    if (!isNaN(parsed)) return parsed;
  }
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
</script>

<style scoped></style>
