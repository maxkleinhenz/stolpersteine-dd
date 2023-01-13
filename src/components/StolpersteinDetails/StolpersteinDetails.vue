<template>
  <article class="app-bg" :class="{ 'footer-space': $q.screen.lt.sm }">
    <section
      class="header-section light q-gutter-y-lg"
      aria-labelledby="header-section-title"
    >
      <div>
        <q-img class="stolperstein-image" :src="stolpersteinImage" fit="cover">
          <template #loading>
            <q-skeleton square width="100%" height="100%" />
          </template>
          <template #error>
            <div class="absolute-full flex flex-center bg-grey-4 text-black">
              Bild nicht gefunden
            </div>
          </template>
        </q-img>
      </div>
      <div class="card-content">
        <div class="row q-gutter-y-md q-gutter-x-md">
          <div class="col-12 col-sm">
            <div class="card-header full">
              <h3
                id="header-section-title"
                class="title text-weight-bold q-my-sm"
              >
                {{ props.stolperstein.stolperstein.name }}
              </h3>
            </div>
            <div>
              <span
                v-if="props.stolperstein.stolperstein.strasse"
                class="address"
              >
                {{ props.stolperstein.stolperstein.strasse }}
                {{ props.stolperstein.stolperstein.hausnummer }}
              </span>
              <span class="address">
                {{ props.stolperstein.stolperstein.plz }}
                {{ props.stolperstein.stolperstein.ort }}
              </span>
            </div>
          </div>
          <div class="col-12 col-sm-auto text-center">
            <q-avatar size="128px">
              <q-img ratio="1" src="images/portrait-placeholder.png">
                <template #loading>
                  <q-skeleton type="QAvatar" width="100%" height="100%" />
                </template>
              </q-img>
            </q-avatar>
          </div>
        </div>
      </div>
      <div
        class="card-content row col-12 col-sm items-start q-mt-xl"
        :class="{
          'q-gutter-x-sm': !isDenseMode,
          full: quasar.screen.lt.sm,
        }"
      >
        <StolpersteinDetailsActionButton
          label="Verlegeort"
          icon="zoom_in_map"
          :dense-mode="isDenseMode"
          :click-action="() => (showNotSupportedDialog = true)"
        ></StolpersteinDetailsActionButton>
        <StolpersteinDetailsActionButton
          label="Navigation"
          icon="directions"
          :dense-mode="isDenseMode"
          :click-action="() => (showNotSupportedDialog = true)"
        ></StolpersteinDetailsActionButton>
        <StolpersteinDetailsActionButton
          label="Teilen"
          icon="share"
          :dense-mode="isDenseMode"
          :click-action="share"
        ></StolpersteinDetailsActionButton>
        <StolpersteinDetailsActionButton
          label="Merken"
          icon="bookmark_border"
          :dense-mode="isDenseMode"
          :click-action="() => (showNotSupportedDialog = true)"
        ></StolpersteinDetailsActionButton>
      </div>
    </section>

    <section class="candel-section" aria-labelledby="candel-section-title">
      <q-card class="app-card">
        <q-card-section class="card-header">
          <h3
            id="candel-section-title"
            class="title text-center text-weight-bold q-my-sm"
          >
            Anteil nehmen
          </h3>
        </q-card-section>
        <q-card-section class="card-content">
          <p>
            Zünde eine virtuelle Kerze an, um Anteil zu nehmen. 12 Personen
            haben an diesem Ort eine Kerze angezündet.
          </p>
        </q-card-section>
        <q-card-actions align="center" class="card-content q-pb-lg">
          <q-btn
            class="app-action-button"
            rounded
            outline
            label="virtuelle Kerze anzünden"
            @click="showNotSupportedDialog = true"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </section>

    <section
      class="inscription-section light"
      aria-labelledby="inscription-section-title"
    >
      <div class="card-header">
        <h3
          id="inscription-section-title"
          class="title text-center text-weight-bold q-my-sm"
        >
          Inschrift
        </h3>
      </div>
      <div class="card-content">
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
      </div>
    </section>

    <section
      class="biography-section relative-position"
      aria-labelledby="biography-section-title"
    >
      <div
        class="text-subtitle1 absolute-top custom-caption text-center q-mt-sm"
      >
        <div class="text-subtitle1">Vorschau für Vorabversion</div>
      </div>
      <div class="card-header">
        <h3
          id="biography-section-title"
          class="title text-center text-weight-bold q-my-sm"
        >
          Biografie
        </h3>
      </div>
      <div class="card-content">
        <p>Josef Altbach wurde am 28. Oktober 1886 in Wyszków geboren.</p>
        <p>
          Seine zweite Frau Sarah wurde am 5. Juli 1882 geboren. Die Ehe, die
          nach jüdischem Ritus geschlossen wurde, wurde in Deutschland nicht
          anerkannt. Josef Altbach lebte seit 1926 in Deutschland und war
          Inhaber eines Zigarren- und Tabakgeschäfts. Im Zuge der sogenannten
          Polen-Aktion wurde die Familie am 28. Oktober 1938 nach Polen
          zwangsausgewiesen. Die Familie ging vermutlich über das
          oberschlesische Beuthen (Bytom) nach Lemberg (Lviv) zu Verwandten. Die
          genauen Todesumstände der beiden sind unbekannt.
        </p>
        <p>
          Die Enkelinnen von Sarah und Josef Altbach spendeten die Stolpersteine
          2012.
        </p>

        <div class="references">
          <q-expansion-item
            v-model="referencesExpanded"
            expand-separator
            icon="link"
            label="Quellenangaben"
            class="app-references-expansion overflow-hidden"
            :class="{ 'shadow-1': referencesExpanded }"
            :header-class="referencesExpanded ? 'bg-grey-3' : undefined"
            style="border-radius: 30px"
          >
            <q-card>
              <q-card-section>
                <ul>
                  <li>Angaben der Familie</li>
                  <li>
                    Arbeitskreis Gedenkbuch der Gesellschaft für
                    Christlich-Jüdische Zusammenarbeit Dresden e.V. (2006):
                    <span class="text-italic"
                      >Buch der Erinnerung. Juden in Dresden: Deportiert,
                      ermordet, verschollen.</span
                    >
                    1933-1945. Thelem Universitätsverlag Dresden, S. 26.
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </section>

    <section class="image-section" aria-labelledby="image-section-title">
      <div>
        <div class="card-header">
          <h3
            id="image-section-title"
            class="title text-center text-weight-bold q-my-sm"
          >
            Bildergalerie
          </h3>
        </div>
        <div class="card-content full">
          <q-carousel
            v-model="imageSlide"
            class="image-carousel"
            swipeable
            animated
            thumbnails
            infinite
            arrows
            control-type="unelevated"
            control-color="primary"
            transition-next="slide-left"
            transition-prev="slide-right"
          >
            <q-carousel-slide :name="1" :img-src="stolpersteinImage">
              <div class="absolute-top text-subtitle1 custom-caption">
                <div class="text-subtitle1">Vorschau für Vorabversion</div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide
              :name="2"
              img-src="images/portrait-placeholder.png"
            >
              <div class="absolute-top text-subtitle1 custom-caption">
                <div class="text-subtitle1">Vorschau für Vorabversion</div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </section>

    <section
      v-if="otherStolpersteine?.length"
      class="other-section"
      aria-labelledby="other-section-title"
    >
      <div>
        <div class="card-header">
          <h3
            id="other-section-title"
            class="title text-center text-weight-bold q-my-sm"
          >
            Stolpersteine am gleichen Ort
          </h3>
        </div>
        <div class="card-content q-pt-xs q-gutter-y-md">
          <StolpersteinListItem
            v-for="other in otherStolpersteine"
            :key="other.stolperstein.id"
            :stolperstein-feature="other"
            :replace="true"
          ></StolpersteinListItem>
        </div>
      </div>
    </section>

    <section class="feedback-section">
      <q-btn class="app-action-button" rounded @click="sendFeedbackEmail()">
        <q-icon name="mail_outline" /> Feedback zum Stolperstein</q-btn
      >
    </section>
  </article>

  <q-dialog v-model="showNotSupportedDialog" class="z-top">
    <q-card>
      <q-card-section>
        <div class="text-h6">Noch nicht unterstützt</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Diese Aktion ist in der Vorabversion noch nicht unterstützt
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="OK" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import axios from 'axios';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { PropType, ref, watch, onMounted, computed } from 'vue';
import { parse } from 'node-html-parser';
import { useQuasar } from 'quasar';
import { useStolpersteinUtils } from 'src/use/useStolpersteinUtils';
import StolpersteinListItem from 'src/components/StolpersteinList/StolpersteinListItem.vue';
import StolpersteinDetailsActionButton from './StolpersteinDetailsActionButton.vue';
import { useStolpersteinStore } from 'src/store/stolperstein-store';
const props = defineProps({
  stolperstein: {
    type: Object as PropType<StolpersteinFeature>,
    required: true,
  },
});

