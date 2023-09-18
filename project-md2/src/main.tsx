import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Layouts/CustomerSite/Utils/ScrollToTop.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
