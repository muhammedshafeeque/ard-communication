import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../Common/auth";
import axios from "../Api/Axios";
import { useNavigate } from "react-router-dom";
import { nav } from "../Constants/routes";
const StoreContext = createContext();
const ArdProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [blockUi, setBlockUi] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = getToken();
    if (!user) {
      if (token) {
        axios
          .get("auth/get-req-user")
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            setUser(null);
            localStorage.clear();
            navigate(nav.LOGIN);
          });
      } else {
        navigate(nav.LOGIN);
      }
    }
  }, [navigate,user]);
  return (
    <StoreContext.Provider value={{ user, setUser, blockUi, setBlockUi }}>
      {children}
    </StoreContext.Provider>
  );
};
export default ArdProvider;
export const Stor = () => {
  return useContext(StoreContext);
};