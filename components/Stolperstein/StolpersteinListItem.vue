<template>
  <div>
    <AppButton
      class="flex gap-2 rounded-2xl bg-base-2 ring-accent-2 transition-shadow hover:shadow-lg hover:ring-1 md:gap-3"
      :to="`/karte/${stolperstein.stolperstein.id}`"
      :replace="replace"
      intent="secondary"
    >
      <div class="flex-initial place-self-center">
        <img
          class="aspect-square w-14 rounded-full object-cover"
          :src="stolperstein.stolperstein.stolpersteinThumbImage"
        />
      </div>
      <div class="flex-1">
        <p class="pb-1 text-lg font-semibold leading-6">{{ stolperstein.stolperstein.name }}</p>
        <p class="leading-5">
          {{ stolperstein.stolperstein.strasseHausnummer }}<br />
          {{ stolperstein.stolperstein.plzOrt }}
        </p>
      </div>
      <div class="flex-initial place-self-center"><AppIcon name="ic:baseline-chevron-right" size="small" /></div>
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from "~~/models/stolperstein.model";

defineProps<{ stolperstein: StolpersteinFeature; replace?: boolean }>();
</script>
