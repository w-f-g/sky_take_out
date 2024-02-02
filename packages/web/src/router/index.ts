import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/pages/login/index.vue'
import Layout from '@/layout/index.vue'
import { BASE_URL } from '@/utils'
import adminRoutes from './admin'

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
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
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
