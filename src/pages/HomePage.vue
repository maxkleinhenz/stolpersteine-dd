<template>
  <q-page class="full-width column items-center">
    <article class="full-width">
      <section
        class="header-section app-bg column justify-center items-center"
        :style="{ 'min-height': landingPageHeightCss }"
      >
        <div class="column justify-center items-center col-grow">
          <h1><strong>Stolpersteine</strong> Dresden</h1>
          <p class="subtitle">Es waren unsere Nachbarn</p>

          <div class="map-container">
            <p>
              Erkunde fast 300 Stolpersteine in Dresden und erfahre welche
              Lebensgeschichten hinter den Steinen stehen
            </p>
            <q-btn
              class="map-btn app-action-button"
              color="white"
              text-color="black"
              rounded
              icon-right="chevron_right"
              label="Zur interaktiven Karte"
              @click="$router.push({ name: pageRecord.Map.routeName })"
            ></q-btn>
          </div>
        </div>

        <div class="q-mt-md q-mb-xl">
          <q-btn
            icon="expand_more"
            size="lg"
            unelevated
            round
            @click="onClickExpand"
          />
        </div>
      </section>

      <section
        ref="timelineSectionRef"
        class="timeline-section column justify-center items-center"
      >
        <h2>Verlegungen</h2>

        <q-timeline
          color="secondary"
          class="stolperstein-timeline q-pa-md"
          :layout="quasar.screen.gt.xs ? 'comfortable' : 'dense'"
        >
          <q-timeline-entry
            title="Ersten fünf Stolpersteine wurden verlegt"
            subtitle="November 2009"
            icon="r_grade"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="19 Stolpersteine wurden verlegt"
            subtitle="Juni 2011"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="12 Stolpersteine wurden verlegt"
            subtitle="Oktober 2012"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="29 Stolpersteine wurden verlegt"
            subtitle="November 2012"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="28 Stolpersteine wurden verlegt"
            subtitle="September 2013"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="18 Stolpersteine wurden verlegt"
            subtitle="Dezember 2013"
            icon="r_grade"
          >
            <div>
              <p>Über 100 Stolpersteine wurden bis jetzt in Dresden verlegt.</p>
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="28 Stolpersteine wurden verlegt"
            subtitle="September 2014"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="zwei Stolpersteine wurden verlegt"
            subtitle="Mai 2015"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="37 Stolpersteine wurden verlegt"
            subtitle="September 2015"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="21 Stolpersteine wurden verlegt"
            subtitle="September 2016"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="25 Stolpersteine wurden verlegt"
            subtitle="März 2018"
            icon="r_grade"
          >
            <p>Über 200 Stolpersteine wurden in Dresden verlegt.</p>
          </q-timeline-entry>

          <q-timeline-entry
            title="30 Stolpersteine wurden verlegt"
            subtitle="Dezember 2019"
          >
          </q-timeline-entry>

          <q-timeline-entry
            title="33 Stolpersteine wurden verlegt"
            subtitle="Juli 2021"
          >
          </q-timeline-entry>
        </q-timeline>
      </section>
    </article>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { scroll } from 'quasar';
import { useLandingPageHeight } from 'src/common/LandingPageUtils';
import { usePages } from 'src/common/PageList';
import { ref } from 'vue';

const quasar = useQuasar();
const { setVerticalScrollPosition } = scroll;
const { landingPageHeightCss } = useLandingPageHeight();
const { pageRecord } = usePages();

const timelineSectionRef = ref<HTMLElement>();

const onClickExpand = () => {
  const duration = 200;

  const offset = timelineSectionRef.value?.offsetTop ?? window.innerHeight;
  setVerticalScrollPosition(window, offset, duration);
};
</script>

<style scoped lang="scss">
section {
  padding: 1rem 2rem 1rem 2rem;

  &:last-child {
    padding-bottom: $app-footer-height;
  }
}

.header-section {
  padding-top: 4rem;
}

h1 {
  font-size: clamp(3em, 7vw, 5em);
  text-align: center;
  line-height: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;

  strong {
    font-weight: 500;
  }
}
.subtitle {
  font-size: clamp(1.5em, 5vw, 2em);
  text-align: center;
  padding: 0 1em;
}

.map-container {
  margin: 4em auto 0 auto;
  max-width: 600px;
  font-size: clamp(1.2em, 4vw, 1.5em);
  text-align: center;
}

.map-btn {
  margin-top: 0.5em;
}

.timeline-section {
  width: 100%;
  background-color: $app-background-color-light;

  h2 {
    font-size: clamp(2em, 5vw, 4em);
    text-align: center;
    margin-bottom: 0em;
  }

  .stolperstein-timeline {
    max-width: 1024px;
  }
}
</style>
