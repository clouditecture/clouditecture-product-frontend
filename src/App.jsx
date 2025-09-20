// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Forgot from "./pages/authPages/Forgot";
import SignUp from "./pages/authPages/Signup";
import VerificationScreen from "./pages/authPages/VerificationScreen";
import ConfirmPass from "./pages/authPages/ConfirmPass";
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
        <Route path="/reset" element={<ConfirmPass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
