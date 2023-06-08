<template>
  <ClientOnly>
    <Swiper :loop="true" :navigation="false" @update="() => swiperRef?.slideTo(0)" @swiper="onSwiper">
      <template v-slot:container-start>
        <div class="absolute bottom-8 left-0 top-8 z-10 hidden items-center p-2 sm:flex">
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
        <div class="absolute bottom-8 right-0 top-8 z-10 hidden items-center p-2 sm:flex">
          <AppButton
            shape="rounded"
            size="small"
            class="next-button bg-accent-2 text-white"
            @click="() => swiperRef?.slideNext()"
            ><AppIcon name="ic:baseline-chevron-right"
          /></AppButton>
        </div>
      </template>

      <SwiperSlide v-for="i in images"
        ><img class="h-[500px] max-h-[500px] w-full object-cover" :src="i"
      /></SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Swiper as SwiperClass } from "swiper/types";
import { StolpersteinFeature } from "~~/models/stolperstein.model";

const props = defineProps<{ stolperstein?: StolpersteinFeature }>();

const images = ref([
  props.stolperstein?.stolperstein.stolpersteinImage,
  "/stolpersteine/images/portrait-placeholder.png",
]);

const swiperRef = ref<SwiperClass>();
function onSwiper(swiper: SwiperClass) {
  swiperRef.value = swiper;
}
</script>
