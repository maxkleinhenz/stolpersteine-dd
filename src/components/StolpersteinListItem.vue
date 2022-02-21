<template>
  <q-item clickable v-ripple class="item q-pa-lg">
    <q-item-section top avatar>
      <q-avatar size="64px">
        <q-img ratio="1" src="Josef_Altbach_Stolperstein_Dresden.JPG" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-body1 text-weight-bold">{{
        stolpersteinFeature.stolperstein.name
      }}</q-item-label>
      <q-item-label class="text-body2">
        {{ stolpersteinFeature.stolperstein.strasse }}
        {{ stolpersteinFeature.stolperstein.hausnummer }}
      </q-item-label>
      <q-item-label class="text-body2">
        {{ stolpersteinFeature.stolperstein.plz }}
        {{ stolpersteinFeature.stolperstein.ort }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon :name="matChevronRight" color="black" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { defineComponent, PropType } from 'vue';
import { matChevronRight } from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'StolpersteinListItem',
  props: {
    stolpersteinFeature: {
      required: true,
      type: Object as PropType<StolpersteinFeature>,
    },
  },
  components: {},
  setup() {
    return { matChevronRight };
  },
});
</script>

<style lang="scss" scoped>
.item:not(:first-child) {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
