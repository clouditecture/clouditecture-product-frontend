import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GradientBackground from "@/components/ui/GradientBackground";
import CloudLogo from "@/components/CloudLogo";
import AuthService from "@/services/authService";
import { FcGoogle } from "react-icons/fc";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignUp = ({ onGoogleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plan: "basic",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      agree: checked,
    }));
  };

  const handlePlanChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      plan: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Validate agree checkbox
    if (!formData.agree) {
      alert("Please agree to Terms & Conditions and Privacy Policy");
      return;
    }
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthService.signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        plan: formData.plan,
      });
      console.log("Signup response:", res);
      alert("Signup successful — redirecting to Login");
      navigate("/login");
    } catch (err) {
      console.log("Signup error:", err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const planOptions = [
    { value: "basic", label: "Basic Plan" },
    { value: "team", label: "Team Plan" },
    { value: "enterprise", label: "Enterprise Plan" },
  ];

  return (
    <GradientBackground
      gradientFrom="from-[#1B65A6]"
      gradientTo="to-[#262D61]"
      className="relative overflow-hidden min-h-screen w-full"
    >
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md">
          <Card
            className="bg-white shadow-xl rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none overflow-hidden"
            style={{ width: "450px", height: "607px" }}
          >
            <CardContent className="p-6">
              {/* Cloud Logo */}
              <div className="flex justify-center mb-4">
                <CloudLogo />
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign up</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Plan Select */}
                <div className="space-y-1">
                  <Label htmlFor="plan" className="font-medium">
                    Select Plan
                  </Label>
                  <Select onValueChange={handlePlanChange}>
                    <SelectTrigger className="w-full rounded-lg border-gray-200 px-4 py-3">
                      <SelectValue placeholder="Select your plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {planOptions.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <Label htmlFor="fullName" className="font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange("fullName")}
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange("password")}
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agree}
                    onCheckedChange={handleCheckboxChange}
                    className="border-gray-300"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-500 underline hover:text-blue-600">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-500 underline hover:text-blue-600">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full rounded-3xl bg-[#37BFF5] text-white h-[45px] mt-4"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>

                {/* Link to Login */}
                <div className="text-center pt-2">
                  <Link to="/login" className="text-blue-500 underline hover:text-blue-600">
                    Already have an account? Login
                  </Link>
                </div>
              </form>

              {/* Optional: Google Login Link if needed */}
              <div className="mt-4">
                <Link
                  to="/google-login"
                  onClick={onGoogleLogin}
                  className="block w-full py-2.5 flex items-center justify-center gap-3 border border-white text-white rounded-3xl cursor-pointer text-center"
                >
                  <FcGoogle className="w-6 h-6" />
                  Log in with Google
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GradientBackground>
  );
};

export default SignUp;
