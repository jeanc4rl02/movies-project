import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createMemoryHistory(),
  routes: [
    {
        path: "/",
        name: "welcome",
        component: () => import("../App.vue"),
      },
  ],
});

export default router;