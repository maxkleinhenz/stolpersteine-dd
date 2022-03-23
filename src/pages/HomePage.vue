<template>
  <q-page class="full-width column items-center">
    <article class="full-width">
      <section
        class="header-container column justify-center items-center q-px-lg q-py-lg"
      >
        <h1><strong>Stolpersteine</strong> Dresden</h1>
        <p class="subtitle">Es waren unsere Nachbarn</p>

        <div class="map-container column items-center">
          <p>
            Erkunde fast 300 Stolpersteine in Dresden und erfahre welche
            Lebensgeschichten hinter den Steinen stehen
          </p>
          <q-btn
            class="map-btn q-py-md q-px-lg"
            color="white"
            text-color="black"
            rounded
            icon-right="chevron_right"
            label="Zur interaktiven Karte"
            @click="$router.push({ name: routeNames.map })"
          ></q-btn>
        </div>
      </section>

      <div class="column items-center">
        <q-icon name="expand_more" size="lg"></q-icon>
      </div>

      <section
        class="timeline-container column justify-center items-center q-px-xl q-py-lg"
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
              <p>
                Zwei Stolpersteine erinnern an den Textilkaufmann Joseph Fränkel
                - jeweils einer an seinem Wohnwort und Arbeitsplatz.
              </p>
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
import { useMeta, useQuasar } from 'quasar';
import { routeNames } from 'src/router/routes';

const quasar = useQuasar();
useMeta({
  title: 'Startseite',
});
</script>

<style scoped lang="scss">
section {
  min-height: calc(100vh - 15em);
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
  margin: 4em 0 0 0;
  max-width: 600px;
  font-size: clamp(1.2em, 4vw, 1.5em);
  text-align: center;
}

.map-btn {
  margin-top: 0.5em;
}

.timeline-container {
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
