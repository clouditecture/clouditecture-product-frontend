import React, { useState } from "react";
import GradientBackground from "@/components/authComponents/GradientBackground";
import { Card, CardContent } from "@/components/authComponents/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import CloudLogo from "@/components/CloudLogo";

const VerificationScreen = ({ onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 boxes
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle change in each input
  const handleChange = (value, index) => {
    if (value.length > 1) value = value.slice(-1); // only one digit
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // only numbers
    setOtp(newOtp);
    // auto focus next box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (onSubmit) {
      setIsSubmitting(true);
      onSubmit(code);
    }
  };

  const resendCode = () => {
    console.log("Resend code clicked");
  };

  return (
    <GradientBackground
      gradientFrom="from-[#1B65A6]"
      gradientTo="to-[#262D61]"
      className="relative overflow-hidden min-h-screen w-full"
    >
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-xl rounded-2xl rounded-bl-none rounded-br-none overflow-hidden">
            <CardContent className="p-6 relative">
              {/* Back icon */}
              <Link
                to="/signup"
                aria-label="Back to signup"
                title="Back"
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
              >
                <FaChevronLeft size={20} />
              </Link>

              {/* Cloud Icon */}
              <CloudLogo />

              {/* Heading */}
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-black mb-1">
                  Verify Your Email
                </h2>
                <p className="text-sm font-medium text-gray-600">
                  Enter 6 Digit Code
                </p>
              </div>

              {/* Form */}
              <form id="verifyform" onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center gap-3 mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text" // to remove spinner
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[index]) {
                          // move focus back if current empty
                          if (index > 0) {
                            document.getElementById(`otp-${index - 1}`).focus();
                            const newOtp = [...otp];
                            newOtp[index - 1] = "";
                            setOtp(newOtp);
                          }
                        }
                      }}
                      className="w-12 h-14 text-center text-lg border border-gray-300 rounded-lg focus:border-[#37BFF5] focus:ring-2 focus:ring-[#37BFF5] focus:outline-none 
                                 [appearance:textfield] 
                                 [&::-webkit-outer-spin-button]:appearance-none 
                                 [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                  ))}
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={resendCode}
                    className="text-sm text-[#37BFF5] font-medium hover:underline"
                  >
                    Resend Code Link
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <div className="relative bottom-1 rounded-bl-3xl rounded-tl-none rounded-tr-none bg-white text-white px-6 py-5 w-[279px]">
              <div className="flex justify-center">
                <Link
                  to="/login"
                  className="text-sm text-[#37BFF5] font-medium hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </div>

            <button
              type="submit"
              form="verifyform"
              disabled={otp.some((digit) => digit === "") || isSubmitting}
              className={`cursor-pointer mt-2 rounded-br-3xl w-[171px] h-[45px] font-medium transition-all duration-300 ${
                otp.some((digit) => digit === "") || isSubmitting
                  ? "bg-[#ADD8E6] text-white cursor-not-allowed opacity-60"
                  : "bg-[#37BFF5] text-white hover:bg-[#2ba9dc] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default VerificationScreen;
