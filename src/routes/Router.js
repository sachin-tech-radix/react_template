import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const FullLayoutUser = lazy(() => import("../layouts/FullLayoutUser.js"));
const Shops = lazy(() => import("../views/ui/Shops"));
const Dashboard = lazy(() => import("../views/ui/Dashboard"));
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
  },
];

export default ThemeRoutes;
