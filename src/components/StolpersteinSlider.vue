<template>
  <Swiper
    class="stolperstein-swiper"
    :class="{ 'centered-swiper': !isSlideable }"
    :slides-per-view="'auto'"
    :centered-slides="quasar.screen.xs"
    :mousewheel="quasar.screen.gt.xs"
    :modules="[Navigation, Mousewheel]"
    :initial-slide="0"
    @swiper="onSwiper"
  >
    <template v-if="showNavigation" #container-start>
      <q-btn
        class="arrow prev"
        icon="chevron_left"
        elevated
        round
        color="primary"
        @click="swiper?.slidePrev()"
      >
      </q-btn
    ></template>
    <template v-if="showNavigation" #container-end
      ><q-btn
        class="arrow next"
        icon="chevron_right"
        elevated
        round
        color="primary"
        @click="swiper?.slideNext()"
      ></q-btn
    ></template>

    <SwiperSlide
      v-for="stolperstein in props.stolpersteine"
      :key="stolperstein.stolperstein.id"
      class="stolperstein-slide"
    >
      <StolpersteinListItem
        :stolperstein-feature="stolperstein"
        :show-arrow="false"
        :show-shadow="true"
      ></StolpersteinListItem>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Mousewheel } from 'swiper';
import { Swiper as SwiperType } from 'swiper/types';
import { useQuasar } from 'quasar';
import StolpersteinListItem from 'src/components/StolpersteinListItem.vue';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  stolpersteine: {
    type: Object as PropType<StolpersteinFeature[] | undefined>,
    default: undefined,
  },
});

const quasar = useQuasar();
const swiper = ref<SwiperType>();

const onSwiper = (swiperType: SwiperType) => {
  swiper.value = swiperType;

  swiper.value.on('update', (swiper: SwiperType) => {
    swiper.slideTo(0);
  });
};

const showNavigation = computed(() => {
  if (quasar.screen.xs) {
    return false;
  }

  return isSlideable.value;
});

const isSlideable = computed(() => {
  // show arrows when slideable -> more slides then width
  return swiper.value?.allowSlidePrev || swiper.value?.allowSlideNext;
});
</script>

<style lang="scss">
@import 'swiper/scss';
@import 'swiper/scss/navigation';

.stolperstein-swiper {
  > .swiper-wrapper {
    align-items: center;
  }

  @media (min-width: $breakpoint-sm-min) {
    padding-left: 64px;
    padding-right: 64px;
  }
}

.centered-swiper {
  > .swiper-wrapper {
    justify-content: center;
  }
}

.stolperstein-slide {
  max-width: min(80%, 350px);
  padding: 12px 8px;
}

.arrow {
  position: absolute;
  top: calc(50% - 21px);
  z-index: 2;

  &.prev {
    left: 8px;
  }

  &.next {
    right: 8px;
  }
}
</style>
