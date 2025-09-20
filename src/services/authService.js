// // src/services/authService.js
// // Frontend-only fake auth service for testing UI flows.
// // WARNING: plaintext passwords in localStorage — ONLY for UI/dev testing.

// const STORAGE_USERS_KEY = "mock_users_v1";
// const STORAGE_RESET_KEY = "mock_password_reset_v1";
// const STORAGE_CURRENT_KEY = "mock_current_user_v1";

// // Hardcoded OTP used for testing (change if you want)
// const DUMMY_OTP = "1234";

// const fakeDelay = (ms = 500) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// const AuthService = {
//   // initialize seed users if none exist
//   init() {
//     const existing = localStorage.getItem(STORAGE_USERS_KEY);
//     if (!existing) {
//       const seed = [
//         {
//           id: 1,
//           fullName: "John Doe",
//           email: "john@example.com",
//           password: "123456", // plaintext — only for testing
//           plan: "basic",
//         },
//         {
//           id: 2,
//           fullName: "Jane Smith",
//           email: "jane@example.com",
//           password: "abcdef",
//           plan: "team",
//         },
//       ];
//       localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(seed));
//       console.log("[AuthService] seeded users:", seed);
//     }
//   },

//   _readUsers() {
//     const raw = localStorage.getItem(STORAGE_USERS_KEY);
//     return raw ? JSON.parse(raw) : [];
//   },

//   _writeUsers(users) {
//     localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
//   },

//   // Signup: check duplicate email, then push user
//   async signup({ fullName, email, password, plan }) {
//     await fakeDelay(600);
//     const users = this._readUsers();
//     const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
//     if (exists) {
//       return Promise.reject({ message: "Email already registered" });
//     }
//     const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
//     const user = { id, fullName, email, password, plan };
//     users.push(user);
//     this._writeUsers(users);
//     return Promise.resolve({ message: "Signup successful", user });
//   },

//   // Login: find user & password match
//   async login({ email, password, remember }) {
//     await fakeDelay(500);
//     const users = this._readUsers();
//     const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
//     if (!user || user.password !== password) {
//       return Promise.reject({ message: "Invalid credentials" });
//     }
//     // store current user (simple simulation)
//     localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify({ id: user.id, email: user.email, fullName: user.fullName }));
//     // optionally keep session / remember logic (we always store here for demo)
//     return Promise.resolve({ message: "Login successful", user });
//   },

//   // Logout
//   logout() {
//     localStorage.removeItem(STORAGE_CURRENT_KEY);
//   },

//   // Send OTP for forgot password — store OTP and email in localStorage
//   async sendOTP(email) {
//     await fakeDelay(500);
//     const users = this._readUsers();
//     const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
//     if (!user) {
//       return Promise.reject({ message: "Email not found" });
//     }
//     // Save reset session (use DUMMY_OTP)
//     const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes
//     const payload = { email: user.email, otp: DUMMY_OTP, expiresAt };
//     localStorage.setItem(STORAGE_RESET_KEY, JSON.stringify(payload));
//     console.log("[AuthService] OTP stored for", email, "OTP:", DUMMY_OTP);
//     // In real app you'd email this. For testing we show it in console.
//     return Promise.resolve({ message: "OTP sent (check console)", otp: DUMMY_OTP });
//   },

//   // Verify OTP
//   async verifyOTP(email, code) {
//     await fakeDelay(300);
//     const raw = localStorage.getItem(STORAGE_RESET_KEY);
//     if (!raw) return Promise.reject({ message: "No OTP requested" });
//     const payload = JSON.parse(raw);
//     if (payload.email.toLowerCase() !== email.toLowerCase()) {
//       return Promise.reject({ message: "OTP email mismatch" });
//     }
//     if (Date.now() > payload.expiresAt) {
//       return Promise.reject({ message: "OTP expired" });
//     }
//     if (payload.otp !== code) {
//       return Promise.reject({ message: "Invalid OTP" });
//     }
//     // mark verified (we keep payload)
//     return Promise.resolve({ message: "OTP verified" });
//   },

//   // Reset password after OTP verified (email must match stored reset)
//   async resetPassword(email, newPassword) {
//     await fakeDelay(400);
//     const raw = localStorage.getItem(STORAGE_RESET_KEY);
//     if (!raw) return Promise.reject({ message: "No reset session" });
//     const payload = JSON.parse(raw);
//     if (payload.email.toLowerCase() !== email.toLowerCase()) {
//       return Promise.reject({ message: "Email mismatch" });
//     }
//     // update user password
//     const users = this._readUsers();
//     const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
//     if (idx === -1) return Promise.reject({ message: "User not found" });
//     users[idx].password = newPassword;
//     this._writeUsers(users);
//     // clear reset token
//     localStorage.removeItem(STORAGE_RESET_KEY);
//     return Promise.resolve({ message: "Password updated" });
//   },

//   // helpers for dev
//   getAllUsers() {
//     return this._readUsers();
//   },

//   getResetSession() {
//     const raw = localStorage.getItem(STORAGE_RESET_KEY);
//     return raw ? JSON.parse(raw) : null;
//   },

//   getCurrentUser() {
//     const raw = localStorage.getItem(STORAGE_CURRENT_KEY);
//     return raw ? JSON.parse(raw) : null;
//   },
// };

// export default AuthService;



