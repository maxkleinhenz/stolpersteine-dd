<template>
  <Splide :options="options" ref="splideRef">
    <template v-slot:before-track>
      <div class="splide__arrows">
        <q-btn
          class="splide__arrow splide__arrow--prev your_class"
          icon="chevron_left"
          unelevated
          round
          color="primary"
        >
        </q-btn>
        <q-btn
          class="splide__arrow splide__arrow--next your_class"
          icon="chevron_right"
          unelevated
          round
          color="primary"
        ></q-btn>
      </div>
    </template>
    <SplideSlide
      v-for="stolperstein in props.stolpersteine"
      :key="stolperstein.stolperstein.id"
    >
      <StolpersteinListItem
        :stolperstein-feature="stolperstein"
        :show-arrow="false"
        :show-shadow="true"
      ></StolpersteinListItem>
    </SplideSlide>
  </Splide>
</template>

<script setup lang="ts">
import { Splide as JsSplide, Options as SplideOption } from '@splidejs/splide';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { useQuasar } from 'quasar';
import StolpersteinListItem from 'src/components/StolpersteinListItem.vue';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { onMounted, PropType, ref, watch } from 'vue';

const props = defineProps({
  stolpersteine: {
    type: Object as PropType<StolpersteinFeature[] | undefined>,
  },
});

const quasar = useQuasar();

const splideRef = ref<typeof Splide>();
const jsSplide = ref<JsSplide | undefined>();

const options = ref<SplideOption>({
  type: 'slide',
  arrows: false,
  fixedWidth: 'min(100%, 350px)',
  autoHeight: true,
  gap: '1em',
  padding: {
    left: '3em',
    right: '3em',
  },
  pagination: false,
  trimSpace: false,
  wheel: true,
  waitForTransition: true,
});

onMounted(() => {
  jsSplide.value = splideRef.value?.splide as JsSplide;
  // jsSplide.value.on('mounted', () => console.log('mounted'));
  // jsSplide.value.on('refresh', onRefresh);
});

watch(
  () => props.stolpersteine,
  () => {
    options.value.arrows = false;
    jsSplide.value?.refresh();

    setTimeout(() => {
      onStolpersteineRefresh();
    }, 200);
  }
);

const onStolpersteineRefresh = () => {
  if (jsSplide.value) {
    jsSplide.value.go(0);

    // total width
    const slideSize = jsSplide.value.Components.Layout.sliderSize() ?? 0;
    // visible width
    const listSize = jsSplide.value.Components.Layout.listSize() ?? 0;

    const allVisible = slideSize < listSize;

    options.value.arrows = !allVisible && quasar.screen.gt.xs;
    options.value.wheel = !allVisible;
    options.value.drag = !allVisible;
    jsSplide.value.options = options.value;

    jsSplide.value.refresh();
  }
};
</script>

<style lang="scss">
@import '@splidejs/splide/dist/css/splide.min.css';

.splide__track {
  padding-top: 20px;
  padding-bottom: 20px;
}

.splide__list {
  align-items: center;
}
</style>
