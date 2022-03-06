<template>
  <q-item
    clickable
    v-ripple
    class="app-card q-pa-md"
    :class="{ 'shadow-3': showShadow }"
    @click="showDetails()"
  >
    <q-item-section top avatar>
      <q-avatar size="64px">
        <q-img ratio="1" src="images/Josef_Altbach_Stolperstein_Dresden.JPG" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-body1 text-weight-bold">{{
        props.stolpersteinFeature.stolperstein.name
      }}</q-item-label>
      <q-item-label
        class="text-body2"
        v-if="props.stolpersteinFeature.stolperstein.strasse"
      >
        {{ props.stolpersteinFeature.stolperstein.strasse }}
        {{ props.stolpersteinFeature.stolperstein.hausnummer }}
      </q-item-label>
      <q-item-label class="text-body2">
        {{ props.stolpersteinFeature.stolperstein.plz }}
        {{ props.stolpersteinFeature.stolperstein.ort }}
      </q-item-label>
    </q-item-section>

    <q-item-section v-show="props.showArrow" side>
      <q-icon name="chevron_right" color="black" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { useRouter } from 'vue-router';
import { routeNames } from 'src/router/routes';

interface Props {
  stolpersteinFeature: StolpersteinFeature;
  showArrow?: boolean;
  showShadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showArrow: true,
  showShadow: false,
});

const router = useRouter();
const showDetails = async () => {
  await router.push({
    name: routeNames.mapDetails,
    params: { id: props.stolpersteinFeature.stolperstein.id },
  });
};
</script>