const quasar = useQuasar();
const store = useStolpersteinStore();
const { findStolpersteineAtCoords } = useStolpersteinUtils();

const stolpersteinImage = ref<string>('');
const otherStolpersteine = ref<StolpersteinFeature[]>();

const showNotSupportedDialog = ref<boolean>(false);
const isDenseMode = computed(() => quasar.screen.lt.sm);

const referencesExpanded = ref(false);

onMounted(() => {
  initDetails(props.stolperstein);
});

watch(
  () => props.stolperstein,
  (value) => {
    initDetails(value);
  }
);

const initDetails = (stolperstein: StolpersteinFeature) => {
  void loadBiography(stolperstein);

  stolpersteinImage.value = stolperstein.stolperstein.stolpersteinImage;

  const stolpersteineAtcCoords = findStolpersteineAtCoords(
    stolperstein.geometry.coordinates,
    store.stolpersteine
  );

  // mark selected stolpersteine on map
  store.selectedStolpersteine = stolpersteineAtcCoords;

  otherStolpersteine.value = stolpersteineAtcCoords.filter(
    (e) => e.stolperstein.id !== stolperstein.stolperstein.id
  );
};

const share = () => {
  if (!props.stolperstein) return;

  if (!!navigator.share) {
    void navigator.share({
      title: `${props.stolperstein.stolperstein.name} - Stolpersteine Dresden`,
      text: `Erkunde den Stolperstein von ${props.stolperstein.stolperstein.name}`,
      url: window.location.href,
    });
  } else {
    showNotSupportedDialog.value = true;
  }
};

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

