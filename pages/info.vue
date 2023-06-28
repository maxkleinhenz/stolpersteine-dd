<script lang="ts" setup>
useHead({
  title: "Information",
});

const items = [
  { text: "Stolpersteine für Dresden e.\xa0V.", to: "/info" },
  { text: "Die Stolpersteine", to: "/info" },
  { text: "Recherche", to: "/info" },
  { text: "Glossar", to: "/info" },
  { text: "Hilfe und FAQ", to: "/info" },
  { text: "Kontakt", to: "/info" },
  { text: "Datenschutz", to: "/info" },
  { text: "Impressum", to: "/info" },
];
</script>

<template>
  <main>
    <section class="flex min-h-screen flex-col items-center justify-center gap-12 p-3 text-center pb-nav-save">
      <h1 class="text-5xl">Information</h1>
      <ul class="flex flex-col">
        <li v-for="item in items" :key="item.to">
          <AppButton intent="link" size="large" :to="item.to">{{ item.text }}</AppButton>
        </li>
      </ul>
    </section>
  </main>
</template>
