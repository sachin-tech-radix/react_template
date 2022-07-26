import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const FullLayoutUser = lazy(() => import("../layouts/FullLayoutUser.js"));
const Shops = lazy(() => import("../views/ui/Shops"));
const Discount = lazy(() => import("../views/ui/Discount"));
const Orders = lazy(() => import("../views/ui/Orders"));
const Login = lazy(() => import("../views/ui/Login"));
/***** Pages ****/

const Userform = lazy(() => import("../views/ui/Userform"));

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

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
      { path: "/discount", exact: true, element: <Discount /> },
      { path: "/orders", exact: true, element: <Orders /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
