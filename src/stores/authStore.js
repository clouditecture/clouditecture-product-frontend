// stores/authStore.js
import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  // Login state
  loginForm: {
    email: "",
    password: "",
    rememberMe: false,
  },
  
  // Signup state
  signupForm: {
    plan: "basic",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  },
  isSubmitting: false,
  
  // Verification state
  verificationCode: ["", "", "", "", "", ""],
  isVerifying: false,
  
  // Reset password state
  resetForm: {
    otp: ["", "", "", "", "", ""],
    password: "",
    confirmPassword: "",
  },
  
  // Forgot password state
  forgotEmail: "",
  isSendingOTP: false,
  
  // Actions for Login
  updateLoginForm: (field, value) => set((state) => ({
    loginForm: {
      ...state.loginForm,
      [field]: value
    }
  })),
  
  resetLoginForm: () => set({
    loginForm: {
      email: "",
      password: "", 
      rememberMe: false,
    }
  }),
  
  // Actions for Signup
  updateSignupForm: (field, value) => set((state) => ({
    signupForm: {
      ...state.signupForm,
      [field]: value
    }
  })),
  
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  
  resetSignupForm: () => set({
    signupForm: {
      plan: "basic",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    isSubmitting: false
  }),
  
  // Actions for Verification
  updateVerificationCode: (index, value) => set((state) => {
    const newCode = [...state.verificationCode];
    newCode[index] = value;
    return { verificationCode: newCode };
  }),
  
  setVerificationCode: (code) => set({ verificationCode: code }),
  
  setIsVerifying: (isVerifying) => set({ isVerifying }),
  
  resetVerification: () => set({
    verificationCode: ["", "", "", "", "", ""],
    isVerifying: false
  }),
  
  // Actions for Reset Password
  updateResetOTP: (index, value) => set((state) => {
    const newOtp = [...state.resetForm.otp];
    newOtp[index] = value;
    return {
      resetForm: {
        ...state.resetForm,
        otp: newOtp
      }
    };
  }),
  
  setResetOTP: (otp) => set((state) => ({
    resetForm: {
      ...state.resetForm,
      otp
    }
  })),
  
  updateResetPassword: (field, value) => set((state) => ({
    resetForm: {
      ...state.resetForm,
      [field]: value
    }
  })),
  
  resetResetForm: () => set({
    resetForm: {
      otp: ["", "", "", "", "", ""],
      password: "",
      confirmPassword: "",
    }
  }),
  
  // Actions for Forgot Password
  setForgotEmail: (email) => set({ forgotEmail: email }),
  
  setIsSendingOTP: (isSending) => set({ isSendingOTP: isSending }),
  
  resetForgotForm: () => set({
    forgotEmail: "",
    isSendingOTP: false
  }),
  
  // Computed values (getters)
  getIsSignupFormValid: () => {
    const { signupForm } = get();
    return signupForm.plan && 
           signupForm.fullName && 
           signupForm.email && 
           signupForm.password && 
           signupForm.confirmPassword && 
           signupForm.agree;
  },
  
  getIsVerificationComplete: () => {
    const { verificationCode } = get();
    return verificationCode.every(digit => digit !== "");
  },
  
  getIsResetFormValid: () => {
    const { resetForm } = get();
    const isOtpComplete = resetForm.otp.every(digit => digit !== "");
    return isOtpComplete && resetForm.password && resetForm.confirmPassword;
  }
}))

export default useAuthStore