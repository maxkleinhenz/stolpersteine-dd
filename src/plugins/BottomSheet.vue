<template>
  <div class="q-pa-md">
    <div
      class="slide-drawer__backdrop fixed-full"
      :style="backdropStyle"
      aria-hidden="true"
      @click="animateDrawerTo(props.headerHeight)"
    ></div>

    <q-card
      class="slide-drawer app-bg slide-drawer--bottom fixed-bottom column no-wrap z-top"
      :style="drawerStyle"
    >
      <q-card-section
        class="draggable-container full-width q-pa-none"
        v-touch-pan.mouse.vertical.prevent="slideDrawer"
        @click="cycleDrawer"
      >
        <div class="draggable q-mt-xs"></div>
        <slot name="header"></slot>
      </q-card-section>

      <q-card-section class="col q-pa-none">
        <slot></slot>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  headerHeight: {
    type: Number,
    default: 0,
    required: false,
  },
  openHeightRatio: {
    type: Number,
    default: 0.85,
    required: false,
  },
  marginBottom: {
    type: Number,
    required: false,
  },
});

const quasar = useQuasar();

const drawerOpenRatioHalf = 50;

const drawerPos = ref(props.headerHeight);

const drawerMaxHeight = computed(() => {
  const maxHeight = Math.max(0, quasar.screen.height * props.openHeightRatio);
  return maxHeight;
});

const drawerOpenRatio = computed(() => {
  const openRatio = Math.round(
    (Math.max(0, drawerPos.value - props.headerHeight) /
      Math.max(1, drawerMaxHeight.value - props.headerHeight)) *
      100
  );
  return openRatio;
});

const drawerStyle = computed(() => {
  return {
    height: `${drawerMaxHeight.value}px`,
    transform: `translateY(${-drawerPos.value}px)`,
    bottom: `${props.marginBottom ?? 0}px`,
    top: `calc(100% - ${props.marginBottom ?? 0}px)`,
  };
});

const drawerMode = computed(() => {
  if (drawerOpenRatio.value > drawerOpenRatioHalf) {
    return 'full';
  }
  return 'handler';
});

const backdropStyle = computed(() => {
  if (drawerOpenRatio.value <= 10) {
    return {
      display: 'none',
    };
  }

  // Max - darkness: 40% (like in Quasar Dialog backdrop)
  const style =
    (Math.max(0, drawerPos.value - props.headerHeight) /
      Math.max(1, drawerMaxHeight.value - props.headerHeight)) *
    40;

  return {
    background: `rgba(0, 0, 0, ${style}%)`,
  };
});

watch(
  () => quasar.screen.height,
  () => {
    const aboveHalf = drawerOpenRatio.value > drawerOpenRatioHalf;
    if (aboveHalf) {
      const targetHeight = drawerMaxHeight.value;
      animateDrawerTo(targetHeight);
    } else {
      const targetHeight = props.headerHeight;
      animateDrawerTo(targetHeight);
    }
  }
);

interface TouchPan {
  delta: {
    x: number;
    y: number;
  };
  isFinal: boolean;
}

const slideDrawer = async (ev: TouchPan) => {
  const { delta, isFinal } = ev;

  drawerPos.value = Math.max(
    props.headerHeight,
    Math.min(drawerMaxHeight.value, drawerPos.value - delta.y)
  );

  if (isFinal === true) {
    await nextTick(() => {
      const aboveHalf = drawerOpenRatio.value > drawerOpenRatioHalf;

      if (aboveHalf) {
        const targetHeight = drawerMaxHeight.value;
        animateDrawerTo(targetHeight);
      } else {
        const targetHeight = props.headerHeight;
        animateDrawerTo(targetHeight);
      }
    });
  }
};

const cycleDrawer = () => {
  if (drawerMode.value === 'handler') {
    animateDrawerTo(drawerMaxHeight.value);
  } else {
    animateDrawerTo(props.headerHeight);
  }
};

let animateTimeout: NodeJS.Timeout;

const animateDrawerTo = (height: number) => {
  clearTimeout(animateTimeout);

  const diff = height - drawerPos.value;
  if (diff !== 0) {
    drawerPos.value += Math.abs(diff) < 2 ? diff : Math.round(diff / 2);

    animateTimeout = setTimeout(() => {
      animateDrawerTo(height);
    }, 30);
  }
};

onBeforeUnmount(() => {
  clearTimeout(animateTimeout);
});
</script>

<style lang="scss" scoped>
.slide-drawer {
  border-radius: 20px 20px 0 0;
}

.draggable-container {
  cursor: grab;
}

.draggable {
  width: 3em;
  height: 3px;
  background-color: $primary;
  border-radius: 10px;
  margin: 8px auto 12px auto;
}
</style>
