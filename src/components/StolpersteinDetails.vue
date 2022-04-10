<template>
  <article>
    <section class="header-section" aria-labelledby="">
      <q-card class="app-card">
        <q-img src="images/Josef_Altbach_Stolperstein_Dresden.JPG" fit="cover">
        </q-img>

        <q-card-section class="card-content row q-gutter-y-md">
          <div class="col-12 col-sm">
            <div class="card-header">
              <h3 class="title text-weight-bold q-my-sm">
                {{ props.stolperstein?.stolperstein.name }}
              </h3>
            </div>
            <div class="row">
              <span>
                <template v-if="props.stolperstein?.stolperstein.strasse">
                  {{ props.stolperstein.stolperstein.strasse }}
                  {{ props.stolperstein.stolperstein.hausnummer }}
                  <br />
                </template>
                {{ props.stolperstein?.stolperstein.plz }}
                {{ props.stolperstein?.stolperstein.ort }}
              </span>
            </div>
          </div>
          <div class="col-12 col-sm-auto text-center">
            <q-avatar size="128px">
              <q-img ratio="1" src="images/portrait-placeholder.png" />
            </q-avatar>
          </div>
        </q-card-section>

        <q-card-section class="card-content row q-gutter-y-md">
          <div class="col-12 col-sm">
            <q-btn
              class="action-btn q-mr-md"
              outline
              round
              color="primary"
              icon="share"
            >
              <q-tooltip
                class="bg-primary text-body2"
                :delay="300"
                transition-show="jump-right"
                transition-hide="jump-left"
                anchor="center right"
                self="center left"
              >
                Teilen
              </q-tooltip>
            </q-btn>
            <q-btn
              class="action-btn q-mr-md"
              outline
              round
              color="primary"
              icon="bookmark_border"
            >
              <q-tooltip
                class="bg-primary text-body2"
                :delay="300"
                transition-show="jump-right"
                transition-hide="jump-left"
                anchor="center right"
                self="center left"
              >
                Merken
              </q-tooltip>
            </q-btn>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              class="action-btn full-width"
              outline
              rounded
              color="primary"
              icon="fireplace"
              label="12 Kerzen angezündet"
            >
              <q-tooltip
                class="bg-primary text-body2"
                :delay="300"
                :transition-show="
                  quasar.screen.gt.sm ? 'jump-right' : 'jump-down'
                "
                :transition-hide="quasar.screen.gt.sm ? 'jump-left' : 'jump-up'"
                :anchor="quasar.screen.gt.sm ? 'center right' : 'bottom middle'"
                :self="quasar.screen.gt.sm ? 'center left' : 'top middle'"
                max-width="200px"
              >
                Anteil nehmen und eine Kerze anzünden
              </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <section class="inscription-section">
      <q-card class="app-card">
        <q-card-section class="card-header">
          <h3 class="title text-center text-weight-bold q-my-sm">Inschrift</h3>
        </q-card-section>
        <q-card-section class="card-content">
          <div class="inscription column items-center text-weight-medium">
            <q-spinner
              v-if="!inscription?.length"
              color="primary"
              size="3em"
              :thickness="2"
            />
            <span v-for="(text, index) in inscription" :key="index">
              {{ text }}</span
            >
          </div>
        </q-card-section>
      </q-card>
    </section>

    <section class="biography-section" aria-labelledby="">
      <q-card class="app-card">
        <q-card-section class="card-header">
          <h3 class="title text-center text-weight-bold q-my-sm">Biografie</h3>
        </q-card-section>
        <q-card-section class="card-content">
          <div class="text q-pa-lg">
            <p>Josef Altbach wurde am 28. Oktober 1886 in Wyszków geboren.</p>
            <p>
              Seine zweite Frau Sarah wurde am 5. Juli 1882 geboren. Die Ehe,
              die nach jüdischem Ritus geschlossen wurde, wurde in Deutschland
              nicht anerkannt. Josef Altbach lebte seit 1926 in Deutschland und
              war Inhaber eines Zigarren- und Tabakgeschäfts. Im Zuge der
              sogenannten Polen-Aktion wurde die Familie am 28. Oktober 1938
              nach Polen zwangsausgewiesen. Die Familie ging vermutlich über das
              oberschlesische Beuthen (Bytom) nach Lemberg (Lviv) zu Verwandten.
              Die genauen Todesumstände der beiden sind unbekannt.
            </p>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <section class="image-section" aria-labelledby="">
      <q-card class="app-card">
        <q-card-section class="card-header">
          <h3 class="title text-center text-weight-bold q-my-sm">
            Bildergalerie
          </h3>
        </q-card-section>
        <q-card-section class="card-content">
          <q-carousel
            class="image-carousel"
            swipeable
            animated
            v-model="imageSlide"
            thumbnails
            infinite
            arrows
            control-type="unelevated"
            control-color="primary"
            transition-next="slide-left"
            transition-prev="slide-right"
          >
            <q-carousel-slide
              :name="1"
              img-src="images/Josef_Altbach_Stolperstein_Dresden.JPG"
            />
            <q-carousel-slide
              :name="2"
              img-src="images/portrait-placeholder.png"
            />
          </q-carousel>
        </q-card-section>
      </q-card>
    </section>

    <section
      class="other-section"
      aria-labelledby=""
      v-if="otherStolpersteine?.length"
    >
      <q-card class="app-card">
        <q-card-section class="card-header">
          <h3 class="title text-center text-weight-bold q-my-sm">
            Stolpersteine am gleichen Ort
          </h3>
        </q-card-section>
        <q-card-section class="card-content">
          <StolpersteinListItem
            v-for="stolperstein in otherStolpersteine"
            :key="stolperstein.stolperstein.id"
            :stolpersteinFeature="stolperstein"
          ></StolpersteinListItem>
        </q-card-section>
      </q-card>
    </section>

    <section class="feedback-section">
      <q-btn class="action-btn" rounded>
        <q-icon name="mail_outline" /> Feedback zum Stolperstein</q-btn
      >
    </section>

    <section class="back-to-top-section">
      <q-btn
        class="action-btn"
        round
        icon="expand_less"
        color="white"
        text-color="dark"
        size="lg"
        @click="emit('toTop')"
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import axios from 'axios';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { PropType, ref, watch } from 'vue';
import { parse } from 'node-html-parser';
import { useQuasar } from 'quasar';
import { useStolpersteinUtils } from 'src/common/StolpersteinUtils';
import StolpersteinListItem from './StolpersteinListItem.vue';
import { useStore } from 'src/store';
const props = defineProps({
  stolperstein: {
    type: Object as PropType<StolpersteinFeature>,
    required: false,
  },
});

