<template>
  <div v-bind="containerProps" class="full-width full-height" style="">
    <div v-bind="wrapperProps">
      <div
        v-for="item in list"
        :key="item.data.stolperstein.id"
        class="q-px-md q-py-sm"
      >
        <StolpersteinListItem
          :stolperstein-feature="item.data"
          @click.stop=""
        ></StolpersteinListItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import { computed } from 'vue';
import StolpersteinListItem from 'src/components/StolpersteinList/StolpersteinListItem.vue';
import { useVirtualList } from '@vueuse/core';

const store = useStolpersteinStore();
const items = computed(() => store.filteredStolpersteine);
const { list, containerProps, wrapperProps } = useVirtualList(items, {
  itemHeight: 112,
});
</script>
