import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/pages/login/index.vue'
import { BASE_URL } from '@/utils'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/pages/dashboard/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
})

export default router
