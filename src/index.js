import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFoundPage from "./components/NotFound";
import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/App" element={<App />} />
      <Route path="*" component={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
