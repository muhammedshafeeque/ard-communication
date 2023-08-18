import React, { useEffect } from "react";
import "./Header.scss";

import Sidebar from "../SideBar/Sidebar";
import { Stor } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
function Header() {
  const {user}=Stor()
  const navigate=useNavigate()
  useEffect(()=>{
    if(user.alias==='admin'){
      navigate(nav.ADMIN_HOME)
    }else{
      navigate(nav.HOME)
    }
  },[user])
  return (
    <>
      <div className="header_main_div pt-3" >
        <Sidebar />
        
      </div>
    </>
  );
}

export default Header;
