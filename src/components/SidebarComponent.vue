<template>
  <div
    class="sidebar-container d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
  >
    <div
      class="sidebar-header d-flex flex-column flex-shrink-0 p-4 link-dark text-decoration-none border-bottom"
    >
      <h2 class="mb-0">Stolpersteine</h2>
      <p class="text-muted">Es waren unsere Nachbarn</p>

      <div class="search-area">
        <div class="input-group">
          <input
            class="form-control rounded-pill"
            type="search"
            v-model="searchText"
            placeholder="Suche"
            @keyup.enter="searchStolpersteine()"
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
    </div>
    <div class="sidebar-list list-group list-group-flush border-bottom">
      <div
        class="list-group-item list-group-item-action py-3 px-4 lh-tight"
        v-for="stolperstein in stolpersteine"
        :key="stolperstein.id"
      >
        <StolpersteinListItem :stolperstein="stolperstein" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { computed, defineComponent, onBeforeUnmount, ref } from "vue";
import StolpersteinListItem from "./StolpersteinListItem.vue";

export default defineComponent({
  name: "SidebarComponent",
  components: { StolpersteinListItem },
  setup() {
    const store = useStore();
    const state = ref(store.state);

    const stolpersteine = computed(() => store.getters.filteredStolpersteine);
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
      state,
      stolpersteine,
      searchText,
      clearSearch,
      searchStolpersteine,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
}

.sidebar-header {
  .search-area {
    .search-input-append {
      margin-left: -80px;
      text-align: right;
    }
  }
}

.sidebar-list {
  overflow: auto !important;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
