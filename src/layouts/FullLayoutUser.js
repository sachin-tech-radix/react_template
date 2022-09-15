import { useState } from "react";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { Container, Button, Nav, NavItem } from "reactstrap";
import HeaderOpen from "./HeaderOpen";

const FullLayout = () => {
  let { shopid } = useParams();
  let [shopID,setShopID] = useState(shopid);
  const navigation = [
    {
      title: "Privacy Policy",
      href: "/privacy",
      icon: "bi bi-speedometer2",
    },
    {
      title: "Terms & Conditions",
      href: "/terms",
      icon: "bi bi-textarea-resize",
    },
    {
      title: "Gems Link",
      href: `/user/${shopID}`,
      icon: "bi bi-layout-split",
    }
  ];
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();console.log(location);
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