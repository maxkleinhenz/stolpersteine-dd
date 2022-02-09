<template>
  <nav
    class="navbar navbar-light app-shadow"
    :class="[{ desktop: isDesktop }, { mobile: !isDesktop }]"
  >
    <ul class="navbar-nav flex-row">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <font-awesome-icon
            class="glyphicon"
            :icon="['fas', 'home']"
            v-if="!isDesktop"
          />
          <span>Start</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Map' }" class="nav-link">
          <font-awesome-icon
            class="glyphicon"
            :icon="['fas', 'map']"
            v-if="!isDesktop"
          />
          <span>Karte</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Info' }" class="nav-link">
          <font-awesome-icon
            class="glyphicon"
            :icon="['fas', 'info']"
            v-if="!isDesktop"
          />
          <span>Infos</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavComponent",
  props: {
    isDesktop: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 9999;
}

.desktop {
  position: fixed;
  top: 0;
  right: 0;
  border-radius: 2em;
  margin: 2em;
  background-color: $app-light-color;

  ul {
    padding: 0.25em 3em;
    column-gap: 3em;

    .nav-link {
      color: $app-dark-color;

      &:hover,
      &:focus {
        text-decoration: underline;
        color: $app-dark-color;
      }
    }

    a {
      &.router-link-exact-active {
        text-decoration: underline;
      }
    }
  }
}

.mobile {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0;
  justify-content: center;
  font-size: 0.9em;
  height: $footer-height;
  background-color: $app-background-color;
  border-top: 1px solid $app-primary-color;

  ul {
    width: 100%;
    justify-content: space-evenly;
    column-gap: 1em;

    .nav-link {
      color: $app-dark-color;

      &:hover,
      &:focus {
        color: $app-dark-color;
        background-color: $stolperstein-color-light;
      }
    }

    a {
      text-align: center;
      padding: 0.5em;
      border-radius: $stolperstein-border-radius;
      width: $footer-height;

      &.router-link-exact-active,
      &.router-link-exact-active:hover,
      &.router-link-exact-active:focus {
        background-color: $stolperstein-color;
      }

      .glyphicon {
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