const emit = defineEmits<{
  (event: 'toTop'): void;
}>();

const quasar = useQuasar();
const store = useStore();
const { findStolpersteineAtCoords } = useStolpersteinUtils();

const otherStolpersteine = ref<StolpersteinFeature[]>();

watch(
  () => props.stolperstein,
  (value) => {
    if (value) {
      void loadBiography(value);

      otherStolpersteine.value = findStolpersteineAtCoords(
        value.geometry.coordinates,
        store.state.stolpersteine
      ).filter((e) => e.stolperstein.id !== value.stolperstein.id);
    }
  }
);

const inscription = ref<Array<string>>([]);
const imageSlide = ref(1);

const loadBiography = async (stolperstein: StolpersteinFeature) => {
  const code = process.env.FUNCTION_CODE ?? '';
  const url = `https://stolperstein-proxy.azurewebsites.net/api/proxy?code=${code}&url=${stolperstein.stolperstein.url}`;

  var response = await axios.get<string>(url);
  const text = response.data;
  const root = parse(text);
  const content = root.querySelector('.entry-content');

  const inscriptionText =
    content?.querySelector('.inschrift')?.structuredText ?? '';
  inscription.value = inscriptionText.split(/(?:\r\n|\r|\n)/g);

  //let afterInschrift = false;
  // content?.childNodes.forEach((node) => {
  //   if (node instanceof TextNode) {
  //     console.log(node.text);
  //   } else if (node instanceof HTMLElement) {
  //     console.log(node);
  //     if (node.attributes['class'] === 'inschrift') {
  //       afterInschrift = true;
  //     }

  //     if (afterInschrift) {
  //       if (node.nodeType === NodeType.TEXT_NODE) {
  //         console.log('text', node);
  //         biography.value.push(node.text);
  //       } else if (
  //         node.nodeType === NodeType.ELEMENT_NODE &&
  //         node.tagName.toLowerCase() === 'b'
  //       ) {
  //         position.value = node.firstChild.text;
  //         return;
  //       }
  //     }
  //   }
  // });
};
</script>

<style lang="scss" scoped>
section {
  margin: 12px 12px 32px 12px;

  @media (min-width: $stolperstein-details-width) {
    margin: 48px 32px;
  }
}

.title {
  font-size: 2em;
}

.card-content {
  font-size: 1rem;
  padding: 16px;

  @media (min-width: $stolperstein-details-width) {
    padding: 16px 32px 32px 32px;
  }
}

.inscription {
  font-size: 1.2rem;
}

.biography-section {
  .text {
    background-color: white;
    border-radius: $app-card-border-radius;
  }
}

.image-carousel {
  border-radius: $app-card-border-radius;
}

.feedback-section {
  margin-top: 64px;
  display: flex;
  justify-content: center;

  button {
    box-sizing: border-box;
    padding: 12px 24px;
    min-width: 50%;
    background-color: $primary;
    color: white;
    .q-icon {
      margin-right: 10px;
    }
  }
}

.action-btn {
  min-height: 3em;
}

.back-to-top-section {
  display: flex;
  justify-content: center;
  margin-top: 84px;
  margin-bottom: 64px;
}
</style>
