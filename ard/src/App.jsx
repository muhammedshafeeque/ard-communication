import "./App.scss";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { Stor } from "./Context/Store";
import BlockUi from "./Components/BlockUi/BlockUi";
import Login from "./Pages/Login/Login";
import { nav } from "./Constants/routes";
import Header from "./Components/Header/Header";

function App() {
  const { blockUi,user } = Stor();
  const Home = React.lazy(() => import("./Pages/Home/Home"));
  const AdminHome = React.lazy(() => import("./Pages/AdminHome/AdminHome"));
  const Users = React.lazy(() => import("./Pages/Users/Users"));
  const DSC = React.lazy(() => import("./Pages/Dse/Dse"));
  const Line = React.lazy(() => import("./Pages/Line/Line"));
  const ListLine = React.lazy(() => import("./Pages/Line/ListLine"));
  const CreateUser = React.lazy(() => import("./Pages/Users/Createuser"));
  const CreateDse=React.lazy(()=>import("./Pages/Dse/CreateDse"))
  const Shops=React.lazy(()=>import('./Pages/Shop/Shops'))
  const CreateShop=React.lazy(()=>import('./Pages/Shop/createShop'))
  const Mappings=React.lazy(()=>import('./Pages/Mappings/Mapping'))
  const AddStock=React.lazy(()=> import('./Pages/Stock/AddStock'))
  return (
    <div className="App">
      {user&& <Header/>}
     
      <BlockUi block={blockUi} />
      <Suspense fallback={<BlockUi block={true} />}>
        <Routes>
          <Route path={nav.LOGIN} exact element={<Login />} />
          <Route path={nav.HOME} element={<Home />} />
          <Route path={nav.ADMIN_HOME} element={<AdminHome />} />
          <Route path={nav.USERS} element={<Users />} />
          <Route path={nav.DSE} element={<DSC />} />
          <Route path={nav.CREATE_LINE} element={<Line />} />
          <Route path={nav.LINES} element={<ListLine />} />
          <Route path={nav.CREATE_USER} element={<CreateUser />} />
          <Route path={nav.CREATE_DSE} element={<CreateDse/>}/>
          <Route path={nav.SHOPS} element={<Shops/>}/>
          <Route path={nav.CREATE_SHOP} element={<CreateShop/>}/>
          <Route path={nav.MAPPINGS} element={<Mappings/>}/>
          <Route path={nav.STOCK} element={<AddStock/>} />

        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
