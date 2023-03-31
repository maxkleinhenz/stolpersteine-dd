<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();
const stolersteine = computed(() => store.stolpersteine);
</script>

<template>
  <div class="space-y-3 bg-base-1">
    <AppButton
      class="mx-3 flex gap-3 rounded-2xl bg-base-2 p-3 hover:drop-shadow-md"
      v-for="stolerstein in stolersteine"
      :key="stolerstein.stolperstein.id"
      to="/karte"
      intent="secondary"
    >
      <div class="flex-initial place-self-center">
        <img class="aspect-square w-14 rounded-full object-cover" src="/stolpersteine/images/default.jpg" />
      </div>
      <div class="flex-1">
        <p class="text-lg font-semibold">{{ stolerstein.stolperstein.name }}</p>
        <p class="">{{ stolerstein.stolperstein.strasseHausnummer }}</p>
        <p class="">{{ stolerstein.stolperstein.plzOrt }}</p>
      </div>
      <div class="flex-initial place-self-center"><AppIcon name="ic:baseline-chevron-right" size="small" /></div>
    </AppButton>
  </div>
</template>
