<template>
  <q-page class="column">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-btn
        v-show="quasar.screen.lt.md && route.name !== routeNames.infoMenu"
        class="back-button"
        size="md"
        round
        text-color="black"
        color="white"
        icon="arrow_back"
        @click="router.push({ name: routeNames.infoMenu })"
      />
    </transition>
    <div
      class="header text-center"
      v-show="quasar.screen.gt.sm || route.name === routeNames.infoMenu"
    >
      <h1>Informationen</h1>
    </div>
    <div class="content-container row">
      <div class="column">
        <div class="menu-list-container col-auto gt-sm">
          <InfoMenuListComponentVue></InfoMenuListComponentVue>
        </div>
      </div>
      <div class="col-12 col-md">
        <q-scroll-area class="fit">
          <div class="content q-mx-md q-mb-xl">
            <router-view v-slot="{ Component }">
              <transition enter-active-class="animated fadeInUp">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </q-scroll-area>
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
.back-button {
  position: fixed;
  top: 2em;
  left: 2em;
  z-index: 11;
}

.header {
  h1 {
    font-size: clamp(3rem, 5vw, 5rem);
  }
}

.content-container {
  flex: 1;

  .content {
    @media (max-width: $breakpoint-sm-max) {
      padding-top: 3rem;
    }
  }
}

.menu-list-container {
  min-width: 350px;
}
</style>
