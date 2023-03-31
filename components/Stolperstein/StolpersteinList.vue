<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();
const stolersteine = computed(() => store.filteredStolpersteine);

const { list, containerProps, wrapperProps } = useVirtualList(stolersteine, {
  itemHeight: 116,
});
</script>

<template>
  <div v-bind="containerProps">
    <div v-bind="wrapperProps">
      <div v-for="stolerstein in list" :key="stolerstein.data.stolperstein.id" class="py-2 px-3">
        <AppButton
          class="flex gap-3 rounded-2xl bg-base-2 p-3 ring-accent-2 transition-shadow hover:shadow-lg hover:ring-1"
          to="/karte"
          intent="secondary"
        >
          <div class="flex-initial place-self-center">
            <img class="aspect-square w-14 rounded-full object-cover" src="/stolpersteine/images/default.jpg" />
          </div>
          <div class="flex-1">
            <p class="text-lg font-semibold">{{ stolerstein.data.stolperstein.name }}</p>
            <p class="">{{ stolerstein.data.stolperstein.strasseHausnummer }}</p>
            <p class="">{{ stolerstein.data.stolperstein.plzOrt }}</p>
          </div>
          <div class="flex-initial place-self-center"><AppIcon name="ic:baseline-chevron-right" size="small" /></div>
        </AppButton>
      </div>
    </div>
  </div>
</template>
