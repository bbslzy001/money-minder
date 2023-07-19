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
import ManageBill from "@/views/tools/ManageBill.vue";
import DayReport from "@/views/tools/DayReport.vue";
import WeekReport from "@/views/tools/WeekReport.vue";
import MonthReport from "@/views/tools/MonthReport.vue";
import YearReport from "@/views/tools/YearReport.vue";
import CustomReport from "@/views/tools/CustomReport.vue";
import ManageTxnType from "@/views/tools/ManageTxnType.vue";

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
      {
        path: 'manage-bill',
        name: 'manage-bill',
        component: ManageBill,
      },
      {
        path: 'generate-day-report',
        name: 'generate-day-report',
        component: DayReport,
      },
      {
        path: 'generate-week-report',
        name: 'generate-week-report',
        component: WeekReport,
      },
      {
        path: 'generate-month-report',
        name: 'generate-month-report',
        component: MonthReport,
      },
      {
        path: 'generate-year-report',
        name: 'generate-year-report',
        component: YearReport,
      },
      {
        path: 'generate-custom-report',
        name: 'generate-custom-report',
        component: CustomReport,
      },
      {
        path: 'manage-txn-type',
        name: 'manage-txn-type',
        component: ManageTxnType,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router