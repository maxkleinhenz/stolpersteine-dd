<template>
  <q-virtual-scroll
    class="full-width full-height"
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
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import StolpersteinListItem from './StolpersteinListItem.vue';

export default defineComponent({
  components: {
    StolpersteinListItem,
  },
  setup() {
    const store = useStore();
    const stolpersteine = computed(() => store.getters.filteredStolpersteine());

    return { stolpersteine };
  },
});
</script>
