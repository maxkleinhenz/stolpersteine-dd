<template>
  <q-page
    class="info-page column"
    :class="[
      { 'footer-space': $q.screen.lt.sm },
      { 'mobile-menu': isMenuMobile },
    ]"
  >
    <div class="column items-center app-bg">
      <div class="content-container">
        <Transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <div
            class="back-button-container"
            v-show="$route.name !== pageRecord.Info.routeName"
          >
            <q-btn
              :size="$q.screen.gt.xs ? 'lg' : 'md'"
              round
              text-color="black"
              color="white"
              icon="arrow_back"
              @click="
                $router.push({
                  name: pageRecord.Info.routeName,
                })
              "
            />
          </div>
        </Transition>

        <RouterViewTransistion
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        ></RouterViewTransistion>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { usePages } from 'src/use/usePages';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import RouterViewTransistion from 'src/components/Common/RouterViewTransistion.vue';

const quasar = useQuasar();
const route = useRoute();
const { pageRecord } = usePages();

const isMenuMobile = computed(() => {
  return quasar.screen.lt.sm && pageRecord.Info.routeName === route.name;
});
</script>

<style scoped lang="scss">
.content-container {
  width: min(100%, #{$breakpoint-lg-min});
  min-height: 100vh;
  background-color: var(--app-bg-light);
}

.back-button-container {
  position: fixed;
  z-index: 11;
  padding-left: 2rem;
  padding-top: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-from {
  opacity: 1;
}
</style>
