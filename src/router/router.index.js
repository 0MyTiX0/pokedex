import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Pokemons from "./views/Pokemons.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/pokemon/:id", name: "Pokemons", component: Pokemons },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
