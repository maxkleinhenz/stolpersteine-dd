<script lang="ts" setup>
var sidebarOpenRef = ref(true);
var sidebarOpen = computed({
  get() {
    if (sidebarFixed.value) return true;
    return sidebarOpenRef.value;
  },
  set(newValue) {
    sidebarOpenRef.value = newValue;
  },
});

const { isMinDesktop } = useAppBreakpoints();
const sidebarFixed = isMinDesktop;
</script>

<template>
  <div>
    <AppTopNavigation />
    <div class="absolute z-10">
      <AppButton
        v-if="!sidebarFixed"
        intent="default"
        shape="rounded"
        class="m-8 bg-white p-4 shadow-md hover:bg-gray-200"
        @click="() => (sidebarOpen = true)"
        ><AppIcon name="ic:baseline-menu"
      /></AppButton>
    </div>

    <AppSidebar v-model:open="sidebarOpen" :overlay="!sidebarFixed">
      <template v-slot:sidebar>
        <aside class="relative w-screen max-w-[420px]">
          <AppButton
            intent="default"
            shape="rounded"
            class="absolute right-0 top-0 m-4 aspect-square w-10 bg-white shadow-md hover:bg-gray-200 sm:hidden"
            @click="() => (sidebarOpen = false)"
            ><AppIcon size="small" name="ic:baseline-close"
          /></AppButton>
          <StolpersteinListSidebar />
        </aside>
      </template>

      <template v-slot:main>
        <slot />
      </template>
    </AppSidebar>
  </div>
</template>

<style scoped></style>
