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
        <Swiper
          class="!py-8 !px-2 sm:!px-12"
          slides-per-view="auto"
          :centered-slides="true"
          :center-insufficient-slides="true"
          :initial-slide="0"
          :modules="[SwiperNavigation, SwiperMousewheel]"
          :navigation="false"
          :mousewheel="true"
          :breakpoints="{
            [tabletWidth]: {
              centeredSlides: false,
              navigation: { prevEl: '.prev-button', nextEl: '.next-button' },
            },
          }"
          @update="(e) => swiperRef?.slideTo(0)"
          @swiper="onSwiper"
        >
          <SwiperSlide
            v-for="stolperstein in swipableStolpersteine"
            :key="stolperstein.stolperstein.id"
            class="w-4/5 max-w-[370px] px-2"
          >
            <div class="h-full">
              <StolpersteinListItem :stolperstein="stolperstein" />
            </div>
          </SwiperSlide>

          <template v-slot:container-start>
            <div class="absolute left-0 bottom-8 top-8 z-10 hidden items-center p-2 sm:flex">
              <AppButton
                shape="rounded"
                size="small"
                class="prev-button bg-accent-2 text-white"
                @click="(e) => swiperRef?.slidePrev()"
                ><AppIcon name="ic:baseline-chevron-left"
              /></AppButton>
            </div>
          </template>
          <template v-slot:container-end>
            <div class="absolute right-0 bottom-8 top-8 z-10 hidden items-center p-2 sm:flex">
              <AppButton
                shape="rounded"
                size="small"
                class="next-button bg-accent-2 text-white"
                @click="(e) => swiperRef?.slideNext()"
                ><AppIcon name="ic:baseline-chevron-right"
              /></AppButton>
            </div>
          </template>
        </Swiper>
      </ClientOnly>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Swiper as SwiperClass } from "swiper/types";
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

const { tabletWidth } = useAppBreakpoints();

const swiperRef = ref<SwiperClass>();
function onSwiper(swiper: SwiperClass) {
  swiperRef.value = swiper;
  swiper.wrapperEl.style.alignItems = "center";
}
</script>

<style scoped></style>
