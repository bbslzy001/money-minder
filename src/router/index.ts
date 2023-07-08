import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import TableView from "@/views/TableView.vue";
import ToolView from "@/views/ToolView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/table',
    name: 'table',
    component: TableView
  },
  {
    path: '/tool',
    name: 'tool',
    component: ToolView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router