<template>
  <q-btn
    class="col-auto"
    :class="{ small: !props.mobileMode }"
    color="primary"
    :stack="props.mobileMode"
    :outline="!props.mobileMode"
    :flat="props.mobileMode"
    rounded
    @click="clickAction ? clickAction() : () => undefined"
  >
    <q-icon
      :name="props.icon"
      size="sm"
      :class="{ 'q-mr-xs': !props.mobileMode }"
    ></q-icon>
    <span class="label-small">{{ props.label }}</span>
  </q-btn>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  mobileMode: {
    type: Boolean,
    required: false,
    default: false,
  },
  clickAction: {
    type: Function,
    required: false,
    default: undefined,
  },
});

watch(
  () => props.mobileMode,
  (value: boolean) => {
    console.log('widthLabel', value);
  }
);
</script>

<style scoped lang="scss">
.q-btn {
  min-height: 3em;
  min-width: 3em;
  flex: 1 1 80px;

  &.small {
    flex: 0 0 auto;
  }

  .label-small {
    font-size: 0.7rem;
  }
}
</style>
