import React, { useState } from "react";
import GradientBackground from "@/components/ui/GradientBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CloudLogo from "@/components/CloudLogo";
import AuthService from "@/services/authService";
import { useLocation } from "react-router-dom";


const ConfirmPass = ({ onSubmit }) => {
    const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const email = location.state?.email || AuthService.getResetSession()?.email || "";


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit?.({ password, confirmPassword });
  // };

  
  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // setLoading(true);
    try {
      await AuthService.resetPassword(email, password);
      alert("Password reset OK. Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Reset failed");
    } finally {
      // setLoading(false);
    }
  };
  return (
    <GradientBackground
      gradientFrom="from-[#1B65A6]"
      gradientTo="to-[#262D61]"
      className="relative overflow-hidden min-h-screen w-full"
    >
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-xl rounded-2xl rounded-bl-none overflow-hidden">
            <CardContent className="p-6 relative">
              {/* Back icon */}
              <Link
                to="/login"
                aria-label="Go back to login"
                title="Back to login"
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
              >
                <FaArrowLeft size={20} />
              </Link>

              {/* Logo */}
              <CloudLogo />

              {/* Heading */}
              <div className="text-center mt-4 mb-6">
                <h2 className="text-lg font-semibold text-black">
                  Confirm Password
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleReset} className="space-y-4">
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Bottom Buttons */}
          <div className="flex gap-4">
            <div
              className="relative bottom-1 rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-none bg-white text-white px-29 py-4"
            >
             
            </div>

            <button
              className="cursor-pointer mt-2 rounded-3xl bg-[#37BFF5] text-white w-[171px] h-[45px]"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default ConfirmPass;
