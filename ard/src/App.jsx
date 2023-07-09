import "./App.scss";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { Stor } from "./Context/Store";
import BlockUi from "./Components/BlockUi/BlockUi";
import Login from "./Pages/Login/Login";
import { nav } from "./Constants/routes";
function App() {
  const { blockUi } = Stor();
  const Home = React.lazy(() => import("./Pages/Home/Home"));
  const AdminHome = React.lazy(() => import("./Pages/AdminHome/AdminHome"));
  const Users = React.lazy(() => import("./Pages/Users/Users"));
  const DSC = React.lazy(() => import("./Pages/Dse/Dse"));
  return (
    <div className="App">
      <BlockUi block={blockUi} />
      <Suspense fallback={<BlockUi block={true} />}>
        <Routes>
          <Route path={nav.LOGIN} exact element={<Login />} />
          <Route path={nav.HOME} element={<Home />} />
          <Route path={nav.ADMIN_HOME} element={<AdminHome />} />
          <Route path={nav.USERS} element={<Users />} />
          <Route path={nav.DSE} element={<DSC />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
