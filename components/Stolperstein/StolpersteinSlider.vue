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
          slides-per-view="auto"
          :centered-slides="isSmallScreen"
          initial-slide="0"
          :modules="[Navigation, Mousewheel]"
          class="py-8"
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
import { Navigation, Mousewheel } from "swiper";
import { StolpersteinFeature } from "~~/models/stolperstein.model";
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();
const selectedStolpersteine = computed(() => store.selectedStolpersteine);

const stolpersteine = ref<StolpersteinFeature[]>([]);
const swipableStolpersteine = computed(() => {
  if (store.selectedStolpersteine?.length) {
    stolpersteine.value = store.selectedStolpersteine;
    return store.selectedStolpersteine;
  }
  return stolpersteine.value;
});

const breakpoints = useBreakpoints(breakpointsTailwind);

const isBiggerScreen = breakpoints.greater("sm");
const isSmallScreen = computed(() => !isBiggerScreen.value);
</script>

<style scoped></style>
