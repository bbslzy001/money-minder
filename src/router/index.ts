import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import TableView from "@/views/TableView.vue";
import ToolView from "@/views/ToolView.vue";
import UploadWechat from "@/views/tools/UploadWechat.vue";
import UploadAlipay from "@/views/tools/UploadAlipay.vue";
import ToolHome from "@/views/tools/ToolHome.vue";

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
    component: ToolView,
    children: [
      {
        path: '',
        component: ToolHome,
      },
      {
        path: 'upload-alipay',
        component: UploadAlipay,
      },
      {
        path: 'upload-wechat',
        component: UploadWechat,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router