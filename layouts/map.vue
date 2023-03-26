<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

var sidebarOpen = ref(true);
const sidebarFixed = useBreakpoints(breakpointsTailwind).greater("lg");
</script>

<template>
  <div>
    <AppTopNavigation />
    <AppButton
      v-if="!sidebarFixed"
      intent="default"
      shape="rounded"
      class="absolute m-8 bg-white p-4 drop-shadow-md"
      @click="() => (sidebarOpen = true)"
      ><AppIcon name="ic:baseline-menu"
    /></AppButton>
    <AppSidebar v-model:open="sidebarOpen" :overlay="!sidebarFixed">
      <template v-slot:sidebar>
        <aside class="w-screen max-w-sm">
          <MapSidebar />
        </aside>
      </template>

      <template v-slot:main>
        <slot />
      </template>
    </AppSidebar>
  </div>
</template>

<style scoped></style>
