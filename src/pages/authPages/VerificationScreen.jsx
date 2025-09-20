// import React, { useState } from "react";
// import GradientBackground from "@/components/authComponents/GradientBackground";
// import { Card, CardContent } from "@/components/authComponents/card";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaChevronLeft } from "react-icons/fa";
// import CloudLogo from "@/components/CloudLogo";
// import AuthService from "@/services/authService";

// const VerificationScreen = ({ onSubmit }) => {
//   const navigate = useNavigate();
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const location = useLocation();
//   const email =
//     location.state?.email || AuthService.getResetSession()?.email || "";

//   // handle typing
//   const handleChange = (value, index) => {
//     if (value.length > 1) value = value.slice(-1);
//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     if (value && index < code.length - 1) {
//       document.getElementById(`code-${index + 1}`).focus();
//     }
//   };

//   // handle backspace
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       if (code[index] === "") {
//         if (index > 0) {
//           document.getElementById(`code-${index - 1}`).focus();
//         }
//       } else {
//         const newCode = [...code];
//         newCode[index] = "";
//         setCode(newCode);
//       }
//     }
//     // press Enter anywhere triggers submit
//     if (e.key === "Enter") {
//       handleVerify(e);
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       await AuthService.verifyOTP(email, code);
//       alert("OTP verified — continue to reset password");
//       navigate("/reset", { state: { email } });
//     } catch (err) {
//       alert(err.message || "Invalid OTP");
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
//           <Card className="bg-white shadow-xl rounded-2xl rounded-bl-none overflow-hidden">
//             <CardContent className="p-6 relative">
//               {/* Back icon */}
//               <Link
//                 to="/login"
//                 aria-label="Go back to login"
//                 title="Back to login"
//                 className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
//               >
//                 <FaChevronLeft size={20} />
//               </Link>

//               {/* Logo */}
//               <CloudLogo />

//               {/* Headings */}
//               <div className="text-center mt-4 mb-6">
//                 <h2 className="text-lg font-semibold text-black">
//                   Verify your email
//                 </h2>
//                 <p className="text-sm text-gray-600">Enter 6 digit Code</p>
//               </div>

//               {/* Code Input Boxes */}
//               <form
//                 id="verificationForm"
//                 onSubmit={handleVerify}
//                 className="space-y-4"
//               >
//                 <div className="flex justify-center gap-2">
//                   {code.map((digit, index) => (
//                     <input
//                       key={index}
//                       id={`code-${index}`}
//                       type="text"
//                       inputMode="numeric"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleChange(e.target.value, index)}
//                       onKeyDown={(e) => handleKeyDown(e, index)} // backspace + enter
//                       className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-lg font-medium transition"
//                       required
//                     />
//                   ))}
//                 </div>

//                 {/* Resend link */}
//                 <div className="text-center mt-2">
//                   <button
//                     type="button"
//                     onClick={() => console.log("Resend code")}
//                     className="text-sm text-[#37BFF5] font-medium hover:underline"
//                   >
//                     Resend Code
//                   </button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>

//           <div className="flex gap-4">
//             <div className="relative bottom-1 rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-none bg-white text-white px-29 py-4"></div>

//             <button
//               type="submit"
//               form="verificationForm"
//               className="cursor-pointer mt-2 rounded-3xl bg-[#37BFF5] text-white w-[171px] h-[45px]"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </GradientBackground>
//   );
// };

// export default VerificationScreen;



import React, { useState, useRef } from "react";
import GradientBackground from "@/components/authComponents/GradientBackground";
import { Card, CardContent } from "@/components/authComponents/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import CloudLogo from "@/components/CloudLogo";
import AuthService from "@/services/authService";

const VerificationScreen = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const codeRefs = useRef([]);
  const location = useLocation();
  const email =
    location.state?.email || AuthService.getResetSession()?.email || "";

  // Handle typing in OTP boxes
  const handleChange = (value, index) => {
    // Only allow single digit and numbers only
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < code.length - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace and enter
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        codeRefs.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
    // Press Enter anywhere triggers submit
    if (e.key === "Enter") {
      handleVerify(e);
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);
    
    const newCode = Array(6).fill("");
    for (let i = 0; i < digits.length; i++) {
      newCode[i] = digits[i];
    }
    setCode(newCode);
    
    // Focus the next empty field or the last field
    const nextIndex = Math.min(digits.length, 5);
    codeRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const codeString = code.join("");
    if (codeString.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      // FIXED: Pass string instead of array
      await AuthService.verifyOTP(email, codeString);
      alert("OTP verified — continue to reset password");
      navigate("/reset", { state: { email } });
    } catch (err) {
      alert(err.message || "Invalid OTP");
      // Clear the code on error
      setCode(["", "", "", "", "", ""]);
      codeRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await AuthService.sendOTP(email);
      alert(`New OTP sent! Code: ${res.otp}`);
      setCode(["", "", "", "", "", ""]);
      codeRefs.current[0]?.focus();
    } catch (err) {
      alert(err.message || "Failed to resend code");
    }
  };

  // Check if all boxes are filled
  const isCodeComplete = code.every(digit => digit !== "");

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
                to="/forgot"
                aria-label="Go back to forgot password"
                title="Back to forgot password"
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 z-10"
              >
                <FaChevronLeft size={20} />
              </Link>

              {/* Logo */}
              <CloudLogo />

              {/* Headings */}
              <div className="text-center mt-4 mb-6">
                <h2 className="text-lg font-semibold text-black">
                  Verify your email
                </h2>
                <p className="text-sm text-gray-600 mt-1">Enter 6 digit Code</p>
                {email && (
                  <p className="text-xs text-gray-500 mt-1">
                    Code sent to {email}
                  </p>
                )}
              </div>

              {/* Code Input Boxes */}
              <form
                id="verificationForm"
                onSubmit={handleVerify}
                className="space-y-4"
              >
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (codeRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg transition-all duration-200 ${
                        digit
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 bg-white text-gray-900"
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
                      placeholder="0"
                      disabled={isVerifying}
                    />
                  ))}
                </div>

                {/* Resend link */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm text-[#37BFF5] font-medium hover:underline disabled:opacity-50"
                    disabled={isVerifying}
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <div className="relative bottom-1 rounded-bl-3xl rounded-br-3xl rounded-tl-none rounded-tr-none bg-white text-white px-29 py-4"></div>

            <button
              type="submit"
              form="verificationForm"
              disabled={!isCodeComplete || isVerifying}
              className={`cursor-pointer mt-2 rounded-3xl w-[171px] h-[45px] font-medium transition-all duration-300 ${
                !isCodeComplete || isVerifying
                  ? "bg-[#ADD8E6] text-white cursor-not-allowed opacity-60"
                  : "bg-[#37BFF5] text-white hover:bg-[#2ba9dc] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
            >
              {isVerifying ? "Verifying..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default VerificationScreen;