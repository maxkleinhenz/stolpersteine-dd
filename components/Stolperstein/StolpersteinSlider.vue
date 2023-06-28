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
          class="!px-2 !py-12 sm:!px-16"
          :slidesPerView="1.15"
          :centeredSlides="true"
          :centered-slides-bounds="true"
          :centerInsufficientSlides="true"
          :initial-slide="0"
          :modules="[SwiperNavigation, SwiperMousewheel]"
          :navigation="false"
          :mousewheel="true"
          :breakpoints="{
            [tabletWidth]: {
              centeredSlides: false,
              slidesPerView: 'auto',
              navigation: { prevEl: '.prev-button', nextEl: '.next-button' },
            },
          }"
          @update="() => swiperRef?.slideTo(0)"
          @swiper="onSwiper"
        >
          <SwiperSlide
            v-for="stolperstein in swipableStolpersteine"
            :key="stolperstein.stolperstein.id"
            class="w-4/5 max-w-[370px] pl-2 pr-2"
          >
            <div class="h-full w-full">
              <StolpersteinListItem :stolperstein="stolperstein" />
            </div>
          </SwiperSlide>

          <template v-slot:container-start>
            <div class="absolute bottom-8 left-0 top-8 z-10 hidden items-center p-2 md:flex">
              <AppButton
                shape="rounded"
                size="small"
                class="prev-button bg-accent-2 text-white"
                @click="() => swiperRef?.slidePrev()"
                ><AppIcon name="ic:baseline-chevron-left"
              /></AppButton>
            </div>
          </template>
          <template v-slot:container-end>
            <div class="absolute bottom-8 right-0 top-8 z-10 hidden items-center p-2 md:flex">
              <AppButton
                shape="rounded"
                size="small"
                class="next-button bg-accent-2 text-white"
                @click="() => swiperRef?.slideNext()"
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
