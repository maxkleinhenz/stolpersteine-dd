<template>
  <article>
    <section class="header q-pa-lg" aria-labelledby="">
      <q-card class="full-width app-card-bg">
        <q-img src="images/Josef_Altbach_Stolperstein_Dresden.JPG" fit="cover">
        </q-img>

        <q-card-section class="row q-mt-lg">
          <div class="col-12 col-sm">
            <h3 class="text-weight-bold q-my-sm">
              {{ props.stolperstein?.stolperstein.name }}
            </h3>
            <span
              class="text-subtitle1"
              v-if="props.stolperstein?.stolperstein.strasse"
            >
              {{ props.stolperstein.stolperstein.strasse }}
              {{ props.stolperstein.stolperstein.hausnummer }}
            </span>
            <span class="text-subtitle1">
              <br />
              {{ props.stolperstein?.stolperstein.plz }}
              {{ props.stolperstein?.stolperstein.ort }}
            </span>
          </div>
          <div class="col-12 col-sm-auto q-pa-md text-center">
            <q-avatar size="128px">
              <q-img ratio="1" src="images/portrait-placeholder.png" />
            </q-avatar>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn class="q-mr-md" outline round color="primary" icon="share" />
          <q-btn
            class="q-mr-md"
            outline
            round
            color="primary"
            icon="bookmark_border"
          />
        </q-card-section>
      </q-card>
    </section>
    <section class="biography q-pa-lg" aria-labelledby="">
      <q-card class="full-width app-card-bg">
        <q-img src="images/Josef_Altbach_Stolperstein_Dresden.JPG" fit="cover">
        </q-img>

        <q-card-section class="row q-mt-lg">
          <div class="col-12 col-sm">
            <h3 class="text-weight-bold q-my-sm">
              {{ props.stolperstein?.stolperstein.name }}
            </h3>
            <span
              class="text-subtitle1"
              v-if="props.stolperstein?.stolperstein.strasse"
            >
              {{ props.stolperstein.stolperstein.strasse }}
              {{ props.stolperstein.stolperstein.hausnummer }}
            </span>
            <span class="text-subtitle1">
              <br />
              {{ props.stolperstein?.stolperstein.plz }}
              {{ props.stolperstein?.stolperstein.ort }}
            </span>
          </div>
          <div class="col-12 col-sm-auto q-pa-md text-center">
            <q-avatar size="128px">
              <q-img ratio="1" src="images/portrait-placeholder.png" />
            </q-avatar>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn class="q-mr-md" outline round color="primary" icon="share" />
          <q-btn
            class="q-mr-md"
            outline
            round
            color="primary"
            icon="bookmark_border"
          />
        </q-card-section>
      </q-card>
    </section>
  </article>
</template>

<script setup lang="ts">
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { PropType } from 'vue';
const props = defineProps({
  stolperstein: {
    type: Object as PropType<StolpersteinFeature | undefined>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.header {
  h3 {
    font-size: 2em;
  }
}
</style>
