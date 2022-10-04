<template>
  <q-input
    v-model="searchText"
    rounded
    outlined
    dense
    placeholder="Suche"
    aria-placeholder="Durchsuche Stolpersteine"
    bg-color="white"
    @click.stop
    @keyup.enter="searchStolpersteine()"
    @keyup.esc="clearSearch()"
  >
    <template #append>
      <q-btn
        v-show="searchText"
        round
        dense
        flat
        icon="close"
        @click.stop="clearSearch()"
      />
      <q-btn
        round
        dense
        flat
        icon="search"
        @click.stop="searchStolpersteine()"
      />
    </template>

    <template #after> </template>
  </q-input>
</template>

<script setup lang="ts">
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { onBeforeUnmount, ref } from 'vue';

const store = useStolpersteinStore();

const searchText = ref(store.stolpersteineSearchText);

onBeforeUnmount(() => {
  clearSearch();
});

const searchStolpersteine = () => {
  store.selectedStolpersteine = undefined;
  store.stolpersteineSearchText = searchText.value;
};

const clearSearch = () => {
  searchText.value = '';
  searchStolpersteine();
};
</script>
