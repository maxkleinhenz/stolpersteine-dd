<template>
  <q-virtual-scroll
    class="full-width full-height"
    :items="filteredStolpersteine"
    virtual-scroll-item-size="96"
  >
    <template v-slot="{ item }">
      <div class="q-ma-md">
        <StolpersteinListItem
          :key="item.id"
          :stolperstein-feature="item"
          @click.stop
        ></StolpersteinListItem>
      </div>
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
