import { createRouter, createWebHistory } from 'vue-router'
import admin from "./admin"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          name: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          name: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          name: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          name: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          name: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          name: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
        ...admin
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          name: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('at')

  if (!(to.name !== 'login' && !isAuthenticated)) {
    next()
  } else {
    next({
      name: 'login',
    })
  }
});



export default router
