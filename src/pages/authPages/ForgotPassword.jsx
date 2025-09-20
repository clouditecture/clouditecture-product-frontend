import React, { useState } from "react";
import { Input } from "@/components/authComponents/input";
import GradientBackground from "@/components/authComponents/GradientBackground";
import { Label } from "@/components/authComponents/label";
import { Card, CardContent } from "@/components/authComponents/card";
import { Link } from "react-router-dom";
import CloudLogo from "@/components/CloudLogo";
import { FaChevronLeft } from "react-icons/fa";
import AuthService from "@/services/authService";
import { useNavigate } from "react-router-dom";

const Forgot = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();
    
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await AuthService.sendOTP(email);
      alert(`OTP generated for testing. Check console (or will be returned) — OTP: ${res.otp}`);
      console.log(`OTP for ${email}:`, res.otp);
      navigate("/verify", { state: { email } });
    } catch (err) {
      alert(err.message || "Error sending OTP");
    } finally {
      setIsSubmitting(false);
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
          <Card className="bg-white shadow-xl rounded-2xl rounded-bl-none rounded-br-none overflow-hidden">
            <CardContent className="p-6 relative">
              {/* Back icon top-left */}
              <Link
                to="/login"
                aria-label="Go back to login"
                title="Back to login"
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
              >
                <FaChevronLeft size={20} />
              </Link>

              {/* Cloud Icon */}
              <CloudLogo />

              {/* Heading */}
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-black mb-1">
                  Forgot Password
                </h2>
                <p className="text-sm font-medium text-gray-600">
                  Enter your email address to receive a reset code
                </p>
              </div>

              {/* Form */}
              <form id="forgotform" onSubmit={handleRequest} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 
                               focus:border-[#37BFF5] focus:ring-2 focus:ring-[#37BFF5] 
                               focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex gap-4">
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
              form="forgotform"
              disabled={!email || isSubmitting}
              className={`cursor-pointer mt-2 rounded-br-3xl w-[171px] h-[45px] font-medium transition-all duration-300 ${
                !email || isSubmitting
                  ? "bg-[#ADD8E6] text-white cursor-not-allowed opacity-60"
                  : "bg-[#37BFF5] text-white hover:bg-[#2ba9dc] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Code"}
            </button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default Forgot;