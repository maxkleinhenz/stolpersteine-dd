<template>
  <footer class="navbar navbar-light fixed-bottom app-bg p-0">
    <div class="container-fluid justify-content-end">
      <ul class="navbar-nav flex-row justify-content-end">
        <li class="nav-item">
          <router-link :to="{ name: 'Impressum' }" class="nav-link"
            >Impressum</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Datenschutz' }" class="nav-link"
            >Datenschutz</router-link
          >
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style lang="scss" scoped>
footer {
  height: $footer-height;

  .nav-link {
    color: black !important;

    &:hover {
      text-decoration: underline;
    }
  }

  a {
    &.router-link-exact-active {
      text-decoration: underline;
    }
  }

  ul {
    column-gap: 3em;
  }
}
</style>
