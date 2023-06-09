<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const sectionClass = cva("px-3 py-6 sm:px-6", {
  variants: {
    color: {
      white: "bg-white",
      light: "bg-base-2",
      medium: "bg-base-1",
    },
  },
  defaultVariants: {
    color: "light",
  },
});

type SectionProps = Required<VariantProps<typeof sectionClass>>;
withDefaults(
  defineProps<{
    header?: string;
    color?: SectionProps["color"];
  }>(),
  {
    color: "light",
  }
);
</script>

<template>
  <section :class="sectionClass({ color })" v-bind="$attrs">
    <h3 v-if="header" class="py-6 text-center text-2xl font-semibold">{{ header }}</h3>
    <slot />
  </section>
</template>
