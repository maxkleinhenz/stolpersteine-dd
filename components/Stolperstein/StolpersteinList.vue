<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const store = useStolpersteinStore();
const stolersteine = computed(() => store.filteredStolpersteine);

const { list, containerProps, wrapperProps } = useVirtualList(stolersteine, {
  itemHeight: 116,
});
</script>

<template>
  <div v-bind="containerProps">
    <div v-bind="wrapperProps">
      <StolpersteinListItem
        v-for="stolperstein in list"
        :key="stolperstein.data.stolperstein.id"
        :stolperstein="stolperstein.data"
        class="py-2 px-3"
      />
    </div>
  </div>
</template>
