export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue' as const),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue' as const),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/RegistrationPage.vue' as const),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'invalid',
    component: () => import('@/pages/NotFoundPage.vue' as const),
  },
]
