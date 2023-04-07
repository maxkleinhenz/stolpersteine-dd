<template>
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="transform translate-y-full"
  >
    <div v-show="selectedStolpersteine?.length" v-bind="$attrs">
      <ClientOnly>
        <swiper-container
          ref="swiperRef"
          class="py-8"
          slides-per-view="auto"
          :centered-slides="isSmallScreen"
          initial-slide="0"
          :modules="[Navigation, Mousewheel]"
        >
          <swiper-slide
            v-for="stolperstein in swipableStolpersteine"
            :key="stolperstein.stolperstein.id"
            class="w-4/5 max-w-[350px] px-2"
          >
            <div class="h-full"><StolpersteinListItem :stolperstein="stolperstein" /></div
          ></swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";
import Swiper from "swiper";
import { Navigation, Mousewheel } from "swiper";
import { StolpersteinFeature } from "~~/models/stolperstein.model";
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();
const selectedStolpersteine = computed(() => store.selectedStolpersteine);

const tempStolpersteine = ref<StolpersteinFeature[]>([]);
const swipableStolpersteine = computed(() => {
  if (store.selectedStolpersteine?.length) {
    tempStolpersteine.value = store.selectedStolpersteine;
    return store.selectedStolpersteine;
  }
  return tempStolpersteine.value;
});

const breakpoints = useBreakpoints(breakpointsTailwind);
const isBiggerScreen = breakpoints.greater("sm");
const isSmallScreen = computed(() => !isBiggerScreen.value);

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };
const swiperRef = ref<SwiperRef | null>(null);
const isSwiperInitilizied = ref(false);

watchEffect((onCleanup) => {
  if (!isSwiperInitilizied.value && swiperRef.value) {
    swiperRef.value.initialize();
    isSwiperInitilizied.value = true;
    swiperRef.value.swiper.wrapperEl.style.alignItems = "center";
    swiperRef.value.swiper.on("slidesLengthChange", handleSlidesLendthChanged);
  }
  onCleanup(() => swiperRef.value?.swiper.off("slidesLengthChange", handleSlidesLendthChanged));
});

function handleSlidesLendthChanged(swiper: Swiper | undefined) {
  if (swiper == undefined) return;

  const canSwipe = !!swiper.allowSlidePrev || !!swiper.allowSlideNext;
  swiper.wrapperEl.style.justifyContent = canSwipe ? "flex-start" : "center";
}

const debounce = useDebounceFn(
  () => {
    console.log("debounce");
    handleSlidesLendthChanged(swiperRef.value?.swiper);
  },
  500,
  { maxWait: 5000 }
);

useResizeObserver(swiperRef, (entries) => {
  debounce();
});
</script>

<style scoped></style>
