import { TOKEN } from "../Constants/constant";

export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN));
};
export const setToken = (token) => {
  localStorage.setItem(TOKEN, JSON.stringify(token));
};
