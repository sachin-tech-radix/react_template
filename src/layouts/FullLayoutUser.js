import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Button, Nav, NavItem } from "reactstrap";
import HeaderOpen from "./HeaderOpen";

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
  // {
  //   title: "Users",
  //   href: "/plan/users",
  //   icon: "bi bi-layout-split",
  // }
];

const FullLayout = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  return (
    <main>
      {/********header**********/}
      <HeaderOpen />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow bg-light-danger" id="sidebarArea">
          <div className="bg-light-danger">
            <div className="d-flex">
              <Button
                color="white"
                className="ms-auto text-white d-lg-none"
                onClick={() => showMobilemenu()}
              >
                <i className="bi bi-x" style={{color: 'black'}}></i>
              </Button>
            </div>
            <div className="p-3 mt-2">
              <Nav vertical className="sidebarNav">
                {navigation.map((navi, index) => (
                  <NavItem key={index} className="sidenav-bg">
                    <Link
                      to={navi.href}
                      className={
                        location.pathname === navi.href
                          ? "active nav-link py-3"
                          : "nav-link py-3"
                      }
                    >
                      <i className={navi.icon}></i>
                      <span className="ms-3 d-inline-block">{navi.title}</span>
                    </Link>
                  </NavItem>
                ))}
              </Nav>
            </div>
          </div>
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
