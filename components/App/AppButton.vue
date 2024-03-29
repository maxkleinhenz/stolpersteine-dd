<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const buttonClass = cva("transform active:scale-95 transition-colors duration-300", {
  variants: {
    intent: {
      hero: "bg-white text-base font-semibold uppercase shadow-lg hover:bg-accent-2 hover:text-white inline-block",
      primary: "text-accent-2 border-accent-2 hover:bg-accent-2 hover:text-white",
      secondary: "",
      link: "hover:underline underline-offset-4 p-2",
      default: "",
      white: "bg-white hover:bg-gray-200",
      black: "bg-black text-white hover:bg-neutral-700",
    },
    shape: {
      default: "",
      rounded: "rounded-full aspect-square",
      pill: "rounded-full border hover:shadow-md",
    },
    size: {
      xs: "px-2 py-1 text-sm",
      small: "p-3 flex justify-center items-center",
      medium: "p-3 sm:p-4 flex justify-center items-center",
      large: "flex justify-center items-center text-xl p-4 sm:p-5",
      hero: "py-4 px-7",
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
  <component :is="component" :class="buttonClass({ intent, shape, size })" v-bind="$attrs">
    <slot />
  </component>
</template>
