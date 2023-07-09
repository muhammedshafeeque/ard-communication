import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ArdProvider from "./Context/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
const options = {
  position: "top right",
  timeout: 5000,
  offset: "30px",
  transition: "scale",
};
root.render(
  <React.StrictMode> 
    <BrowserRouter>
    <ArdProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
      </ArdProvider>
    </BrowserRouter>
  </React.StrictMode>
);
