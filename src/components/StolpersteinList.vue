<template>
  <!-- <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar> -->
  <q-scroll-area style="height: calc(100% - 155px); margin-top: 155px">
    <q-list>
      <stolperstein-list-item
        v-for="item in stolpersteine"
        :key="item.id"
        :stolperstein="item"
      ></stolperstein-list-item>
    </q-list>
  </q-scroll-area>

  <div class="header row absolute-top app-bg q-pa-md">
    <div class="col">
      <p class="text-h4 q-pa-none q-ma-none">Stolpersteine Dresden</p>
      <p class="text-subtitle1">Es waren unsere Nachbarn</p>
      <search-box-component></search-box-component>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent, onMounted } from 'vue';
import StolpersteinListItem from './StolpersteinListItem.vue';
import SearchBoxComponent from './StolpersteinSearchBoxComponent.vue';

export default defineComponent({
  components: {
    StolpersteinListItem,
    SearchBoxComponent,
  },
  setup() {
    const store = useStore();

    const stolpersteine = computed(() => store.getters.filteredStolpersteine());

    onMounted(async () => {
      await store.actions.loadStolpersteine();
    });
    return { stolpersteine };
  },
});
</script>
<style lang="scss" scoped>
$height: 155px;

.header {
  height: $height;
  border-bottom: 1px solid $primary;
}
</style>
