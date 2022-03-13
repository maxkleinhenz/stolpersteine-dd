<template>
  <q-page class="page column">
    <div
      class="header text-center"
      v-show="quasar.screen.gt.sm || route.name === routeNames.infoMenu"
    >
      <h1>Informationen</h1>
    </div>
    <div class="content-container row">
      <div class="column">
        <div class="menu-list-container col-auto full-height gt-sm">
          <InfoMenuListComponentVue></InfoMenuListComponentVue>
        </div>
      </div>
      <div class="col-12 col-md">
        <div class="fit">
          <transition name="fadeIn">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </transition>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import InfoMenuListComponentVue from 'src/components/InfoMenuList.vue';
import { useRoute, useRouter } from 'vue-router';
import { routeNames } from 'src/router/routes';
import { useQuasar } from 'quasar';
import { onActivated, onDeactivated, ref, watch } from 'vue';

const quasar = useQuasar();
const router = useRouter();
const route = useRoute();

const isActive = ref(false);

onActivated(async () => {
  isActive.value = true;
  if (route.name === routeNames.info) {
    if (quasar.screen.gt.sm) await router.push({ name: routeNames.infoVerein });
    else await router.push({ name: routeNames.infoMenu });
  }
});

onDeactivated(() => {
  isActive.value = false;
});

watch(
  () => quasar.screen.gt.sm,
  async (value) => {
    if (!isActive.value) return;

    if (value && isInfoOrInfoMenuRoute()) {
      await router.push({ name: routeNames.infoVerein });
    } else if (!value && isInfoRoute()) {
      await router.push({ name: routeNames.infoMenu });
    }
  }
);

const isInfoRoute = () => {
  return route.name === routeNames.info;
};

const isInfoOrInfoMenuRoute = () => {
  return [routeNames.info, routeNames.infoMenu].includes(
    route.name?.toString() ?? ''
  );
};
</script>

<style scoped lang="scss">
.page {
  overflow: hidden;
}

.header {
  h1 {
    font-size: clamp(3rem, 5vw, 5rem);
  }
}

.content-container {
  flex: 1;
}

.menu-list-container {
  min-width: 350px;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
  transform: translateY(150px);
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
