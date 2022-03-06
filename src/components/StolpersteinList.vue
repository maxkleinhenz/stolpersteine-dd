<template>
  <q-virtual-scroll class="full-width full-height" :items="stolpersteine">
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
import { useStore } from 'src/store';
import { computed } from 'vue';
import StolpersteinListItem from './StolpersteinListItem.vue';

const store = useStore();
const stolpersteine = computed(() => store.getters.filteredStolpersteine());
</script>
