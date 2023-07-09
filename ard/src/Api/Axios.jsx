import axios from "axios";
import { BASE_URL } from "../Constants/constant";
import { getToken } from "../Common/auth";
import { nav } from "../Constants/routes";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
  },
  (error) => {
    if (error.response.status === 403) {
      window.location.href = nav.LOGIN;
    } else {
      throw error;
    }
  }
);
export default instance;