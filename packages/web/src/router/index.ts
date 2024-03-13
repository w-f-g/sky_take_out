import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/pages/login/index.vue'
import Layout from '@/layout/index.vue'
import { BASE_URL } from '@/utils'
import adminRoutes from './admin'
import { IS_ELECTRON } from '@/utils/application'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: adminRoutes,
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/404',
    component: () => import('@/pages/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }
]

const router = createRouter({
  history: IS_ELECTRON
    ? createWebHashHistory(BASE_URL)
    : createWebHistory(BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const meta = to.meta
  if (meta.title) {
    document.title = <string>meta.title
  } else {
    document.title = '苍穹外卖'
  }
  next()
})

export default router
