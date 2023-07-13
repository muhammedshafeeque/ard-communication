import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import { Stor } from "../../Context/Store";
import { AdminSideBar, HomeSidebar } from "../../Constants/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import {RiLogoutBoxRLine} from 'react-icons/ri'

function Sidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sideBar, setSidebar] = useState([]);
  const { user } = Stor();
  const navigate = useNavigate();
  useEffect(() => {
    if (user&&user.aleas === "admin") {
      setSidebar(AdminSideBar);
    } else {
      setSidebar(HomeSidebar);
    }
  }, [user, setSidebar]);

  return (
    <>
      <h4 onClick={handleShow}>ARD COMMUNICATIONS</h4>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ARD COMMUNICATIONS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {sideBar.map((item, i) => {
            return (
              <Button
                className="mt-3"
                key={i}
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.nav);
                  setShow(false);
                }}
              >
                <item.icon /> {item.name}
              </Button>
            );
          })}
          <Button
                className="mt-3"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear()
                  navigate(nav.LOGIN);
                  
                }}
              >
                <RiLogoutBoxRLine /> Logout
              </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
