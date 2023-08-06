import React from "react";
import "./Header.scss";

import Sidebar from "../SideBar/Sidebar";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header_main_div pt-3" >
        <Sidebar />
        <Navbar bg="transparant" data-bs-theme="dark">
          <Container>
            
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
