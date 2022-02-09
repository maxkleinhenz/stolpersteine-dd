<template>
  <div class="container-fluid sidebar-container g-0 d-flex flex-column app-bg">
    <div class="row sidebar-header flex-column g-0 m-0 p-4">
      <h1 class="mb-0">Stolpersteine</h1>
      <p class="text-muted">Es waren unsere Nachbarn</p>
      <SearchBoxComponent />
    </div>

    <div class="row sidebar-list list-group flex-nowrap g-0 m-0">
      <div
        class="list-group-item py-3 px-4 app-bg"
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
import { computed, defineComponent } from "vue";
import StolpersteinListItem from "./StolpersteinListItem.vue";
import SearchBoxComponent from "./SearchBoxComponent.vue";

export default defineComponent({
  name: "SidebarComponent",
  components: { StolpersteinListItem, SearchBoxComponent },
  setup() {
    const store = useStore();
    const stolpersteine = computed(() => store.getters.filteredStolpersteine);

    return {
      stolpersteine,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  width: $app-map-sidebar-width;

  .sidebar-header {
    border: none;
    border-bottom: 1px solid $app-primary-color;
  }

  .sidebar-list {
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    overflow: auto !important;

    .list-group-item {
      border: none;
      border-bottom: 1px solid $app-primary-color;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .list-group-item:hover {
      background-color: $app-background-color-dark-05;
    }
  }
}
</style>
