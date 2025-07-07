import MapPage from '@/pages/MapPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapPage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/MapPage.vue')
    },
  ],
})

export default router
