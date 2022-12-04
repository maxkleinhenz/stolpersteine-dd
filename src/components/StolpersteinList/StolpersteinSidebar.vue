<template>
  <div class="stolperstein-list">
    <StolpersteinList></StolpersteinList>
  </div>

  <div class="stolperstein-list__header absolute-top app-bg">
    <div class="row q-pt-md">
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

<script setup lang="ts">
import SearchBoxComponent from './StolpersteinSearchBox.vue';
import StolpersteinList from './StolpersteinList.vue';
</script>

<style lang="scss" scoped>
$header-height: 157px;

.stolperstein-list {
  background-color: $app-background-color;
  height: calc(100% - #{$header-height});
  margin-top: $header-height;
}

.stolperstein-list__header {
  border-bottom: 1px solid $primary;
  height: $header-height;
  margin-top: 0;
  padding: 0 16px 16px 16px;
}
</style>
