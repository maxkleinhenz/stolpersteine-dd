<template>
  <article>
    <section>
      <div class="header text-center">
        <h1>{{ pageRecord.Info.title }}</h1>
      </div>

      <nav role="navigation" aria-label="Info-Menü">
        <router-link
          v-for="entry in infoMenuRecord"
          :key="entry.routeName"
          class="info-link text-center q-px-md q-py-md q-my-md"
          :to="{
            name: entry.routeName,
          }"
          >{{ entry.title }}</router-link
        >
      </nav>
    </section>
  </article>
</template>

<script setup lang="ts">
import { usePages } from 'src/use/usePages';

const { pageRecord, infoMenuRecord } = usePages();
</script>

<style scoped lang="scss">
.header {
  h1 {
    font-size: clamp(3rem, 5vw, 4rem);
  }
}

.info-link {
  display: block;
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  text-align: center;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
}
</style>
