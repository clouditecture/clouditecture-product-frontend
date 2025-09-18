// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./registration/Login";
import Forgot from "./registration/Forgot";
import SignUp from "./registration/Signup";
import VerificationScreen from "./registration/VerificationScreen";
import ConfirmPass from "./registration/ConfirmPass";
import AuthService from "./services/authService";



const App = () => {

   useEffect(() => {
    AuthService.init(); // seed initial users
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Login route explicitly */}
        <Route path="/login" element={<Login />} />

        {/* Forgot password page */}
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerificationScreen />} />
        <Route path="/confirm-password" element={<ConfirmPass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
