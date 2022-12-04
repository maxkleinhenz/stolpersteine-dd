import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';

export const useLandingPageHeight = () => {
  const quasar = useQuasar();

  const computeLandingPageHeight = () => {
    if (quasar.platform.is.mobile) {
      landingPageHeightCss.value = `${window.innerHeight}px`;
    } else {
      landingPageHeightCss.value = '100vh';
    }
  };

  const landingPageHeightCss = ref('100vh');
  computeLandingPageHeight();

  watch(
    () => quasar.screen.height < quasar.screen.width,
    () => {
      computeLandingPageHeight();
    }
  );

  return {
    landingPageHeightCss,
  };
};
