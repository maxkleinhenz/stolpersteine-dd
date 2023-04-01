<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

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
const sidebarFixed = useBreakpoints(breakpointsTailwind).greater("lg");
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
        <aside class="w-screen max-w-[400px]">
          <StolpersteinSidebar />
        </aside>
      </template>

      <template v-slot:main>
        <slot />
      </template>
    </AppSidebar>
  </div>
</template>

<style scoped></style>
