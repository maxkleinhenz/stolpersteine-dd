<script setup lang="ts">
import { StolpersteinFeature } from "~~/models/stolperstein.model";
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const { stolperstein } = defineProps<{ stolperstein?: StolpersteinFeature }>();

const store = useStolpersteinStore();

if (!stolperstein) navigateTo("/karte");

const sourceExpanded = ref(false);

const otherStolpersteine = computed(() => {
  if (stolperstein) {
    var stolpersteineAtCoords = findStolpersteineAtCoords(stolperstein?.geometry.coordinates, store.stolpersteine);
    var other = stolpersteineAtCoords.filter((e) => e.stolperstein.id !== stolperstein.stolperstein.id);
    return other?.length >= 1 ? other : null;
  }

  return null;
});

const container = ref<HTMLElement | null>();
const { y: scrollingY } = useScroll(container);
function scrollToTop() {
  container.value?.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div v-if="stolperstein" class="h-screen overflow-y-scroll bg-base-1" ref="container">
    <section>
      <img :src="stolperstein.stolperstein.stolpersteinImage" class="object-cover" />
    </section>

    <StolpersteinDetailsSection color="light" class="flex flex-col gap-8 sm:flex-row">
      <div class="flex-1">
        <h2 class="pb-4 text-3xl font-semibold">{{ stolperstein.stolperstein.name }}</h2>
        <p>{{ stolperstein.stolperstein.strasseHausnummer }}</p>
        <p>{{ stolperstein.stolperstein.plzOrt }}</p>
      </div>
      <div class="w-28 self-center">
        <img
          src="/stolpersteine/images/portrait-placeholder.png"
          class="aspect-square rounded-full object-cover object-center"
        />
      </div>
    </StolpersteinDetailsSection>

    <StolpersteinDetailsSection color="light" class="flex flex-wrap justify-center gap-4 sm:justify-start">
      <AppButton intent="primary" shape="pill" size="small" class="flex-1 border-0 sm:border" title="Verlegeort"
        ><AppIcon name="ic:baseline-zoom-in-map" size="small" />
        <span class="block sm:inline"> Verlegeort</span>
      </AppButton>
      <AppButton intent="primary" shape="pill" size="small" class="flex-1 border-0 sm:border" title="Navigation"
        ><AppIcon name="ic:baseline-directions" size="small" />
        <span class="block sm:inline"> Navigation</span>
      </AppButton>
      <AppButton intent="primary" shape="pill" size="small" class="flex-1 border-0 sm:border" title="Teilen"
        ><AppIcon name="ic:baseline-share" size="small" />
        <span class="block sm:inline"> Teilen</span>
      </AppButton>
      <AppButton intent="primary" shape="pill" size="small" class="flex-1 border-0 sm:border" title="Merken"
        ><AppIcon name="ic:baseline-bookmark-add" size="small" />
        <span class="block sm:inline"> Merken</span>
      </AppButton>
    </StolpersteinDetailsSection>

    <StolpersteinDetailsSection color="medium"
      ><div class="min-h-fit rounded-2xl bg-[url('/images/candle.jpg')] bg-cover text-center text-white">
        <div class="rounded-2xl bg-gradient-to-t from-black from-15%">
          <h3 class="py-6 text-2xl font-semibold">Anteil nehmen</h3>
          <p class="flex-1 px-3 pb-4 pt-14">
            Zünde eine virtuelle Kerze an, um Anteil zu nehmen. 12 Personen haben an diesem Ort eine Kerze angezündet.
          </p>
          <div class="px-3 py-6">
            <AppButton
              intent="white"
              shape="pill"
              size="medium"
              class="min-w-min border-0 text-black sm:w-3/5 sm:border"
              title="Merken"
              >Virtuelle Kerze anzünden
            </AppButton>
          </div>
        </div>
      </div></StolpersteinDetailsSection
    >

    <StolpersteinDetailsSection header="Inschrift" color="light" class="text-center">
      <p class="text-lg">
        HIER WOHNTE<br />
        JOSEF ALTBACH<br />
        JG. 1886<br />
        POLENAKTION 1938<br />
        ERMORDET IM<br />
        BESETZTEN POLEN<br />
      </p>
    </StolpersteinDetailsSection>

    <StolpersteinDetailsSection header="Biografie" color="white">
      <p class="pb-4">Josef Altbach wurde am 28. Oktober 1886 in Wyszków geboren.</p>
      <p class="pb-4">
        Seine zweite Frau Sarah wurde am 5. Juli 1882 geboren. Die Ehe, die nach jüdischem Ritus geschlossen wurde,
        wurde in Deutschland nicht anerkannt. Josef Altbach lebte seit 1926 in Deutschland und war Inhaber eines
        Zigarren- und Tabakgeschäfts. Im Zuge der sogenannten Polen-Aktion wurde die Familie am 28. Oktober 1938 nach
        Polen zwangsausgewiesen. Die Familie ging vermutlich über das oberschlesische Beuthen (Bytom) nach Lemberg
        (Lviv) zu Verwandten. Die genauen Todesumstände der beiden sind unbekannt.
      </p>
      <p class="pb-4">Die Enkelinnen von Sarah und Josef Altbach spendeten die Stolpersteine 2012.</p>
      <div class="pt-4">
        <AppAccordion v-model:expanded="sourceExpanded">
          <template v-slot:header>
            <div class="flex gap-2">
              <AppIcon name="ic:baseline-link" size="small" />
              <h4 class="inline-block flex-1 text-left">Quellenangabe</h4>
              <AppIcon
                name="ic:baseline-expand-more"
                size="small"
                class="transition-transform duration-300"
                :class="{ '-rotate-180': sourceExpanded }"
              />
            </div>
          </template>
          <template v-slot:content>
            <ul class="p-4">
              <li class="pb-6">Angaben der Familie</li>
              <li>
                Arbeitskreis Gedenkbuch der Gesellschaft für Christlich-Jüdische Zusammenarbeit Dresden e.V. (2006):
                <span class="italic">Buch der Erinnerung. Juden in Dresden: Deportiert, ermordet, verschollen.</span>
                1933-1945. Thelem Universitätsverlag Dresden, S. 26.
              </li>
            </ul>
          </template>
        </AppAccordion>
      </div>
    </StolpersteinDetailsSection>

    <StolpersteinDetailsSection header="Gallerie" color="medium" class="!px-0">
      <StolpersteinGallery :stolperstein="stolperstein"></StolpersteinGallery>
    </StolpersteinDetailsSection>

    <StolpersteinDetailsSection header="Stolpersteine am gleichen Ort" color="medium" v-if="otherStolpersteine">
      <div class="mx-auto flex max-w-md flex-col gap-4">
        <StolpersteinListItem
          v-for="other in otherStolpersteine"
          :stolperstein="other"
          :replace="true"
        ></StolpersteinListItem>
      </div>
    </StolpersteinDetailsSection>

    <StolpersteinDetailsSection color="medium" class="mb-24">
      <div class="mx-auto max-w-sm">
        <AppButton
          shape="pill"
          size="small"
          intent="primary"
          class="flex w-full items-center justify-center gap-2 bg-accent-2 text-white"
          ><AppIcon name="ic:outline-mail" size="xs" /> Feedback zum Stolperstein</AppButton
        >
      </div>
    </StolpersteinDetailsSection>

    <div class="absolute inset-x-0 bottom-0 z-10 mx-auto w-20 overflow-hidden pb-8">
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="duration-200 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="transform translate-y-full"
      >
        <div class="flex justify-center" v-if="scrollingY >= 200">
          <AppButton intent="white" shape="rounded" size="medium" class="shadow-md" @click="scrollToTop"
            ><AppIcon name="ic:baseline-expand-less" size="medium"
          /></AppButton>
        </div>
      </Transition>
    </div>
  </div>
</template>
