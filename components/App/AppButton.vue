<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const buttonClass = cva("transform active:scale-95 transition-colors duration-300", {
  variants: {
    intent: {
      hero: "rounded-full bg-white py-3 px-5 text-base font-semibold uppercase shadow-lg hover:bg-accent-2 hover:text-white",
      primary: "hover:bg-accent-2 hover:text-white",
      secondary: "",
      link: "hover:underline underline-offset-4 p-2",
      default: "",
    },
    shape: {
      default: "",
      rounded: "rounded-full",
    },
    size: {
      small: "small",
      medium: "medium",
      large: "text-xl",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    shape: "default",
  },
});

type ButtonProps = Required<VariantProps<typeof buttonClass>>;
withDefaults(
  defineProps<{
    intent?: ButtonProps["intent"];
    shape?: ButtonProps["shape"];
    size?: ButtonProps["size"];
  }>(),
  {
    intent: "primary",
    shape: "default",
    size: "medium",
  }
);

const attrs = useAttrs();
const component = computed(() => {
  if (attrs.to || attrs.href) return resolveComponent("NuxtLink");
  return "button";
});
</script>

<template>
  <component :is="component" :class="buttonClass({ intent, shape, size })" v-bind="$attrs"> <slot /></component>
</template>
