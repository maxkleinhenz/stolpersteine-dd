<template>
  <div class="root container-fluid p-0 h-100">
    <div class="row g-0 h-100 flex-nowrap">
      <div
        class="col sidebar"
        id="sidebard"
        :class="{ hidden: isSidebarHidden }"
      >
        <SidebarComponent />
        <button
          class="btn btn-default sidebar-toggler d-inline-flex justify-content-center align-items-center"
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
        </button>
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
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
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

    let resizeMapTimeout: number;

    onMounted(async () => {
      await reloadStolpersteine();
    });

    onBeforeUnmount(() => {
      clearResizeMapTimeout();
    });

    watch(
      () => store.getters.selectedStolpersteine,
      (stolpersteine) => {
        if (stolpersteine) {
          let message = "";
          stolpersteine.forEach((stolperstein) => {
            message += `${stolperstein.name}\n`;
          });
          window.alert(message);
        }
      }
    );

    async function reloadStolpersteine() {
      await store.dispatch(ActionTypes.LOAD_STOLPERSTEINE, undefined);
    }

    function toggleSidebar() {
      clearResizeMapTimeout();

      isSidebarHidden.value = !isSidebarHidden.value;
      resizeMapTimeout = setTimeout(function () {
        map.value.invalidateMapSize();
      }, 400);
    }

    function clearResizeMapTimeout(): void {
      clearTimeout(resizeMapTimeout);
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

.sidebar {
  flex: 0 0 $sidebar-width;
  max-height: 100%;
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
  background-color: $app-background-color;

  &:hover,
  &:focus {
    background-color: $app-background-color-dark-05;
  }

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
  margin-left: calc($sidebar-width * (-1) / 2);
  margin-right: calc($sidebar-width * (-1) / 2);
}
</style>
