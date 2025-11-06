import { createRouter, createWebHistory } from "vue-router";
import PokedexView from "../views/PokedexView.vue";
import CompareView from "../views/CompareView.vue";
import EvolutionView from "../views/EvolutionView.vue";
import GameView from "../views/GameView.vue";
import QuizView from "../views/QuizView.vue";

const routes = [
  { path: "/", name: "Pokedex", component: PokedexView },
  { path: "/compare", name: "Compare", component: CompareView },
  { path: "/evolution", name: "Evolution", component: EvolutionView },
  { path: "/game", name: "Game", component: GameView },
  { path: "/quiz", name: "Quiz", component: QuizView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
