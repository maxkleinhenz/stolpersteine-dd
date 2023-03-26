<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const iconClass = cva("", {
  variants: {
    intent: {
      primary: "",
      secondary: "secondary",
    },
    size: {
      small: "h-6 w-6",
      medium: "h-8 w-8",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

type IconProps = Required<VariantProps<typeof iconClass>>;
withDefaults(
  defineProps<{
    name: string;
    intent?: IconProps["intent"];
    size?: IconProps["size"];
  }>(),
  {
    intent: "primary",
    size: "medium",
  }
);
</script>

<template>
  <Icon :name="name" :class="iconClass({ intent, size })">
    <slot />
  </Icon>
</template>
