<template>
  <q-virtual-scroll
    class="stolperstein-list__scrollarea"
    :items="stolpersteine"
    separator
  >
    <template v-slot="{ item }">
      <StolpersteinListItem
        :key="item.id"
        :stolperstein-feature="item"
        @click.stop
      ></StolpersteinListItem>
    </template>
  </q-virtual-scroll>

  <div class="stolperstein-list__header absolute-top app-bg">
    <div class="row gt-sm q-pt-md">
      <div class="col">
        <p class="text-h4 q-pa-none q-ma-none">Stolpersteine Dresden</p>
        <p class="text-subtitle1 q-pa-none q-ma-none">
          Es waren unsere Nachbarn
        </p>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col">
        <SearchBoxComponent></SearchBoxComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import StolpersteinListItem from './StolpersteinListItem.vue';
import SearchBoxComponent from './StolpersteinSearchBox.vue';

export default defineComponent({
  components: {
    StolpersteinListItem,
    SearchBoxComponent,
  },
  setup() {
    const store = useStore();

    const stolpersteine = computed(() => store.getters.filteredStolpersteine());

    return { stolpersteine };
  },
});
</script>

<style lang="scss">
$stolperstein-list-header-height: 73px;
$stolperstein-list-header-height-md: 157px;

.stolperstein-list__scrollarea {
  background-color: $app-background-color;
  height: calc(100% - 58px);
  margin-top: 58px;

  @media (min-width: $breakpoint-md-min) {
    height: calc(100% - 157px);
    margin-top: $stolperstein-list-header-height-md;
  }
}

.stolperstein-list__header {
  border-bottom: 1px solid $primary;
  height: $stolperstein-list-header-height;
  margin-top: 0;
  padding: 0 16px 16px 16px;

  @media (min-width: $breakpoint-md-min) {
    height: $stolperstein-list-header-height-md;
  }
}
</style>
