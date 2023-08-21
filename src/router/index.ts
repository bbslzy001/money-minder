import {createRouter, createWebHistory} from 'vue-router';
import BillView from "@/views/BillView.vue";
import DashboardView from "@/views/DashboardView.vue";
import ReportView from "@/views/ReportView.vue";
import TxnView from "@/views/TxnView.vue";
import TxnTypeRuleView from "@/views/TxnTypeRuleView.vue";
import UploadView from "@/views/UploadView.vue";
import DailyDashboard from "@/views/dashboards/DailyDashboard.vue";
import WeeklyDashboard from "@/views/dashboards/WeeklyDashboard.vue";
import MonthlyDashboard from "@/views/dashboards/MonthlyDashboard.vue";
import YearlyDashboard from "@/views/dashboards/YearlyDashboard.vue";
import CustomDashboard from "@/views/dashboards/CustomDashboard.vue";
import ReportHome from "@/views/reports/ReportHome.vue";
import DailyReport from "@/views/reports/DailyReport.vue";
import WeeklyReport from "@/views/reports/WeeklyReport.vue";
import MonthlyReport from "@/views/reports/MonthlyReport.vue";
import YearlyReport from "@/views/reports/YearlyReport.vue";
import CustomReport from "@/views/reports/CustomReport.vue";
import UploadHome from "@/views/uploads/UploadHome.vue";
import UploadAlipay from "@/views/uploads/UploadAlipay.vue";
import UploadWechat from "@/views/uploads/UploadWechat.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView,
    children: [
      {
        path: '',
        name: 'to-upload-home',
        redirect: '/upload/upload-home'
      },
      {
        path: 'upload-home',
        name: 'upload-home',
        component: UploadHome,
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
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        name: 'dashboard-home',
        redirect: '/dashboard/daily-dashboard'
      },
      {
        path: 'daily-dashboard',
        name: 'daily-dashboard',
        component: DailyDashboard,
      },
      {
        path: 'weekly-dashboard',
        name: 'weekly-dashboard',
        component: WeeklyDashboard,
      },
      {
        path: 'monthly-dashboard',
        name: 'monthly-dashboard',
        component: MonthlyDashboard,
      },
      {
        path: 'yearly-dashboard',
        name: 'yearly-dashboard',
        component: YearlyDashboard,
      },
      {
        path: 'custom-dashboard',
        name: 'custom-dashboard',
        component: CustomDashboard,
      },
    ],
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView,
    children: [
      {
        path: '',
        name: 'to-report-home',
        redirect: '/report/report-home'
      },
      {
        path: 'report-home',
        name: 'report-home',
        component: ReportHome,
      },
      {
        path: 'daily-report',
        name: 'daily-report',
        component: DailyReport,
      },
      {
        path: 'weekly-report',
        name: 'weekly-report',
        component: WeeklyReport,
      },
      {
        path: 'monthly-report',
        name: 'monthly-report',
        component: MonthlyReport,
      },
      {
        path: 'yearly-report',
        name: 'yearly-report',
        component: YearlyReport,
      },
      {
        path: 'custom-report',
        name: 'custom-report',
        component: CustomReport,
      },
    ],
  },
  {
    path: '/bill',
    name: 'bill',
    component: BillView,
  },
  {
    path: '/txn',
    name: 'txn',
    component: TxnView,
  },
  {
    path: '/txn-type-rule',
    name: 'txn-type-rule',
    component: TxnTypeRuleView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router