import { RouteRecordRaw } from 'vue-router';

export const routeNames = {
  home: 'Home',
  map: 'Map',
  mapDetails: 'Map.Details',
  info: 'Info',
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/HomePage.vue') },
      {
        path: 'karte',
        name: 'Map',
        component: () => import('pages/MapPage.vue'),
        children: [
          {
            path: ':id',
            name: 'Map.Details',
            component: () => import('pages/MapPage.vue'),
          },
        ],
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('pages/InfoPage.vue'),
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
