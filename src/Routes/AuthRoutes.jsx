// src/routes/AuthRoute.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// import your pages
import Login from "../pages/authPages/Login";
import Forgot from "../pages/authPages/ForgotPassword";
import SignUp from "../pages/authPages/Signup";
import VerificationScreen from "../pages/authPages/SignupVerification";
import ConfirmPass from "../pages/authPages/ResetPassword";

const AuthRoute = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Login />} />

      {/* Login route explicitly */}
      <Route path="/login" element={<Login />} />

      {/* Forgot password page */}
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<VerificationScreen />} />
      <Route path="/reset" element={<ConfirmPass />} />
    </Routes>
  );
};

export default AuthRoute;
