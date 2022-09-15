import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { apiPath, config } from "../Constants";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const navigation = [
  {
    title: "Dashboard",
    href: "/gems",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Sales Team",
    href: "/gems/sales",
    icon: "bi bi-textarea-resize",
  },
  // {
  //   title: "Discount",
  //   href: "/discount",
  //   icon: "bi bi-layout-split",
  // },
  {
    title: "Orders",
    href: "/gems/orders",
    icon: "bi bi-layout-split",
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  let logout = () => {
    let url = `${apiPath}logout`;
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.get(url, config).then((res)=>{
      localStorage.clear();
      navigate("/login");
    }).catch((err)=>{
      localStorage.clear();
      navigate("/login");
    });
  }
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
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
        &nbsp;&nbsp;&nbsp;&nbsp;<i className='bi bi-hdd-stack'></i><Button className="btn" color="light-danger" onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
