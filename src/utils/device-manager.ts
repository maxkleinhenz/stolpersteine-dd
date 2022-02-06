import { Device } from "@/enums/device.enum";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { onMounted, onUnmounted } from "vue";

export function useDeviceManager() {
  const store = useStore();
  const onWidthChange = () => {
    store.commit(MutationTypes.SET_WINDOW_WIDTH, window.innerWidth);
  };

  onMounted(() => {
    onWidthChange();
    window.addEventListener("resize", onWidthChange);
  });
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));
}

export function isGreaterEquals(device: Device): boolean {
  const store = useStore();
  return store.getters.currentDevice >= device;
}

export function isSmallerThen(device: Device): boolean {
  const store = useStore();
  return store.getters.currentDevice < device;
}