// src/services/authService.js
// Frontend-only fake auth service for testing UI flows.
// WARNING: plaintext passwords in localStorage — ONLY for UI/dev testing.

const STORAGE_USERS_KEY = "mock_users_v1";
const STORAGE_RESET_KEY = "mock_password_reset_v1";
const STORAGE_CURRENT_KEY = "mock_current_user_v1";

// Hardcoded OTP used for testing (change if you want)
const DUMMY_OTP = "123456"; // Changed to 6 digits for consistency

const fakeDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const AuthService = {
  // initialize seed users if none exist
  init() {
    const existing = localStorage.getItem(STORAGE_USERS_KEY);
    if (!existing) {
      const seed = [
        {
          id: 1,
          fullName: "John Doe",
          email: "john@example.com",
          password: "123456", // plaintext — only for testing
          plan: "basic",
        },
        {
          id: 2,
          fullName: "Jane Smith",
          email: "jane@example.com",
          password: "abcdef",
          plan: "team",
        },
      ];
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(seed));
      console.log("[AuthService] seeded users:", seed);
    }
  },

  _readUsers() {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  _writeUsers(users) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  },

  // Signup: check duplicate email, then push user
  async signup({ fullName, email, password, plan }) {
    await fakeDelay(600);
    const users = this._readUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return Promise.reject({ message: "Email already registered" });
    }
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const user = { id, fullName, email, password, plan };
    users.push(user);
    this._writeUsers(users);
    return Promise.resolve({ message: "Signup successful", user });
  },

  // Login: find user & password match
  async login({ email, password, remember }) {
    await fakeDelay(500);
    const users = this._readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return Promise.reject({ message: "Invalid credentials" });
    }
    // store current user (simple simulation)
    localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify({ 
      id: user.id, 
      email: user.email, 
      fullName: user.fullName,
      plan: user.plan 
    }));
    return Promise.resolve({ message: "Login successful", user });
  },

  // Logout
  logout() {
    localStorage.removeItem(STORAGE_CURRENT_KEY);
  },

  // Send OTP for forgot password — store OTP and email in localStorage
  async sendOTP(email) {
    await fakeDelay(500);
    const users = this._readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return Promise.reject({ message: "Email not found" });
    }
    // Save reset session (use DUMMY_OTP)
    const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes
    const payload = { email: user.email, otp: DUMMY_OTP, expiresAt };
    localStorage.setItem(STORAGE_RESET_KEY, JSON.stringify(payload));
    console.log("[AuthService] OTP stored for", email, "OTP:", DUMMY_OTP);
    // In real app you'd email this. For testing we show it in console.
    return Promise.resolve({ message: "OTP sent (check console)", otp: DUMMY_OTP });
  },

  // Verify OTP
  async verifyOTP(email, code) {
    await fakeDelay(300);
    const raw = localStorage.getItem(STORAGE_RESET_KEY);
    if (!raw) return Promise.reject({ message: "No OTP requested" });
    const payload = JSON.parse(raw);
    if (payload.email.toLowerCase() !== email.toLowerCase()) {
      return Promise.reject({ message: "OTP email mismatch" });
    }
    if (Date.now() > payload.expiresAt) {
      return Promise.reject({ message: "OTP expired" });
    }
    if (payload.otp !== code) {
      return Promise.reject({ message: "Invalid OTP" });
    }
    // mark verified (we keep payload for resetPassword)
    payload.verified = true;
    localStorage.setItem(STORAGE_RESET_KEY, JSON.stringify(payload));
    return Promise.resolve({ message: "OTP verified" });
  },

  // FIXED: Reset password after OTP verified - now accepts OTP parameter
  async resetPassword(email, newPassword, otp = null) {
    await fakeDelay(400);
    const raw = localStorage.getItem(STORAGE_RESET_KEY);
    if (!raw) return Promise.reject({ message: "No reset session" });
    const payload = JSON.parse(raw);
    if (payload.email.toLowerCase() !== email.toLowerCase()) {
      return Promise.reject({ message: "Email mismatch" });
    }
    
    // If OTP is provided, verify it (for single-step reset)
    if (otp && payload.otp !== otp) {
      return Promise.reject({ message: "Invalid OTP" });
    }
    
    // Check if OTP was previously verified (for two-step reset)
    if (!otp && !payload.verified) {
      return Promise.reject({ message: "OTP not verified" });
    }
    
    // Check expiration
    if (Date.now() > payload.expiresAt) {
      return Promise.reject({ message: "Reset session expired" });
    }
    
    // update user password
    const users = this._readUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) return Promise.reject({ message: "User not found" });
    users[idx].password = newPassword;
    this._writeUsers(users);
    // clear reset token
    localStorage.removeItem(STORAGE_RESET_KEY);
    return Promise.resolve({ message: "Password updated" });
  },

  // helpers for dev
  getAllUsers() {
    return this._readUsers();
  },

  getResetSession() {
    const raw = localStorage.getItem(STORAGE_RESET_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  // Helper to clear all test data
  clearAllData() {
    localStorage.removeItem(STORAGE_USERS_KEY);
    localStorage.removeItem(STORAGE_RESET_KEY);
    localStorage.removeItem(STORAGE_CURRENT_KEY);
    console.log("[AuthService] All test data cleared");
  },
};

export default AuthService;