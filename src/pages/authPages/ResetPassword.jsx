import React, { useState, useRef } from "react";
import GradientBackground from "@/components/authComponents/GradientBackground";
import { Card, CardContent } from "@/components/authComponents/card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import CloudLogo from "@/components/CloudLogo";

const ConfirmPass = ({ onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const otpRefs = useRef([]);

  // only take email from router state
  const email = location.state?.email || "";

  // ---- Password validation like SignUp.jsx ----
  const validatePassword = (pass) => ({
    length: pass.length >= 8,
    uppercase: /[A-Z]/.test(pass),
    lowercase: /[a-z]/.test(pass),
    digit: /\d/.test(pass),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
  });

  const passwordChecks = validatePassword(password);
  const allPasswordRequirementsMet = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // ---- OTP handlers unchanged ----
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = Array(6).fill("");
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!allPasswordRequirementsMet) {
      setError("Password must meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!onSubmit) {
      setError("No submit handler provided");
      return;
    }

    setLoading(true);
    try {
      const otpString = otp.join("");
      await onSubmit({ email, password, otp: otpString });
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const isDisabled =
    !isOtpComplete ||
    !password ||
    !confirmPassword ||
    !allPasswordRequirementsMet ||
    !passwordsMatch ||
    loading;

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
              <Link
                to="/login"
                aria-label="Go back to login"
                title="Back to login"
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
              >
                <FaChevronLeft size={20} />
              </Link>

              <CloudLogo />

              <div className="text-center mt-4 mb-2">
                <h2 className="text-lg font-semibold text-black">Confirm Password</h2>
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
                    />
                  ))}
                </div>
              </div>

              <form id="confirmpassword" onSubmit={handleReset} className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onFocus={() => setShowPasswordRequirements(true)}
                    onBlur={() => setShowPasswordRequirements(false)}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                      !password
                        ? "border-gray-300"
                        : allPasswordRequirementsMet
                        ? "border-green-300"
                        : "border-red-300"
                    }`}
                    required
                  />
                  {showPasswordRequirements && (
                    <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                      <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <PasswordRequirement
                          passed={passwordChecks.length}
                          text="At least 8 characters long"
                        />
                        <PasswordRequirement
                          passed={passwordChecks.uppercase}
                          text="At least 1 uppercase letter"
                        />
                        <PasswordRequirement
                          passed={passwordChecks.lowercase}
                          text="At least 1 lowercase letter"
                        />
                        <PasswordRequirement
                          passed={passwordChecks.digit}
                          text="At least 1 digit"
                        />
                        <PasswordRequirement
                          passed={passwordChecks.special}
                          text="At least 1 special character"
                        />
                      </div>
                    </div>
                  )}
                </div>

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
                    className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                      !confirmPassword
                        ? "border-gray-300"
                        : passwordsMatch
                        ? "border-green-300"
                        : "border-red-300"
                    }`}
                    required
                  />
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                  {passwordsMatch && confirmPassword && (
                    <p className="text-green-600 text-xs mt-1">✓ Passwords match</p>
                  )}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <div className="relative bottom-1 rounded-bl-3xl rounded-tl-none rounded-tr-none bg-white text-white px-6 py-5 w-[279px]">
              <div className="text-gray-600 text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-[#37BFF5] hover:underline">
                  Log in
                </Link>
              </div>
            </div>

            <button
              type="submit"
              form="confirmpassword"
              disabled={isDisabled}
              className={`cursor-pointer mt-2 rounded-br-3xl w-[171px] h-[45px] font-medium transition-all duration-300 ${
                isDisabled
                  ? "bg-[#ADD8E6] text-white cursor-not-allowed opacity-60"
                  : "bg-[#37BFF5] text-white hover:bg-[#2ba9dc] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
            >
              {loading ? "Processing…" : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

// Small helper component for password requirement line
const PasswordRequirement = ({ passed, text }) => (
  <div
    className={`flex items-center text-xs ${
      passed ? "text-green-600" : "text-gray-500"
    }`}
  >
    <div
      className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${
        passed ? "bg-green-100" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          passed ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
    </div>
    {text}
  </div>
);

export default ConfirmPass;
