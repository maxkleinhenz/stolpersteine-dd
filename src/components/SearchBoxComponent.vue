<template>
  <div class="search-wrapper">
    <div class="input-group">
      <input
        class="form-control bg-light rounded-pill app-shadow"
        type="search"
        v-model="searchText"
        placeholder="Suche"
        @keyup.enter="searchStolpersteine()"
        @keyup.esc="clearSearch()"
      />
      <span class="input-group-append">
        <div class="search-input-append">
          <button
            class="search-button btn rounded-pill ms-n5"
            type="button"
            aria-label="Suche zurücksetzen"
            v-if="searchText"
            @click="clearSearch()"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
          <button
            class="clear-button btn rounded-pill ms-n5"
            type="button"
            aria-label="Suche"
            @click="searchStolpersteine()"
          >
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { defineComponent, onBeforeUnmount, ref } from "vue";

export default defineComponent({
  name: "SearchBoxComponent",
  setup() {
    const store = useStore();

    const state = ref(store.state);
    const searchText = ref(state.value.stolpersteineSearchText);

    onBeforeUnmount(() => {
      clearSearch();
    });

    function searchStolpersteine() {
      store.commit(
        MutationTypes.SET_STOLPERSTEINE_SEARCH_TEXT,
        searchText.value
      );
    }

    function clearSearch() {
      searchText.value = "";
      store.commit(MutationTypes.SET_STOLPERSTEINE_SEARCH_TEXT, "");
    }

    return {
      searchText,
      clearSearch,
      searchStolpersteine,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-wrapper {
  .form-control {
    padding-right: 80px;
    &:focus {
      z-index: 1;
    }
  }

  .search-input-append {
    margin-left: -80px;
    text-align: right;
  }
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
