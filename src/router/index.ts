import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        hide: true,
      },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/DashboardView.vue'),
    },
  ],
  linkActiveClass: 'text-blue-500',
  linkExactActiveClass: 'exact-active',
})

export default routes
