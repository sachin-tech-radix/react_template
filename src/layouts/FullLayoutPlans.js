import { Outlet, useNavigate } from "react-router-dom";
import PlanSidebar from "./PlanSidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useEffect } from "react";

const FullLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')===null){
      navigate("/login");
    }
  }, [])
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow bg-light-danger" id="sidebarArea">
          <PlanSidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
