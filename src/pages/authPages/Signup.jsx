import React, { useState } from "react";
import { Input } from "@/components/authComponents/input";
import { Checkbox } from "@/components/authComponents/checkbox";
import { Label } from "@/components/authComponents/label";
import { Card, CardContent } from "@/components/authComponents/card";
import GradientBackground from "@/components/authComponents/GradientBackground";
import CloudLogo from "@/components/CloudLogo";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuthStore from "@/stores/authStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/authComponents/select";

const SignUp = ({ onSubmit, onGoogleLogin }) => {
  const navigate = useNavigate();
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    signupForm,
    updateSignupForm,
    resetSignupForm,
  } = useAuthStore();

  const planOptions = [
    { value: "basic", label: "Basic Plan" },
    { value: "team", label: "Team Plan" },
    { value: "enterprise", label: "Enterprise Plan" },
  ];

  // Password validation functions
  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check if passwords match
  const passwordsMatch = signupForm.password && signupForm.confirmPassword && 
    signupForm.password === signupForm.confirmPassword;

  const passwordChecks = validatePassword(signupForm.password || '');
  const allPasswordRequirementsMet = Object.values(passwordChecks).every(check => check);

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Check if plan is selected
    if (!signupForm.plan) {
      newErrors.plan = "Please select a plan";
    }

    // Check full name
    if (!signupForm.fullName || signupForm.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Check email
    if (!signupForm.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(signupForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Check password requirements
    if (!signupForm.password) {
      newErrors.password = "Password is required";
    } else if (!allPasswordRequirementsMet) {
      newErrors.password = "Password must meet all requirements";
    }

    // Check password confirmation
    if (!signupForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check terms agreement
    if (!signupForm.agree) {
      newErrors.agree = "You must agree to the Terms & Conditions and Privacy Policy";
    }

    return newErrors;
  };

  // Check if form is valid
  const isFormValid = () => {
    return signupForm.plan && 
           signupForm.fullName && 
           signupForm.fullName.trim().length >= 2 &&
           signupForm.email && 
           isValidEmail(signupForm.email) &&
           signupForm.password && 
           allPasswordRequirementsMet &&
           passwordsMatch &&
           signupForm.agree;
  };

  const handleChange = (field) => (e) => {
    updateSignupForm(field, e.target.value);
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear password match error when either password field changes
    if ((field === 'password' || field === 'confirmPassword') && errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleCheckboxChange = (checked) => {
    updateSignupForm("agree", checked);
    
    // Clear error when checkbox is checked
    if (checked && errors.agree) {
      setErrors(prev => ({ ...prev, agree: '' }));
    }
  };

  const handlePlanChange = (value) => {
    updateSignupForm("plan", value);
    
    // Clear error when plan is selected
    if (errors.plan) {
      setErrors(prev => ({ ...prev, plan: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send signupForm to parent or your real API
      if (onSubmit) {
        await onSubmit(signupForm);
      }

      // Clear form after successful submit
      resetSignupForm();
      navigate("/login");
    } catch (error) {
      // Handle submission error
      console.error("Signup error:", error);
      setErrors({ submit: "An error occurred during signup. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GradientBackground
      gradientFrom="from-[#1B65A6]"
      gradientTo="to-[#262D61]"
      className="relative overflow-hidden min-h-screen w-full flex items-center justify-center"
    >
      <div className="w-full max-w-md p-4 my-4">
        <Card
          className="bg-white shadow-xl rounded-tl-3xl rounded-tr-3xl rounded-bl-none overflow-hidden"
          style={{ width: "450px", maxWidth: "100%" }}
        >
          <CardContent className="p-5">
            <div className="flex justify-center mb-3">
              <CloudLogo />
            </div>

            <div className="text-center mb-3">
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                Sign up
              </h1>
              <p className="text-black text-sm font-medium">
                Create your account
              </p>
            </div>

            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <form id="signupform" onSubmit={handleSubmit} className="space-y-2.5">
              <div className="space-y-1">
                <Label htmlFor="plan" className="font-medium">
                  Select Plan
                </Label>
                <Select
                  onValueChange={handlePlanChange}
                  defaultValue={signupForm.plan}
                >
                  <SelectTrigger className={`w-full rounded-lg border px-3 py-2 ${
                    errors.plan ? 'border-red-300' : 'border-gray-200'
                  }`}>
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
                {errors.plan && (
                  <p className="text-red-500 text-xs mt-1">{errors.plan}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="fullName" className="font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={signupForm.fullName}
                  onChange={handleChange("fullName")}
                  className={`rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-300' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  value={signupForm.email}
                  onChange={handleChange("email")}
                  className={`rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1 relative">
                <Label htmlFor="password" className="font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={handleChange("password")}
                    onFocus={() => setShowPasswordRequirements(true)}
                    onBlur={() => setShowPasswordRequirements(false)}
                    className={`rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.password ? 'border-red-300' : 
                      signupForm.password && !allPasswordRequirementsMet ? 'border-red-300' : 
                      signupForm.password && allPasswordRequirementsMet ? 'border-green-300' : 
                      'border-gray-200'
                    }`}
                    required
                  />
                  
                  {/* Password Requirements - Floating Overlay */}
                  {showPasswordRequirements && (
                    <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                      <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <div className={`flex items-center text-xs ${passwordChecks.length ? 'text-green-600' : 'text-gray-500'}`}>
                          <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${passwordChecks.length ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.length ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          </div>
                          At least 8 characters long
                        </div>
                        <div className={`flex items-center text-xs ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                          <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${passwordChecks.uppercase ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.uppercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          </div>
                          At least 1 uppercase letter
                        </div>
                        <div className={`flex items-center text-xs ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                          <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${passwordChecks.lowercase ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.lowercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          </div>
                          At least 1 lowercase letter
                        </div>
                        <div className={`flex items-center text-xs ${passwordChecks.digit ? 'text-green-600' : 'text-gray-500'}`}>
                          <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${passwordChecks.digit ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.digit ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          </div>
                          At least 1 digit
                        </div>
                        <div className={`flex items-center text-xs ${passwordChecks.special ? 'text-green-600' : 'text-gray-500'}`}>
                          <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${passwordChecks.special ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${passwordChecks.special ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          </div>
                          At least 1 special character
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={signupForm.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  className={`rounded-lg px-3 py-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-300' :
                    signupForm.confirmPassword && passwordsMatch ? 'border-green-300' :
                    signupForm.confirmPassword && !passwordsMatch ? 'border-red-300' :
                    'border-gray-200'
                  }`}
                  required
                />
                {signupForm.confirmPassword && !passwordsMatch && !errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
                {passwordsMatch && signupForm.confirmPassword && (
                  <p className="text-green-600 text-xs mt-1">✓ Passwords match</p>
                )}
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={signupForm.agree}
                  onCheckedChange={handleCheckboxChange}
                  className={`mt-0.5 ${errors.agree ? 'border-red-300' : 'border-gray-300'}`}
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor="terms"
                    className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                  {errors.agree && (
                    <p className="text-red-500 text-xs mt-1">{errors.agree}</p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <div className="relative bottom-1 rounded-bl-3xl rounded-tl-none rounded-tr-none bg-white text-white px-5 py-4 w-[279px]">
            <div className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#37BFF5] hover:underline">
                Log in
              </Link>
            </div>
          </div>

          <button
            type="submit"
            form="signupform"
            disabled={!isFormValid() || isSubmitting}
            className={`cursor-pointer mt-2 rounded-br-3xl text-white w-[171px] h-[42px] transition-colors text-sm font-medium ${
              isFormValid() && !isSubmitting
                ? 'bg-[#37BFF5] hover:bg-[#2ba9dc]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </div>

        <div className="mt-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="flex-1 border-t border-white/30" />
            <span className="mx-3 text-white font-medium text-sm">
              Or continue with
            </span>
            <div className="flex-1 border-t border-white/30" />
          </div>

          <Link
            to="/google-login"
            onClick={onGoogleLogin}
            className="block w-full py-2 flex items-center justify-center gap-3 border border-white text-white rounded-3xl cursor-pointer text-center hover:bg-white/10 transition-colors text-sm"
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </Link>
        </div>
      </div>
    </GradientBackground>
  );
};

export default SignUp;