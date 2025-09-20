// import React, { useState } from "react";
// import { Input } from "@/components/authComponents/input";
// import { Checkbox } from "@/components/authComponents/checkbox";
// import { Label } from "@/components/authComponents/label";
// import { Button } from "@/components/authComponents/button";
// import { Card, CardContent } from "@/components/authComponents/card";
// import GradientBackground from "@/components/authComponents/GradientBackground";
// import CloudLogo from "@/components/CloudLogo";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import AuthService from "@/services/authService";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/authComponents/select";

// const SignUp = ({ onSubmit, onGoogleLogin }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     plan: "basic",
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const planOptions = [
//     { value: "basic", label: "Basic Plan" },
//     { value: "team", label: "Team Plan" },
//     { value: "enterprise", label: "Enterprise Plan" },
//   ];

//   const handleChange = (field) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));
//   };

//   const handleCheckboxChange = (checked) => {
//     setFormData((prev) => ({
//       ...prev,
//       agree: checked,
//     }));
//   };

//   const handlePlanChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       plan: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await AuthService.signup({
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         plan: formData.plan,
//       });
//       console.log(res);
//       alert("Signup successful — you can now log in");
//       navigate("/login");
//     } catch (err) {
//       alert(err.message || "Signup failed");
//     }
//   };

//   return (
//     <GradientBackground
//       gradientFrom="from-[#1B65A6]"
//       gradientTo="to-[#262D61]"
//       className="relative overflow-hidden min-h-screen w-full"
//     >
//       <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
//         <div className="w-full max-w-md">
//           <Card
//             className="bg-white shadow-xl rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none overflow-hidden"
//             style={{ width: "450px", height: "607px" }}
//           >
//             <CardContent className="p-6">
//               {/* Cloud Logo */}
//               <div className="flex justify-center mb-4">
//                 <CloudLogo />
//               </div>

//               {/* Header */}
//               <div className="text-center mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                   Sign up
//                 </h1>
//               </div>

//               <form id="signupform" onSubmit={handleSubmit} className="space-y-4">
//                 {/* Plan Select */}
//                 <div className="space-y-1">
//                   <Label htmlFor="plan" className="font-medium">
//                     Select Plan
//                   </Label>
//                   <Select onValueChange={handlePlanChange} defaultValue={formData.plan}>
//                     <SelectTrigger className="w-full rounded-lg border-gray-200 px-4 py-3">
//                       <SelectValue placeholder="Select your plan" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {planOptions.map((plan) => (
//                         <SelectItem key={plan.value} value={plan.value}>
//                           {plan.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Full Name */}
//                 <div className="space-y-1">
//                   <Label htmlFor="fullName" className="font-medium">
//                     Full Name
//                   </Label>
//                   <Input
//                     id="fullName"
//                     type="text"
//                     placeholder="John Doe"
//                     value={formData.fullName}
//                     onChange={handleChange("fullName")}
//                     className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-1">
//                   <Label htmlFor="email" className="font-medium">
//                     Email Address
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="john@email.com"
//                     value={formData.email}
//                     onChange={handleChange("email")}
//                     className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-1">
//                   <Label htmlFor="password" className="font-medium">
//                     Password
//                   </Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleChange("password")}
//                     className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="space-y-1">
//                   <Label htmlFor="confirmPassword" className="font-medium">
//                     Confirm Password
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.confirmPassword}
//                     onChange={handleChange("confirmPassword")}
//                     className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 {/* Terms Checkbox */}
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="terms"
//                     checked={formData.agree}
//                     onCheckedChange={handleCheckboxChange}
//                     className="border-gray-300"
//                   />
//                   <Label
//                     htmlFor="terms"
//                     className="text-sm text-gray-700 cursor-pointer"
//                   >
//                     I agree to the{" "}
//                     <Link
//                       to="/terms"
//                       className="text-blue-500 underline hover:text-blue-600"
//                     >
//                       Terms & Conditions
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       to="/privacy"
//                       className="text-blue-500 underline hover:text-blue-600"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </Label>
//                 </div>

               
//               </form>

