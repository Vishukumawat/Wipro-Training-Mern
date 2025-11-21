import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import UserDetails from "../pages/UserDetails";
import FormikLogin from "../pages/FormikLogin";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
       
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/formik-login" element={<FormikLogin />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
