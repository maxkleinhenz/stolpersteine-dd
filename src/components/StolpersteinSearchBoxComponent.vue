<template>
  <q-input
    rounded
    outlined
    dense
    v-model="searchText"
    Placeholder="Suche"
    aria-placeholder="Suche nach Stolpersteinen"
    bg-color="white"
    @keyup.enter="searchStolpersteine()"
    @keyup.esc="clearSearch()"
  >
    <template v-slot:append>
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

    <template v-slot:after> </template>
  </q-input>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, onBeforeUnmount, ref } from 'vue';

export default defineComponent({
  name: 'StolpersteinSearchBoxComponent',
  setup() {
    const store = useStore();

    const state = ref(store.state);
    const searchText = ref(state.value.stolpersteineSearchText);

    onBeforeUnmount(() => {
      clearSearch();
    });

    const searchStolpersteine = () => {
      store.mutations.setStolpersteinSearchText(searchText.value);
    };

    const clearSearch = () => {
      searchText.value = '';
      searchStolpersteine();
    };

    return {
      searchText,
      clearSearch,
      searchStolpersteine,
    };
  },
});
</script>