//               <div className="mt-4 ">
//                 <Link
//                   to="/login"
//                   className="text-blue-500 underline hover:text-blue-600"
//                 >
//                 Login
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex gap-4">
//             <div
//               className="relative bottom-1 rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-none bg-white text-white px-29 py-4"
//             >
             
//             </div>

//             <button
//               type="submit"
//               form="signupform"
//             //  form="loginForm"  
//               className="cursor-pointer mt-2 rounded-3xl bg-[#37BFF5] text-white w-[171px] h-[45px]"
//             >
//               Signup
//             </button>
//           </div>

//           <Link
//             to="/google-login"
//             onClick={onGoogleLogin}
//             className="block w-full py-2.5 flex items-center justify-center mt-4 gap-3 border border-white text-white rounded-3xl cursor-pointer text-center"
//           >
//             <FcGoogle className="w-6 h-6" />
//             Log in with Google
//           </Link>
//         </div>
//       </div>
//     </GradientBackground>
//   );
// };

// export default SignUp;




import React, { useState } from "react";
import { Input } from "@/components/authComponents/input";
import { Checkbox } from "@/components/authComponents/checkbox";
import { Label } from "@/components/authComponents/label";
import { Card, CardContent } from "@/components/authComponents/card";
import GradientBackground from "@/components/authComponents/GradientBackground";
import CloudLogo from "@/components/CloudLogo";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AuthService from "@/services/authService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/authComponents/select";

const SignUp = ({ onSubmit, onGoogleLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    plan: "basic",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const planOptions = [
    { value: "basic", label: "Basic Plan" },
    { value: "team", label: "Team Plan" },
    { value: "enterprise", label: "Enterprise Plan" },
  ];

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
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (!formData.agree) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await AuthService.signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        plan: formData.plan,
      });
      console.log(res);
      alert("Signup successful — you can now log in");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = 
    formData.plan && 
    formData.fullName && 
    formData.email && 
    formData.password && 
    formData.confirmPassword && 
    formData.agree;

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
            style={{ width: "450px", minHeight: "607px" }}
          >
            <CardContent className="p-6">
              {/* Cloud Logo */}
              <div className="flex justify-center mb-4">
                <CloudLogo />
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Sign up
                </h1>
                <p className="text-black text-sm font-medium">
                  Create your account
                </p>
              </div>

              <form id="signupform" onSubmit={handleSubmit} className="space-y-4">
                {/* Plan Select */}
                <div className="space-y-1">
                  <Label htmlFor="plan" className="font-medium">
                    Select Plan
                  </Label>
                  <Select onValueChange={handlePlanChange} defaultValue={formData.plan}>
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
                    disabled={isSubmitting}
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
                    placeholder="john@email.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    className="border-gray-200 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agree}
                    onCheckedChange={handleCheckboxChange}
                    className="border-gray-300 mt-0.5"
                    disabled={isSubmitting}
                  />
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
                </div>
              </form>

              <div className="mt-4">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-blue-500 underline hover:text-blue-600 text-sm"
                >
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <div className="relative bottom-1 rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-none bg-white text-white px-29 py-4">
            </div>

            <button
              type="submit"
              form="signupform"
              disabled={!isFormValid || isSubmitting}
              className={`cursor-pointer mt-2 rounded-3xl w-[171px] h-[45px] font-medium transition-all duration-300 ${
                !isFormValid || isSubmitting
                  ? "bg-[#ADD8E6] text-white cursor-not-allowed opacity-60"
                  : "bg-[#37BFF5] text-white hover:bg-[#2ba9dc] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <Link
            to="/google-login"
            onClick={onGoogleLogin}
            className="block w-full py-2.5 flex items-center justify-center mt-4 gap-3 border border-white text-white rounded-3xl cursor-pointer text-center hover:bg-white/10 transition-colors"
          >
            <FcGoogle className="w-6 h-6" />
            Sign up with Google
          </Link>
        </div>
      </div>
    </GradientBackground>
  );
};

export default SignUp;