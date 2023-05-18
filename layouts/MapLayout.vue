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
    <AppSidebarContainer v-model:open="sidebarOpen" :overlay="!sidebarFixed">
      <template v-slot:sidebar>
        <aside class="relative w-screen max-w-[420px]">
          <AppButton
            intent="white"
            shape="rounded"
            size="small"
            class="absolute right-0 top-0 m-4 shadow-md sm:hidden"
            @click="() => (sidebarOpen = false)"
            ><AppIcon size="small" name="ic:baseline-close"
          /></AppButton>
          <StolpersteinListSidebar />
        </aside>
      </template>

      <template v-slot:main>
        <slot />
      </template>
    </AppSidebarContainer>

    <AppTopNavigation />
    <AppButton
      v-if="!sidebarFixed"
      intent="white"
      shape="rounded"
      size="medium"
      class="absolute left-8 top-8 shadow-md"
      @click="() => (sidebarOpen = true)"
      ><AppIcon name="ic:baseline-menu"
    /></AppButton>
  </div>
</template>
