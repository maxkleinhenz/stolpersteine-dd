<template>
  <NavComponent :isDesktop="isDesktop" />
  <main
    class="container-fliud app-bg"
    :class="[{ desktop: isDesktop }, { mobile: !isDesktop }]"
  >
    <router-view />
  </main>
  <FooterComponent v-if="isDesktop" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
import NavComponent from "@/components/NavComponent.vue";
import {
  useDeviceManager,
  isGreaterEquals,
  isSmallerThen,
} from "@/utils/device-manager";
import { Device } from "./enums/device.enum";
import { useStore } from "./store";

export default defineComponent({
  name: "App",
  components: {
    NavComponent,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    useDeviceManager();

    const isDesktop = ref(false);
    const isMobile = ref(false);
    watch(
      () => store.getters.currentDevice,
      () => {
        isDesktop.value = isGreaterEquals(Device.Desktop);
        isMobile.value = isSmallerThen(Device.Desktop);
      }
    );

    return {
      isDesktop,
      isMobile,
    };
  },
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  overflow: hidden;
  height: -webkit-fill-available;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;

  &.desktop {
    padding-bottom: $footer-height;
  }
  &.mobile {
    // padding-bottom: $navbar-mobile-height;
    padding-bottom: $footer-height;
  }
}
</style>
