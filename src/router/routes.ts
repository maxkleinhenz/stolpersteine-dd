import { RouteRecordRaw } from 'vue-router';

export const routeNames = {
  home: 'Home',
  map: 'Map',
  mapDetails: 'Map.Details',
  // info: 'Info',
  infoMenu: 'Info',
  infoVerein: 'Info.Verein',
  infoStolpersteine: 'Info.Stolpersteine',
  infoResearch: 'Info.Research',
  infoGlossary: 'Info.Glossary',
  infoHelp: 'Info.Help',
  infoContact: 'Info.Contact',
  infoPrivacy: 'Info.Privacy',
  infoImprint: 'Info.Imprint',
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.home,
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'karte',
        name: routeNames.map,
        component: () => import('pages/MapPage.vue'),
        children: [
          {
            path: ':id',
            name: routeNames.mapDetails,
            component: () => import('pages/MapPage.vue'),
          },
        ],
      },
      {
        path: 'info',
        component: () => import('src/pages/InfoPage.vue'),
        children: [
          {
            path: '',
            name: routeNames.infoMenu,
            component: () => import('src/components/InfoMenu.vue'),
          },
          {
            path: 'ueber-stolpersteine-fuer-dresden',
            name: routeNames.infoVerein,
            component: () =>
              import('components/InfoUeberStolpersteinVerein.vue'),
          },
          {
            path: 'stolpersteine',
            name: routeNames.infoStolpersteine,
            component: () => import('components/InfoStolpersteine.vue'),
          },
          {
            path: 'recherche',
            name: routeNames.infoResearch,
            component: () => import('components/InfoResearch.vue'),
          },
          {
            path: 'glossar',
            name: routeNames.infoGlossary,
            component: () => import('components/InfoGlossary.vue'),
          },
          {
            path: 'hilfe-und-faq',
            name: routeNames.infoHelp,
            component: () => import('components/InfoHelp.vue'),
          },
          {
            path: 'kontakt',
            name: routeNames.infoContact,
            component: () => import('components/InfoContact.vue'),
          },
          {
            path: 'datenschutz',
            name: routeNames.infoPrivacy,
            component: () => import('components/InfoPrivacy.vue'),
          },
          {
            path: 'impressum',
            name: routeNames.infoImprint,
            component: () => import('components/InfoImprint.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
