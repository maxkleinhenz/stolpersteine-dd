<script lang="ts" setup></script>

<template>
  <main>
    <section
      class="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center pb-nav-save"
    >
      <div class="flex flex-1 flex-col justify-center gap-12">
        <div class="space-y-3">
          <h1 class="text-4xl"><span class="font-bold">Stolpersteine</span> Dresden</h1>
          <p class="text-xl font-normal dark:text-gray-400">Es waren unsere Nachbaren</p>
        </div>
        <div class="space-y-5">
          <p>
            Erkunde fast 300 Stolpersteine in Dresden und erfahre welche Lebensgeschichten hinter den Steinen stehen
          </p>
          <AppButton intent="hero" size="hero" shape="pill" to="/karte" class="">
            Zur interaktiven Karte <AppIcon name="ic:baseline-chevron-right" size="small" />
          </AppButton>
        </div>
      </div>
      <div class="p-6">
        <AppButton intent="primary" shape="rounded" size="medium" title="Nach unten scrollen" class="text-black">
          <AppIcon size="medium" name="ic:baseline-arrow-downward" />
        </AppButton>
      </div>
    </section>
  </main>
</template>
