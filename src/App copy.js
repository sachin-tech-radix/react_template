import { lazy, useState, useEffect } from "react";
import {Routes,Route, Navigate} from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout"));
const FullLayoutUser = lazy(() => import("./layouts/FullLayoutUser"));
const Shops = lazy(() => import("./views/ui/Shops"));
const Dashboard = lazy(() => import("./views/ui/Dashboard"));

const FullLayoutPlans = lazy(() => import("./layouts/FullLayoutPlans"));
const PlanDashboard = lazy(() => import("./views/ui/PlanDashboard"));
const Plans = lazy(() => import("./views/ui/Plans"));
const Users = lazy(() => import("./views/ui/Users"));

const Orders = lazy(() => import("./views/ui/Orders"));
const Login = lazy(() => import("./views/ui/Login"));
/***** Pages ****/

const Userform = lazy(() => import("./views/ui/Userform"));

const App = () => {

  return(
    <>
    <Routes>
      <Route path="/" element={<FullLayoutUser />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:shopid" element={<Userform />} />
      </Route>
      <Route path="/gems" element={<FullLayout />}>
        <Route path="/gems/shops" element={<Shops />} />
        <Route path="/gems" element={<Dashboard />} />
        <Route path="/gems/orders" element={<Orders />} />
      </Route>
      <Route path="/plan" element={<FullLayoutPlans />}>
        <Route path="/plan/plans" element={<Plans />} />
        <Route path="/plan" element={<PlanDashboard />} />
        <Route path="/plan/users" element={<Users />} />
      </Route>
      <Route path="*" element={<Navigate to='/'/>} />
    </Routes>
    </>
  )

};

export default App;
