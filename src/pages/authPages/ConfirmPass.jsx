import React, { useState, useRef } from "react";
import GradientBackground from "@/components/authComponents/GradientBackground";
import { Card, CardContent } from "@/components/authComponents/card";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa"; // changed icon
import CloudLogo from "@/components/CloudLogo";
import AuthService from "@/services/authService";
import { useLocation } from "react-router-dom";

const ConfirmPass = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const otpRefs = useRef([]);

  const location = useLocation();
  const email =
    location.state?.email || AuthService.getResetSession()?.email || "";

  const handleOtpChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);
    
    const newOtp = Array(6).fill("");
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);
    
    // Focus the next empty field or the last field
    const nextIndex = Math.min(digits.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const otpString = otp.join("");
      await AuthService.resetPassword(email, password, otpString);
      alert("Password reset OK. Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Reset failed");
    }
  };

  // Check if all OTP boxes are filled and passwords are entered
  const isOtpComplete = otp.every(digit => digit !== "");
  const isDisabled = !isOtpComplete || !password || !confirmPassword;

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
                <FaChevronLeft size={20} />
              </Link>

              {/* Logo */}
              <CloudLogo />

              {/* Heading */}
              <div className="text-center mt-4 mb-2">
                <h2 className="text-lg font-semibold text-black">
                  Confirm Password
                </h2>
              </div>

              {/* OTP Input Boxes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg transition-all duration-200 ${
                        digit
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 bg-white text-gray-900"
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
                      placeholder="0"
                    />
                  ))}
                </div>
              </div>

              {/* Form */}
              <form
                id="confirmpassword"
                onSubmit={handleReset}
                className="space-y-4"
              >
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
            <div className="relative bottom-1 rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-none bg-white text-white px-29 py-4"></div>

            <button
              type="submit"
              form="confirmpassword"
              disabled={isDisabled}
              className={`cursor-pointer mt-2 rounded-3xl w-[171px] h-[45px] font-medium transition-all duration-300 ${
                isDisabled
                  ? "bg-[#ADD8E6] text-white cursor-not-allowed opacity-60"
                  : "bg-[#37BFF5] text-white hover:bg-[#144a7a] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
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