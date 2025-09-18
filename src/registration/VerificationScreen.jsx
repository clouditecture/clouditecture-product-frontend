import React, { useState } from "react";
import GradientBackground from "@/components/ui/GradientBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa"; // changed here
import CloudLogo from "@/components/CloudLogo";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "@/services/authService";


const VerificationScreen = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const location = useLocation();
  const email = location.state?.email || AuthService.getResetSession()?.email || "";

  const handleChange = (value, index) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit?.(code.join(""));
  // };

  const handleVerify = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await AuthService.verifyOTP(email, code);
      alert("OTP verified — continue to reset password");
      navigate("/reset", { state: { email } });
    } catch (err) {
      alert(err.message || "Invalid OTP");
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
                <FaChevronLeft size={20} />  {/* looks like < */}
              </Link>

              {/* Logo */}
              <CloudLogo />

              {/* Headings */}
              <div className="text-center mt-4 mb-6">
                <h2 className="text-lg font-semibold text-black">
                  Verify your email
                </h2>
                <p className="text-sm text-gray-600">Enter 4 digit Code</p>
              </div>

              {/* Code Input Boxes */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      className="w-16 h-12 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-lg font-medium transition"
                      required
                    />
                  ))}
                </div>

                {/* Resend link */}
                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={() => console.log("Resend code")}
                    className="text-sm text-[#37BFF5] font-medium hover:underline"
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
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

export default VerificationScreen;
