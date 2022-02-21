<template>
  <v-cupertino :drawer-options="options" @click="onClick" ref="cupertinoRef">
    <slot></slot>
  </v-cupertino>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import VCupertino from 'v-cupertino';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

export default defineComponent({
  name: 'App',
  components: {
    VCupertino,
  },
  setup() {
    const topHeightPercent = 0.75;
    const computeTopBreakpoint = () => window.innerHeight * topHeightPercent;
    const cupertinoRef = ref<typeof VCupertino>(VCupertino);
    let cupertino: CupertinoPane | undefined;

    const options = <CupertinoSettings>{
      breaks: {
        bottom: { enabled: true, height: 93, bounce: false },
        middle: { enabled: false },
        top: { enabled: true, height: computeTopBreakpoint(), bounce: false },
      },
      initialBreak: 'bottom',
      upperThanTop: false,
      lowerThanBottom: false,
      parentElement: 'main',
      buttonDestroy: false,
      bottomOffset: 56,
      fitScreenHeight: false,
      showDraggable: false,
      dragBy: ['.pane .cupertino-pane .stolperstein-list__header'],
    };

    onMounted(async () => {
      cupertino = cupertinoRef.value?.cupertino as CupertinoPane | undefined;
      await cupertino?.present({ animate: true });

      window.addEventListener('resize', onResize, false);
      const header = cupertino?.paneEl.querySelector(
        '.stolperstein-list__header'
      ) as HTMLDivElement;

      header?.addEventListener('touchmove', onTouchMove, false);

      onResize();
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onResize);

      const header = cupertino?.paneEl.querySelector(
        '.stolperstein-list__header'
      ) as HTMLDivElement;
      header?.removeEventListener('touchmove', onTouchMove);
    });

    const onResize = () => {
      void (async function () {
        await recalcHeight();
      })();
    };

    const onClick = async () => {
      const currentBreack = cupertino?.currentBreak();

      await cupertino?.setBreakpoints({
        top: { enabled: true, height: computeTopBreakpoint(), bounce: false },
      });
      cupertino?.updateScreenHeights();

      if (currentBreack !== 'top') {
        await cupertino?.moveToBreak('top');
      } else {
        await cupertino?.moveToBreak('bottom');
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const recalcHeight = async () => {
      await cupertino?.calcFitHeight(false);
      cupertino?.updateScreenHeights();

      const topBreakpoint = computeTopBreakpoint();
      await cupertino?.setBreakpoints({
        top: { enabled: true, height: topBreakpoint, bounce: false },
      });

      if ((cupertino?.getPaneHeight() ?? 0) > topBreakpoint) {
        await cupertino?.moveToHeight(topBreakpoint);
      } else {
        await cupertino?.moveToBreak('bottom');
      }
    };

    return {
      options,
      cupertinoRef,
      onClick,
    };
  },
});
</script>

<style lang="scss">
.cupertino-pane-wrapper {
  .pane {
    max-width: 100%;
    background-color: $app-background-color;
  }
  .draggable {
    z-index: 1;
    .move {
      background-color: $primary;
    }
  }
}
</style>
