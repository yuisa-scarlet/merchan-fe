import AuthLayout from "@/layouts/AuthLayout.vue"
import ClientLayout from "@/layouts/ClientLayout.vue"
import PublicLayout from "@/layouts/PublicLayout.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
      meta: {
        hide: true,
      },
    },
    {
      path: "/",
      component: PublicLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/home/HomeView.vue"),
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/LoginView.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/auth/RegisterView.vue"),
        },
      ],
    },
    {
      path: "/client",
      component: ClientLayout,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/DashboardView.vue"),
        },
        {
          path: "transactions",
          name: "transactions",
          component: () => import("@/views/transaction/TransactionView.vue"),
        },
      ],
    },
  ],
})

export default routes
