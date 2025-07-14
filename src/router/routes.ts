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
    component: () => import('@/pages/LoginPage.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/RegistrationPage.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/sight/:id',
    name: 'sight',
    component: () => import('@/pages/SightPage.vue'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/sightEditor',
    name: 'sight-editor',
    component: () => import('@/pages/SightEditor.vue'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'invalid',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]
