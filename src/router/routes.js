import HomeLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Home from "@/pages/Home.vue";
import DayShift from "@/pages/DayShift.vue";
import WorkTime from "@/pages/WorkTime";
import Report from "@/pages/Report.vue";
import Setting from "@/pages/Setting.vue";

const router = [
  {
    path: "/",
    component: HomeLayout,
    redirect: "/home",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "dayshift",
        name: "dayshift",
        component: DayShift,
      },
      {
        path: "worktime",
        name: "worktime",
        component: WorkTime,
      },
      {
        path: "report",
        name: "report",
        component: Report,
      },
      {
        path: "setting",
        name: "setting",
        component: Setting,
      },
    ],
  },
  { path: "/login", component: Login },

  { path: "*", component: NotFound },
];

export default router;
