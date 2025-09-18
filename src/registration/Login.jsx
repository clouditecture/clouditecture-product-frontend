import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import GradientBackground from "@/components/ui/GradientBackground";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc"; // install react-icons if needed
import { Link } from "react-router-dom"; // for routing
// import CloudImg from "../Logo/PNG_Screen/logo.png.png";  
import CloudLogo from "../components/CloudLogo";
// frontend\src\Logo\PNG_Screen\logo.png.png
import AuthService from "@/services/authService";
const Login = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onGoogleLogin,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRememberMeChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit?.(formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
await AuthService.login({ 
  email: formData.email, 
  password: formData.password, 
  remember: formData.rememberMe 
});      alert("Login OK — check console for current user");
      console.log("current user:", AuthService.getCurrentUser());
      // navigate somewhere protected (not implemented here)
    } catch (err) {
      alert(err.message || "Login failed");
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
          {/* Main Login Card */}
          <Card className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none overflow-hidden">
            <CardContent className="p-6">
              {/* Cloud Icon */}
              <div className="flex justify-center mb-4">
  <CloudLogo />
</div>

              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Login</h1>
                <p className="text-black text-sm font-medium">
  Enter your Email and Password to Login
</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-login-text font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@email.com"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    className="border-gray-200 rounded-lg px-4 py-3 text-login-text placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-login-text font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      className="border-gray-200 rounded-lg px-4 py-3 pr-6 text-login-text placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={handleRememberMeChange}
                      className="border-gray-300"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-login-text cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link  to="/forgot"
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-[#37BFF5] font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Custom Buttons */}
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

          {/* Sign Up Section */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 border-t border-white/30" />
              <span className="mx-4 text-white font-medium text-sm">
                Or Sign up Here
              </span>
              <div className="flex-1 border-t border-white/30" />
            </div>

            <div className="space-y-3">
              {/* Use Link for routing */}
              <Link
                to="/signup"
                onClick={onSignUp}
                className="block w-full py-3 bg-[#37BFF5] text-white rounded-3xl cursor-pointer text-center"
              >
                Sign up
              </Link>

              <Link
                to="/google-login"
                onClick={onGoogleLogin}
                className="block w-full py-2.5 flex items-center justify-center gap-3 border border-white text-white rounded-3xl cursor-pointer text-center"
              >
                <FcGoogle className="w-6 h-6" />
                Log in with Google
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default Login;
