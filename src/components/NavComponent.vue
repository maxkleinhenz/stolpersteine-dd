<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Stolpersteine Dresden</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Start</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/map" class="nav-link active">Karte</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link active">Über</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavComponent",
});
</script>

<style lang="scss" scoped>
nav {
  a {
    &.router-link-exact-active {
      text-decoration: underline;
    }
  }
}
</style>
