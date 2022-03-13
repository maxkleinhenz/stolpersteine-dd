<template>
  <q-scroll-area class="full-height">
    <q-list separator>
      <q-item
        v-for="entry in menuEntries"
        :key="entry.to"
        class="list-item"
        exact-active-class="active"
        clickable
        v-ripple
        :to="{ name: entry.to }"
      >
        <q-item-section>{{ entry.name }}</q-item-section>

        <q-item-section side>
          <q-icon name="chevron_right" color="black" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { menuEntries } from 'src/common/InfoMenuEntries';
</script>

<style scoped lang="scss">
.list-item {
  font-size: 1rem;
  padding: 1.5rem 1rem;

  &.active {
    background-color: $primary;
    color: white;
  }
}
</style>
