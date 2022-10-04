<template>
  <q-virtual-scroll
    class="full-width full-height"
    :items-size="itemCount"
    :items-fn="getListItems"
    :virtual-scroll-item-size="112"
    virtual-scroll-slice-size="20"
  >
    <template #default="{ item }">
      <div :key="item.id" class="q-px-md q-py-sm">
        <StolpersteinListItem
          :stolperstein-feature="item"
          @click.stop=""
        ></StolpersteinListItem>
      </div>
    </template>
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { QVirtualScroll } from 'quasar';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { computed } from 'vue';
import StolpersteinListItem from './StolpersteinListItem.vue';

const store = useStolpersteinStore();

const itemCount = computed(() => store.filteredStolpersteine.length);

const getListItems = (from: number, size: number) => {
  return store.filteredStolpersteine.slice(from, from + size);
};
</script>
