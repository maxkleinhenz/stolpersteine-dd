<template>
  <article>
    <section class="header-section" aria-labelledby="">
      <q-card class="app-card">
        <q-img src="images/Josef_Altbach_Stolperstein_Dresden.JPG" fit="cover">
        </q-img>

        <q-card-section class="row q-gutter-y-md">
          <div class="col-12 col-sm">
            <div class="card-header">
              <h3 class="text-weight-bold q-my-sm">
                {{ props.stolperstein?.stolperstein.name }}
              </h3>
            </div>
            <div class="card-content row">
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

        <q-card-section class="row q-gutter-y-md">
          <div class="col-12 col-sm">
            <q-btn class="q-mr-md" outline round color="primary" icon="share">
              <q-tooltip
                class="bg-primary text-body2"
                transition-show="jump-right"
                transition-hide="jump-left"
                anchor="center right"
                self="center left"
              >
                Teilen
              </q-tooltip>
            </q-btn>
            <q-btn
              class="q-mr-md"
              outline
              round
              color="primary"
              icon="bookmark_border"
            >
              <q-tooltip
                class="bg-primary text-body2"
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
              outline
              rounded
              color="primary"
              icon="fireplace"
              label="12 Kerzen angezündet"
              class="full-width"
            >
              <q-tooltip
                class="bg-primary text-body2"
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
        <q-card-section>
          <div class="card-header">
            <h3 class="text-weight-bold q-my-sm">Inschrift</h3>
          </div>
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
        <q-card-section class="row q-mt-lg">
          <div class="card-header">
            <h3 class="text-weight-bold q-my-sm">Biografie</h3>
          </div>
          <div class="card-content">
            <div class="text q-pa-md">
              <p>Josef Altbach wurde am 28. Oktober 1886 in Wyszków geboren.</p>
              <p>
                Seine zweite Frau Sarah wurde am 5. Juli 1882 geboren. Die Ehe,
                die nach jüdischem Ritus geschlossen wurde, wurde in Deutschland
                nicht anerkannt. Josef Altbach lebte seit 1926 in Deutschland
                und war Inhaber eines Zigarren- und Tabakgeschäfts. Im Zuge der
                sogenannten Polen-Aktion wurde die Familie am 28. Oktober 1938
                nach Polen zwangsausgewiesen. Die Familie ging vermutlich über
                das oberschlesische Beuthen (Bytom) nach Lemberg (Lviv) zu
                Verwandten. Die genauen Todesumstände der beiden sind unbekannt.
              </p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <section class="image-section" aria-labelledby="">
      <q-card class="app-card">
        <q-card-section class="q-mt-lg">
          <div class="card-header">
            <h3 class="text-weight-bold q-my-sm">Bilder</h3>
          </div>
          <div class="card-content">
            <div class="text q-pa-md">
              <q-carousel
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
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <section class="feedback-section">
      <q-btn rounded>
        <q-icon name="mail_outline" /> Feedback zum Stolperstein</q-btn
      >
    </section>
  </article>
</template>

<script setup lang="ts">
import axios from 'axios';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { onMounted, PropType, ref } from 'vue';
import { parse } from 'node-html-parser';
import { useQuasar } from 'quasar';
const props = defineProps({
  stolperstein: {
    type: Object as PropType<StolpersteinFeature | undefined>,
    required: true,
  },
});

const quasar = useQuasar();

onMounted(async () => {
  await loadBiography(props.stolperstein);
});

const inscription = ref<Array<string>>([]);
const imageSlide = ref(1);

const loadBiography = async (stolperstein: StolpersteinFeature | undefined) => {
  if (!stolperstein?.stolperstein.url) return;

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
  margin: 32px 12px;

  @media (min-width: $stolperstein-details-width) {
    margin: 32px;
  }
}

.card-header > * {
  font-size: 2em;
}

.card-content {
  font-size: 1rem;
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

.feedback-section {
  button {
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    background-color: $primary;
    color: white;
    .q-icon {
      margin-right: 10px;
    }
  }
}
</style>
