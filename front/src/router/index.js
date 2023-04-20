import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../modules/landingpage /views/HomeView.vue"),
    },
    {
      path: "/payments",
      name: "payments",
      component: () => import("../modules/payment/views/PaymentView.vue"),
    },
    {
      path: "/cinema",
      name: "cinema",
      component: () => import("../modules/cinema/views/CinemaView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../modules/admin/views/AdminView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

export default router;
