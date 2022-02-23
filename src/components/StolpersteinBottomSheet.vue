<template>
  <keep-alive>
    <BottomSheet :settings="settings" ref="buttomSheet">
      <div class="stolperstein-list">
        <StolpersteinList></StolpersteinList>
      </div>

      <div class="stolperstein-list__header absolute-top app-bg">
        <div class="stolperstein-list__draggable q-mt-xs"></div>
        <div class="row q-mt-xs">
          <div class="col">
            <StolpersteinSearchBox></StolpersteinSearchBox>
          </div>
        </div>
      </div>
    </BottomSheet>
  </keep-alive>
</template>

<script lang="ts">
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import BottomSheet from '../plugins/BottomSheet.vue';
import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import StolpersteinList from './StolpersteinList.vue';
import StolpersteinSearchBox from './StolpersteinSearchBox.vue';
import { matKeyboardArrowUp } from '@quasar/extras/material-icons';

export default defineComponent({
  components: {
    BottomSheet,
    StolpersteinList,
    StolpersteinSearchBox,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const cupertino = ref<CupertinoPane>();
    const buttomSheet = ref<typeof BottomSheet>();

    const settings = <CupertinoSettings>{
      breaks: {
        bottom: { enabled: true, height: 78, bounce: false },
      },
      initialBreak: 'bottom',
      upperThanTop: false,
      lowerThanBottom: false,
      buttonDestroy: false,
      bottomOffset: 56,
      fitScreenHeight: true,
      fitHeight: true,
      showDraggable: false,
      clickBottomOpen: false,
      dragBy: ['.cupertino-pane .stolperstein-list__header'],
    };

    onMounted(async () => {
      cupertino.value = buttomSheet.value?.cupertino as CupertinoPane;
      await changeVisibility(props.show);
      setTimeout(() => {
        void cupertino.value?.calcFitHeight();
      }, 500);

      const header = document.querySelector(
        '.stolperstein-list__header'
      ) as HTMLDivElement;

      header?.addEventListener('touchmove', onTouchMove, false);
      header?.addEventListener('click', onClick, false);
    });

    onBeforeUnmount(() => {
      const header = document.querySelector(
        '.stolperstein-list__header'
      ) as HTMLDivElement;

      header?.removeEventListener('touchmove', onTouchMove, false);
      header?.removeEventListener('click', onClick, false);
    });

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const onClick = () => {
      if (!cupertino.value) return;

      void (async function () {
        if (cupertino.value?.currentBreak() !== 'top') {
          // await cupertino.value?.calcFitHeight();
          await cupertino.value?.moveToBreak('top');
        } else {
          await cupertino.value?.moveToBreak('bottom');
        }
      })();
    };

    watch(
      () => props.show,
      async () => {
        await cupertino.value?.calcFitHeight();
        await changeVisibility(props.show);
      }
    );

    const changeVisibility = async (show: boolean) => {
      if (show) {
        if (!cupertino.value?.isPanePresented()) {
          await cupertino.value?.present({ animate: true });
        }
        await cupertino.value?.moveToBreak('bottom');
      } else if (cupertino.value?.isPanePresented()) {
        cupertino.value?.hide();
      }
    };

    return { buttomSheet, settings, matKeyboardArrowUp };
  },
});
</script>

<style lang="scss">
.cupertino-pane-wrapper .pane {
  background-color: $app-background-color;
  border-radius: 20px 20px 0 0;
}
</style>

<style scoped lang="scss">
$header-height: 78px;

.stolperstein-list__draggable {
  width: 3em;
  height: 3px;
  background-color: $primary;
  border-radius: 10px;
  margin: 6px auto 12px auto;
}

.stolperstein-list {
  background-color: $app-background-color;
  height: calc(100% - #{$header-height});
  margin-top: calc(#{$header-height} - 15px);
}

.stolperstein-list__header {
  border-bottom: 1px solid $primary;
  height: $header-height;
  margin-top: 0;
  padding: 0 16px 16px 16px;
  border-radius: 20px 20px 0 0;
}
</style>
