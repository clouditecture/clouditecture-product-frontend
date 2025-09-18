import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import GradientBackground from "@/components/ui/GradientBackground";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CloudLogo from "@/components/CloudLogo";
import { FaChevronLeft } from "react-icons/fa"; // changed icon
import AuthService from "@/services/authService";
import { useNavigate } from "react-router-dom";
const Forgot = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit?.(email);
  // };

  const handleRequest = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const res = await AuthService.sendOTP(email);
      alert(`OTP generated for testing. Check console (or will be returned) — OTP: ${res.otp}`);
      navigate("/verify", { state: { email } });
    } catch (err) {
      alert(err.message || "Error");
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
              {/* Back icon top-left */}
              <Link
                to="/login"
                aria-label="Go back to login"
                title="Back to login"
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
              >
                <FaChevronLeft size={20} /> {/* replaced icon */}
              </Link>

              {/* Cloud Icon */}
              <CloudLogo />

              {/* Heading */}
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-black">Enter your email</p>
              </div>

              {/* Form */}
              <form onSubmit={handleRequest} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // blue active focus state:
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 
                               focus:border-[#37BFF5] focus:ring-2 focus:ring-[#37BFF5] 
                               focus:outline-none"
                    required
                  />
                </div>

                {/* Login link on right */}
                <div className="flex justify-end">
                  <Link
                    to="/login"
                    className="text-sm text-[#37BFF5] font-medium hover:underline"
                  >
                    Login
                  </Link>
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

export default Forgot;
