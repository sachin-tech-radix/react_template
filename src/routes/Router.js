import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const FullLayoutUser = lazy(() => import("../layouts/FullLayoutUser.js"));
const Shops = lazy(() => import("../views/ui/Shops"));
const Dashboard = lazy(() => import("../views/ui/Dashboard"));

const FullLayoutPlans = lazy(() => import("../layouts/FullLayoutPlans.js"));
const PlanDashboard = lazy(() => import("../views/ui/PlanDashboard"));
const Plans = lazy(() => import("../views/ui/Plans"));
const Users = lazy(() => import("../views/ui/Users"));

const Orders = lazy(() => import("../views/ui/Orders"));
const Login = lazy(() => import("../views/ui/Login"));
/***** Pages ****/

const Userform = lazy(() => import("../views/ui/Userform"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayoutUser />,
    children: [
      { path: "/login", exact: true, element: <Login /> },
      { path: "/", exact: true, element: <Login /> },
      { path: "/:shopid", exact: true, element: <Userform /> },
    ],
  },{
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/shops", exact: true, element: <Shops /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/orders", exact: true, element: <Orders /> },
    ],
  },{
    path: "/",
    element: <FullLayoutPlans />,
    children: [
      { path: "/plans", exact: true, element: <Plans /> },
      { path: "/plandashboard", exact: true, element: <PlanDashboard /> },
      { path: "/users", exact: true, element: <Users /> },
    ],
  },
];

export default ThemeRoutes;
