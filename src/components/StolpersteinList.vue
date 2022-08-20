<template>
  <q-virtual-scroll
    class="full-width full-height"
    :items="filteredStolpersteine"
    virtual-scroll-item-size="112"
  >
    <template v-slot="{ item }">
      <StolpersteinListItem
        :key="item.id"
        :stolperstein-feature="item"
        class="q-ma-md"
        @click.stop
      ></StolpersteinListItem>
    </template>
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
import StolpersteinListItem from './StolpersteinListItem.vue';

const store = useStolpersteinStore();
const { filteredStolpersteine } = storeToRefs(store);
</script>
