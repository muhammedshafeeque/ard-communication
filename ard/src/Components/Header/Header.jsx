import React from "react";
import "./Header.scss";

import Sidebar from "../SideBar/Sidebar";
function Header() {
  return (
    <>
      <div className="header_main_div pt-3" >
        <Sidebar />
        
      </div>
    </>
  );
}

export default Header;
