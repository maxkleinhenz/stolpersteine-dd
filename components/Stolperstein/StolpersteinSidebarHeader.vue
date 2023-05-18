<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();

const searchText = ref(store.searchText);

function search() {
  store.searchText = searchText.value;
}

function reset() {
  searchText.value = "";
  search();
}
</script>

<template>
  <div class="border border-b-accent-2 px-3 pt-3">
    <h1 class="text-3xl font-semibold">Stolpersteine Dresden</h1>
    <p class="text-lg">Es waren unsere Nachbarn</p>
    <div class="relative py-4">
      <label for="stolpersteine-search" class="sr-only">Durchsuche Stolpersteine</label>
      <input
        id="stolpersteine-search"
        type="type"
        placeholder="Suche"
        v-model="searchText"
        class="border-1 w-full rounded-full border py-3 px-4 pr-[72px] transition-shadow focus:shadow-md focus:outline-none focus:ring-1 focus:ring-accent-2"
        @keyup.enter="search"
        @keyup.esc="reset"
      />
      <div class="absolute inset-y-0 right-0 mr-2 grid grid-flow-col place-content-center">
        <AppButton
          v-show="searchText"
          type="button"
          intent="default"
          shape="rounded"
          size="xs"
          class="h-8 w-8 p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-500"
          @click="reset"
        >
          <span class="sr-only">Setze Suche zurück</span>
          <AppIcon name="ic:baseline-close" size="small" />
        </AppButton>
        <AppButton
          type="button"
          intent="default"
          shape="rounded"
          size="xs"
          class="h-8 w-8 p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-500"
          @click="search"
        >
          <span class="sr-only">Suche</span>
          <AppIcon name="ic:baseline-search" size="small" />
        </AppButton>
      </div>
    </div>
  </div>
</template>
