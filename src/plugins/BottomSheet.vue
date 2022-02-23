<template>
  <div class="cupertino-pane" ref="cupertino">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
} from 'vue';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

export default defineComponent({
  name: 'BottomSheet',
  props: {
    settings: {
      type: Object as PropType<CupertinoSettings>,
    },
  },
  setup(props) {
    const cupertino = ref<CupertinoPane>();

    onMounted(() => {
      cupertino.value = new CupertinoPane('.cupertino-pane', props.settings);
    });

    onBeforeUnmount(async () => {
      if (cupertino.value) await cupertino.value.destroy();
    });

    return { cupertino };
  },
});
</script>
