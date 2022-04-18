import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/Main.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
