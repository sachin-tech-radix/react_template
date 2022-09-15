import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../views/ui/navbar.css';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import user from "../assets/images/logos/mobile_logo.png";
import user1 from "../assets/images/users/user4.jpg";

const Header = () => {
  let { shopid } = useParams();
  let [shopID, setShopID] = useState(shopid);
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar  light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/">
        <div className='mobile_logo'>
          <img src={user}></img>
          </div>
        </NavbarBrand>
        
      </div>
      <span style={{fontSize:'16px', fontWeight:'900'}}>Cosmos Vedic World</span>
      <div className="hstack gap-2">
        <Button
          color=" #EBEBEB"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x" style={{ color: 'black', fontSize: '25px', fontWeight: '500' }}></i>
          ) : (
              <i className="bi bi-list" style={{color:'black',fontSize:'25px',fontWeight:'500'}}></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/privacy" className="nav-link" onClick={() => { setIsOpen(false) }}>
       Privacy Policy
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/terms" className="nav-link" onClick={() => { setIsOpen(false) }}>
           Terms & Conditions
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/user/${shopID}`} className="nav-link" onClick={() => { setIsOpen(false) }}>
          Gems Link
            </Link>
          </NavItem>
          
        </Nav>
        
      </Collapse>
    </Navbar>
  );
};

export default Header;