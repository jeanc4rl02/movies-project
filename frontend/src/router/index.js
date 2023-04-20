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
    {
      path: "/user/payment",
      name: "user-payment",
      component: () => import("../modules/payments/views/PaymentView.vue"),
      redirect: "/user/payment/step1",
      children: [
        {
          path: "step1",
          name: "step-1",
          component: () => import("../modules/payments/components/Step1.vue"),
          // component: Step1,
        },
        {
          path: "step2",
          name: "step-2",
          component: () => import("../modules/payments/components/Step2.vue"),
        },
        {
          path: "step3",
          name: "step-3",
          component: () => import("../modules/payments/components/Step3.vue"),
        },
        {
          path: "step4",
          name: "step-4",
          component: () => import("../modules/payments/components/Step4.vue"),
        },
      ],

    },
    // {
    //   path: "/payment",
    //   name: "payment-steps",
    //   component: () => import("@/modules/payments/views/PaymentView.vue"),
    //   redirect: "/payment/step1",
    //   children: [
    //     {
    //       path: "step1",
    //       name: "step-1",
    //       component: () => import("@/modules/payments/components/Step1.vue"),
    //       // component: Step1,
    //     },
    //     {
    //       path: "step2",
    //       name: "step-2",
    //       component: () => import("@/modules/payments/components/Step2.vue"),
    //     },
    //     {
    //       path: "step3",
    //       name: "step-3",
    //       component: () => import("@/modules/payments/components/Step3.vue"),
    //     },
    //     {
    //       path: "step4",
    //       name: "step-4",
    //       component: () => import("@/modules/payments/components/Step4.vue"),
    //     },
    //   ],
    // }
  ],
});

export default router;