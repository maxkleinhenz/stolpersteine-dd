<template>
  <div class="map-view">
    <div class="sidebar-wrapper" id="sidebar">
      <transition name="sidebar">
        <div class="sidebar-root" v-show="showSidebar">
          <SidebarComponent />
        </div>
      </transition>

      <button
        class="toggler btn btn-default d-inline-flex justify-content-center align-items-center"
        @click="toggleSidebar()"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" v-if="showSidebar" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" v-else />
      </button>
    </div>

    <div class="map-wrapper" :class="{ 'with-sidebar': showSidebar }">
      <MapComponent ref="map" :withSidebar="showSidebar" />
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
    const showSidebar = ref(true);
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
      showSidebar.value = !showSidebar.value;

      clearResizeMapTimeout();
      resizeMapTimeout = setTimeout(function () {
        map.value.invalidateMapSize();
      }, 400);
    }

    function clearResizeMapTimeout(): void {
      clearTimeout(resizeMapTimeout);
    }

    return {
      showSidebar,
      map,
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.map-view {
  height: 100%;
  width: 100%;
}

.sidebar-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 3.5em;
  max-height: 100%;
  z-index: 1;
  // transition: margin 0.3s ease-in-out;

  .toggler {
    border-radius: 0 0.5rem 0.5rem 0;
    background-color: $app-background-color;
    margin-top: 3em;
    height: 5em;
    width: 3em;

    &:hover,
    &:focus {
      background-color: $app-background-color-dark-05;
    }

    > svg {
      height: 1.5em !important;
      width: 1.5em !important;
    }
  }
}

.map-wrapper {
  height: 100%;
  width: 100%;
  transition: transform 0.3s ease-in-out;

  &.with-sidebar {
    transform: translateX(calc($app-map-sidebar-width / 2));
  }
}

.sidebar-enter-from,
.sidebar-leave-to {
  margin-left: -$app-map-sidebar-width;
}

.sidebar-leave-active,
.sidebar-enter-active {
  transition: all 0.3s ease-in-out;
}

.sidebar-enter-to,
.sidebar-leave-from {
  margin-left: 0px;
}
</style>
