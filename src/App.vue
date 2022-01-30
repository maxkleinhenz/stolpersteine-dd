<template>
  <NavComponent />
  <main class="container-fliud">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavComponent from "@/components/NavComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "App",
  components: {
    NavComponent,
  },
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  color: $primary;
}

main {
  padding-top: $navbar-height;
  overflow: hidden;
  height: -webkit-fill-available;
  // height: calc(100vh -$navbar-height);
  // min-height: calc(100vh - $navbar-height);
  // max-height: calc(100vh - $navbar-height);
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
}
</style>
