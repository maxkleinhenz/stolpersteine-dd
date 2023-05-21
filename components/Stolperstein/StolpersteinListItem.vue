<template>
  <div>
    <AppButton
      class="flex gap-3 rounded-2xl bg-base-2 p-3 ring-accent-2 transition-shadow hover:shadow-lg hover:ring-1"
      :to="`/karte/${stolperstein.stolperstein.id}`"
      intent="secondary"
    >
      <div class="flex-initial place-self-center">
        <img
          class="aspect-square w-14 rounded-full object-cover"
          :src="stolperstein.stolperstein.stolpersteinThumbImage"
        />
      </div>
      <div class="flex-1">
        <p class="text-lg font-semibold">{{ stolperstein.stolperstein.name }}</p>
        <p class="">{{ stolperstein.stolperstein.strasseHausnummer }}</p>
        <p class="">{{ stolperstein.stolperstein.plzOrt }}</p>
      </div>
      <div class="flex-initial place-self-center"><AppIcon name="ic:baseline-chevron-right" size="small" /></div>
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from "~~/models/stolperstein.model";

defineProps<{ stolperstein: StolpersteinFeature }>();
</script>
