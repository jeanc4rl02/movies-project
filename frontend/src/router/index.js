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
        
        {
            path: "",
            name: "admin-cinemas",
            component: () => import("../modules/cinemas/views/CinemaView.vue"),
          },
        {
          path: "salas",
          name: "admin-salas",
          component: () => import("../modules/rooms/views/RoomView.vue"),
        },
        {
          path: "peliculas",
          name: "admin-peliculas",
          component: () => import("../modules/movies/views/MoviesView.vue"),
        },
        {
          path: "Show",
          name: "admin-show",
          component: () => import("../modules/shows/views/ShowView.vue"),
        },
         
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
