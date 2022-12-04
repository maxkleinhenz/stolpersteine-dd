<template>
  <BottomSheet :open-height-ratio="0.8" :header-height="96" :margin-bottom="56">
    <template #header>
      <div class="stolperstein-list__header">
        <div class="row q-mt-xs">
          <div class="col">
            <StolpersteinSearchBox></StolpersteinSearchBox>
          </div>
        </div>
      </div>
    </template>

    <template #default>
      <div class="stolperstein-list full-height">
        <StolpersteinList></StolpersteinList>
      </div>
    </template>
  </BottomSheet>
</template>

<script setup lang="ts">
import StolpersteinList from 'src/components/StolpersteinList/StolpersteinList.vue';
import StolpersteinSearchBox from 'src/components/StolpersteinList/StolpersteinSearchBox.vue';
import BottomSheet from 'src/components/Common/BottomSheet.vue';
</script>

<style scoped lang="scss">
.stolperstein-list {
  margin-top: 1px;
}

.stolperstein-list__header {
  border-bottom: 1px solid $primary;
  margin-top: 0;
  padding: 0 16px 16px 16px;
}
</style>
