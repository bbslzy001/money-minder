import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import TableView from "@/views/TableView.vue";
import ToolView from "@/views/ToolView.vue";
import UploadWechat from "@/views/tools/UploadWechat.vue";
import UploadAlipay from "@/views/tools/UploadAlipay.vue";
import ToolHome from "@/views/tools/ToolHome.vue";
import DayAnalysis from "@/views/dashboards/DayAnalysis.vue";
import WeekAnalysis from "@/views/dashboards/WeekAnalysis.vue";
import YearAnalysis from "@/views/dashboards/YearAnalysis.vue";
import AllAnalysis from "@/views/dashboards/AllAnalysis.vue";
import MonthAnalysis from "@/views/dashboards/MonthAnalysis.vue";
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
        name: 'dashboard-home',
        redirect: '/dashboard/day-analysis'
      },
      {
        path: 'day-analysis',
        name: 'day-analysis',
        component: DayAnalysis,
      },
      {
        path: 'week-analysis',
        name: 'week-analysis',
        component: WeekAnalysis,
      },
      {
        path: 'month-analysis',
        name: 'month-analysis',
        component: MonthAnalysis,
      },
      {
        path: 'year-analysis',
        name: 'year-analysis',
        component: YearAnalysis,
      },
      {
        path: 'all-analysis',
        name: 'all-analysis',
        component: AllAnalysis,
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