const sendFeedbackEmail = () => {
  const email = 'max.github@outlook.de';
  const subject = `Feedback zum Stolperstein von ${props.stolperstein.stolperstein.name}`;
  document.location = 'mailto:' + email + '?subject=' + subject;
};
</script>

<style lang="scss" scoped>
$padding-inline: 1rem;
$padding-inline-large: 4rem;

section {
  padding-top: 4rem;
  padding-bottom: 4rem;
  &.light {
    background-color: $app-background-color-light;
    padding-bottom: 4rem;
  }
}

.card-header {
  margin-bottom: 1rem;
  padding-inline: $padding-inline;

  &.full {
    padding-inline: 0 !important;
  }

  @media (min-width: $stolperstein-details-width) {
    padding-inline: $padding-inline-large;
  }

  .title {
    font-size: 2rem;
  }
}

.card-content {
  font-size: 1rem;
  padding-inline: $padding-inline;

  &.full {
    padding-inline: 0;
    padding-bottom: 0;
  }

  @media (min-width: $stolperstein-details-width) {
    padding-inline: $padding-inline-large;
  }
}

.address {
  display: block;
}

.header-section {
  padding-top: 0 !important;

  .stolperstein-image {
    max-height: 570px;
  }
}

.candel-section {
  padding-inline: 24px;

  color: white;
  .app-card {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
      url('/images/candle.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.inscription {
  font-size: 1.2rem;
}

.biography-section {
  background-color: white;

  .references {
    margin-top: 3.5rem;

    .app-references-expansion {
      transition: box-shadow 350ms ease-in-out;
    }

    ul {
      list-style-type: none;
      margin-left: 0rem;
      padding: 0;

      li {
        padding-bottom: 1.5rem;
      }
    }
  }
}

.image-section {
  padding-bottom: 0;
}

.other-section {
  padding-bottom: 0;
}

.feedback-section {
  padding-bottom: 8rem;
  display: flex;
  justify-content: center;

  button {
    box-sizing: border-box;
    background-color: $primary;
    color: white;
    .q-icon {
      margin-right: 10px;
    }
  }
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
