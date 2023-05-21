<script setup lang="ts">
import { useStolpersteinStore } from "~~/stores/stolperstein-store";

const props = defineProps<{ stolpersteinId?: number }>();

const store = useStolpersteinStore();
const stolperstein = findStolpersteinById(props.stolpersteinId, store.stolpersteine);

if (!stolperstein) navigateTo("/karte");
</script>

<template>
  <div v-if="stolperstein" class="min-h-screen bg-base-1">
    <section>
      <img :src="stolperstein.stolperstein.stolpersteinImage" class="object-cover" />
    </section>

    <section class="flex flex-col gap-8 bg-base-2 p-6 sm:flex-row">
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
    </section>

    <section class="flex flex-wrap justify-center gap-4 bg-base-2 p-6 sm:justify-start">
      <AppButton intent="primary" shape="pill" size="small" class="border-0 sm:border" title="Verlegeort"
        ><AppIcon name="ic:baseline-zoom-in-map" size="small" />
        <span class="block sm:inline"> Verlegeort</span>
        <!-- Verlegeort -->
      </AppButton>
      <AppButton intent="primary" shape="pill" size="small" class="border-0 sm:border" title="Navigation"
        ><AppIcon name="ic:baseline-directions" size="small" />
        <span class="block sm:inline"> Navigation</span>
        <!-- Navigation -->
      </AppButton>
      <AppButton intent="primary" shape="pill" size="small" class="border-0 sm:border" title="Teilen"
        ><AppIcon name="ic:baseline-share" size="small" />
        <span class="block sm:inline"> Teilen</span>
        <!-- Teilen -->
      </AppButton>
      <AppButton intent="primary" shape="pill" size="small" class="border-0 sm:border" title="Merken"
        ><AppIcon name="ic:baseline-bookmark-add" size="small" />
        <span class="block sm:inline"> Merken</span>
        <!-- Merken -->
      </AppButton>
    </section>
  </div>
</template>
