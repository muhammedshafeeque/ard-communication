import React, { useState } from "react";
import "./Header.scss";

import Sidebar from "../SideBar/Sidebar";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="header_main_div pt-3" onClick={() => setOpen(!open)}>
        <Sidebar />
        <Navbar bg="transparant" data-bs-theme="dark">
          <Container>
            <Nav>
              <ul className="nav-links">
                <li>
                  <a>Settings</a>
                </li>
              </ul>
              {open && (
                <div className="options">
                  <Link className="link" to="/resetpassword">
                    Reset Password
                  </Link>
                </div>
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
