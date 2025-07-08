export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue' as const),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue' as const),
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/RegistrationPage.vue' as const),
  },
]
