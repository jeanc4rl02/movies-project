import { createRouter, createWebHistory } from "vue-router"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // basicas
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../App.vue"),
    },
    // ruta admin
    {
      path: "/admin",
      name: "admin", 
      component: () => import("../modules/main/layouts/AdminLayout.vue"),
      children: [
        /*
        {
          path: "",
          name: "admin-rooms",
          component: () => import("@/modules/users/views/UsersView.vue"),
        },
         */
      ],
    },

    // error - 404
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
      // component: () => import("@/modules/shared/pages/404.vue"),
    },
  ],
});

export default router;
