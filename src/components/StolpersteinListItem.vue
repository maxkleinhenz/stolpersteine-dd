<template>
  <q-item clickable v-ripple class="item q-pa-lg">
    <q-item-section top avatar>
      <q-avatar size="64px">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-body1 text-weight-bold">{{
        stolperstein.name
      }}</q-item-label>
      <q-item-label class="text-body2">
        {{ stolperstein.strasse }} {{ stolperstein.hausnummer }}
      </q-item-label>
      <q-item-label class="text-body2">
        {{ stolperstein.plz }} {{ stolperstein.ort }}
      </q-item-label>

      <!-- <div class="row">
        <div class="col">
          <q-btn
            class="q-mt-md q-px-md"
            rounded
            color="primary"
            label="zum Stein"
            :icon-right="matChevronRight"
          />
        </div>
      </div> -->
    </q-item-section>

    <q-item-section side>
      <q-icon :name="matChevronRight" color="black" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import Stolptersein from 'src/models/stolperstein.model';
import { defineComponent, PropType } from 'vue';
import { matChevronRight } from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'StolpersteinListItem',
  props: {
    stolperstein: {
      required: true,
      type: Object as PropType<Stolptersein>,
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
