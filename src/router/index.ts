import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
    },
    {
      path: '/',
      name: 'analytics',
      component: () => import('@/views/AnalyticsView.vue'),
    },
    {
      path: '/create',
      name: 'transaction entry',
      component: () => import('@/views/TransactionFormView.vue'),
    },
  ],
})

export default router
