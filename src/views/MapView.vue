<template>
  <div class="root container-fluid p-0 h-100">
    <div class="row g-0 h-100 flex-nowrap">
      <div
        class="col sidebar"
        id="sidebard"
        :class="{ hidden: isSidebarHidden }"
      >
        <SidebarComponent />
        <div
          class="sidebar-toggler d-inline-flex justify-content-center align-items-center bg-white"
          @click="toggleSidebar()"
        >
          <font-awesome-icon
            :icon="['fas', 'chevron-left']"
            v-if="!isSidebarHidden"
          />
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            v-if="isSidebarHidden"
          />
        </div>
      </div>
      <div
        class="map-container col"
        :class="{ 'width-sidebar': !isSidebarHidden }"
      >
        <MapComponent ref="map" :controlOffset="isSidebarHidden ? 0 : 225" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import MapComponent from "@/components/MapComponent.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  name: "MapOffCanvas",
  components: {
    SidebarComponent,
    MapComponent,
  },
  setup() {
    const store = useStore();
    const isSidebarHidden = ref<boolean>(false);
    const map = ref<HTMLElement | any>(null);

    onMounted(async () => {
      await reloadStolpersteine();
    });

    watch(
      () => store.getters.selectedStolperstein,
      (stolperstein) => {
        window.alert(stolperstein?.name);
      }
    );

    async function reloadStolpersteine() {
      await store.dispatch(ActionTypes.LOAD_STOLPERSTEINE, undefined);
    }

    function toggleSidebar() {
      isSidebarHidden.value = !isSidebarHidden.value;
      setTimeout(function () {
        map.value.invalidateMapSize();
      }, 400);
    }

    return {
      map,
      isSidebarHidden,
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
$sidebar-width: 450px;

.root {
  background-color: $background-color;
}

.sidebar {
  flex: 0 0 $sidebar-width;
  max-height: calc(100vh - $navbar-height);
  z-index: 100;
  transition: margin 0.3s ease-in-out;
}
.hidden {
  margin-left: -$sidebar-width;
}
.sidebar-toggler {
  position: relative;
  top: calc(-100vh + 9em);
  left: 450px;
  height: 5em;
  width: 3em;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;

  > svg {
    height: 1.5em !important;
    width: 1.5em !important;
  }
}
.map-container {
  height: 100%;
  width: 100%;
  z-index: 1;
  transition: margin 0.3s ease-in-out;
}

.width-sidebar {
  margin-left: -$sidebar-width / 2;
  margin-right: -$sidebar-width / 2;
}
</style>
