import { usePages } from 'src/use/usePages';
import { RouteRecordRaw } from 'vue-router';

const { pageRecord } = usePages();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: pageRecord.Home.routeName,
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'karte',
        name: pageRecord.Map.routeName,
        component: () => import('pages/MapPage.vue'),
        children: [
          {
            path: ':id',
            name: pageRecord.Map_Details.routeName,
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
            name: pageRecord.Info.routeName,
            component: () => import('src/components/Info/InfoMenu.vue'),
          },
          {
            path: 'ueber-stolpersteine-fuer-dresden',
            name: pageRecord.Info_Verein.routeName,
            component: () =>
              import('components/Info/InfoUeberStolpersteinVerein.vue'),
          },
          {
            path: 'stolpersteine',
            name: pageRecord.Info_Stolpersteine.routeName,
            component: () => import('components/Info/InfoStolpersteine.vue'),
          },
          {
            path: 'recherche',
            name: pageRecord.Info_Research.routeName,

            component: () => import('components/Info/InfoResearch.vue'),
          },
          {
            path: 'glossar',
            name: pageRecord.Info_Glossary.routeName,

            component: () => import('components/Info/InfoGlossary.vue'),
          },
          {
            path: 'hilfe-und-faq',
            name: pageRecord.Info_Help.routeName,
            component: () => import('components/Info/InfoHelp.vue'),
          },
          {
            path: 'kontakt',
            name: pageRecord.Info_Contact.routeName,
            component: () => import('components/Info/InfoContact.vue'),
          },
          {
            path: 'datenschutz',
            name: pageRecord.Info_Privacy.routeName,
            component: () => import('components/Info/InfoPrivacy.vue'),
          },
          {
            path: 'impressum',
            name: pageRecord.Info_Imprint.routeName,
            component: () => import('components/Info/InfoImprint.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
