<template>
  <q-item
    clickable
    v-ripple
    class="item q-ma-md q-pa-md app-card-bg"
    @click="showDetails()"
  >
    <q-item-section top avatar>
      <q-avatar size="64px">
        <q-img ratio="1" src="images/Josef_Altbach_Stolperstein_Dresden.JPG" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-body1 text-weight-bold">{{
        stolpersteinFeature.stolperstein.name
      }}</q-item-label>
      <q-item-label
        class="text-body2"
        v-if="stolpersteinFeature.stolperstein.strasse"
      >
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

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { PropType } from 'vue';
import { matChevronRight } from '@quasar/extras/material-icons';
import { useRouter } from 'vue-router';
import { routeNames } from 'src/router/routes';

const props = defineProps({
  stolpersteinFeature: {
    required: true,
    type: Object as PropType<StolpersteinFeature>,
  },
});

const router = useRouter();
const showDetails = async () => {
  await router.push({
    name: routeNames.mapDetails,
    params: { id: props.stolpersteinFeature.stolperstein.id },
  });
};
</script>

<style lang="scss" scoped>
.item {
  border-radius: 15px;
}
// .item:not(:first-child) {
//   border-top: 1px solid rgba(0, 0, 0, 0.12);
// }
</style>
