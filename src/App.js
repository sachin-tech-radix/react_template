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
const UserView = lazy(() => import("./views/ui/UserView"));

const Orders = lazy(() => import("./views/ui/Orders"));
const Login = lazy(() => import("./views/ui/Login"));
const Privacy = lazy(() => import("./views/ui/Privacy"));
const Terms = lazy(() => import("./views/ui/Terms"));
/***** Pages ****/

const Userform = lazy(() => import("./views/ui/Userform"));

const App = () => {
  let [user,setUser] = useState(false);
  useEffect(()=>{
    let user1 = localStorage.getItem('type');
    !user1?setUser(false):user1==2?setUser(null):setUser(true)
  },[])
  return(
    <Routes>
      {user === false &&
        <><Route path="/" element={<FullLayoutUser />}>
          <Route path="/" element={<Login auth={(type)=>{setUser(type);}} />} />
          <Route path="/login" element={<Login auth={(type)=>{setUser(type);}} />} />
          <Route path="/privacy" element={<Privacy  />} />
          <Route path="/terms" element={<Terms  />} />
          <Route path="/user/:shopid" element={<Userform />} />
        </Route>
        <Route path="*" element={<Navigate to='/'/>} /></>}
      {user === true && 
        <><Route path="/gems" element={<FullLayout logoutuser={()=>setUser(false)} />}>
          <Route path="/gems/sales" element={<Shops />} />
          <Route path="/gems" element={<Dashboard />} />
          <Route path="/gems/orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<Navigate to='gems'/>} /></>}
      {user === null && 
        <><Route path="/plan" element={<FullLayoutPlans logoutuser={()=>setUser(false)} />}>
        <Route path="/plan/plans" element={<Plans />} />
        <Route path="/plan" element={<PlanDashboard />} />
        <Route path="/plan/users" element={<Users />} />
        <Route path="/plan/userview" element={<UserView />} />
      </Route>
      <Route path="*" element={<Navigate to='plan'/>} /></>}
    </Routes>
  )
};

export default App;
