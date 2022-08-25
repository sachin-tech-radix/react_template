import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { useEffect } from "react";
import HeaderOpen from "./HeaderOpen";

const FullLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      navigate("/dashboard");
    }
    // if(localStorage.getItem('type') == 1){
    //   navigate("/dashboard");
    // }else{
    //   navigate("/plandashboard");
    // }
  }, [])
  return (
    <main>
      {/********header**********/}
      <HeaderOpen />
      <div className="pageWrapper d-lg-flex">
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
