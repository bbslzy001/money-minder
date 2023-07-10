import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import TableView from "@/views/TableView.vue";
import ToolView from "@/views/ToolView.vue";
import UploadWechat from "@/views/tools/UploadWechat.vue";
import UploadAlipay from "@/views/tools/UploadAlipay.vue";
import ToolHome from "@/views/tools/ToolHome.vue";
import DayAnalyse from "@/views/dashboards/DayAnalyse.vue";
import WeekAnalyse from "@/views/dashboards/WeekAnalyse.vue";
import YearAnalyse from "@/views/dashboards/YearAnalyse.vue";
import AllAnalyse from "@/views/dashboards/AllAnalyse.vue";
import MonthAnalyse from "@/views/dashboards/MonthAnalyse.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        redirect: '/dashboard/day-analyse'
      },
      {
        path: 'day-analyse',
        name: 'day-analyse',
        component: DayAnalyse,
      },
      {
        path: 'week-analyse',
        name: 'week-analyse',
        component: WeekAnalyse,
      },
      {
        path: 'month-analyse',
        name: 'month-analyse',
        component: MonthAnalyse,
      },
      {
        path: 'year-analyse',
        name: 'year-analyse',
        component: YearAnalyse,
      },
      {
        path: 'all-analyse',
        name: 'all-analyse',
        component: AllAnalyse,
      },
    ],
  },
  {
    path: '/table',
    name: 'table',
    component: TableView
  },
  {
    path: '/tool',
    name: 'tool',
    component: ToolView,
    children: [
      {
        path: '',
        name: 'tool-home',
        component: ToolHome,
      },
      {
        path: 'upload-alipay',
        name: 'upload-alipay',
        component: UploadAlipay,
      },
      {
        path: 'upload-wechat',
        name: 'upload-wechat',
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