import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/karte",
    name: "Map",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/MapView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/info",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "info" */ "../views/InfoView.vue"),
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: () =>
      import(/* webpackChunkName: "impressum" */ "../views/ImpressumView.vue"),
  },
  {
    path: "/datenschutz",
    name: "Datenschutz",
    component: () =>
      import(
        /* webpackChunkName: "datenschutz" */ "../views/DatenschutzView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
