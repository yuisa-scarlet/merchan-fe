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
      meta: { requiresAuth: true, allowedRoles: ["user"] },
      children: [
        {
          path: "dashboard",
          name: "dashboard.client",
          component: () => import("@/views/dashboard/DashboardView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: ClientLayout,
      meta: { requiresAuth: true, allowedRoles: ["admin"] },
      children: [
        {
          path: "dashboard",
          name: "dashboard.admin",
          component: () => import("@/views/dashboard/DashboardView.vue"),
        },
      ],
    },
    {
      path: "/transaction/:id",
      name: "transaction.payment",
      component: () => import("@/views/transaction/TransactionPaymentView.vue"),
    },
  ],
})
routes.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token")
  const role = localStorage.getItem("role")

  if (to.meta.requiresAuth) {
    if (!accessToken) {
      return next({ name: "login" })
    }

    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(role as string)) {
      return next({ name: "not-found" })
    }
  }

  if ((to.name === "login" || to.name === "register") && accessToken) {
    if (role === "admin") return next({ name: "dashboard.admin" })
    if (role === "user") return next({ name: "dashboard.client" })
  }

  return next()
})

export default routes
