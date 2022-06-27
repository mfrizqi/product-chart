import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/pages/Home.vue";
import Calculator from "../components/pages/Calculator.vue";
import ReksadanaCampuran from "../components/pages/reksadana-campuran/reksadanaCampuran"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calculator",
    name: "calculator",
    component: Calculator,
  },
  {
    path: "/reksadana-campuran",
    name: "reksadanaCampuran",
    component: ReksadanaCampuran
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
