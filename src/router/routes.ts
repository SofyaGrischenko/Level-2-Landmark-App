import { useSightsStore } from '@/stores/sights'
import type { NavigationGuard } from 'vue-router'

const beforeEnterGuard: NavigationGuard = async (to, from, next) => {
  if (to.params.id === 'new') {
    next()
    return
  }
  const sightsStore = useSightsStore()
  await sightsStore.getAllSights()

  if (sightsStore.sights?.some((sight) => to.params.id === sight.id)) {
    next()
  } else {
    next('/invalid')
  }
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/auth/RegistrationPage.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/sight/:id',
    name: 'sight',
    component: () => import('@/pages/sight/SightPage.vue'),
    meta: {
      isAuth: true,
    },
    props: true,
    beforeEnter: beforeEnterGuard,
  },
  {
    path: '/sight/editor/:id',
    name: 'sight-editor',
    component: () => import('@/pages/sight/SightEditor.vue'),
    meta: {
      isAuth: true,
    },
    props: true,
    beforeEnter: beforeEnterGuard,
  },
  {
    path: '/invalid',
    name: 'invalid',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'invalid' },
  },
]
