import apiClient from "./config";

/**
 * Authentication service for user registration, login, logout
 */
export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise} Response with user data and token
   */
  async register(userData) {
    return await apiClient.post("/auth/register", userData);
  },

  /**
   * Login with email and password
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with user data and token
   */
  async login(credentials) {
    return await apiClient.post("/auth/login", credentials);
  },

  /**
   * Logout current user (clears cookie)
   * @returns {Promise} Response with success message
   */
  async logout() {
    return await apiClient.post("/auth/logout");
  },

  /**
   * Get current authenticated user
   * @returns {Promise} Response with user data
   */
  async getCurrentUser() {
    return await apiClient.get("/auth/me");
  },

  /**
   * Update user profile
   * @param {Object} userData - { name, email, phone, profilePhoto }
   * @returns {Promise} Response with updated user data
   */
  async updateProfile(userData) {
    return await apiClient.put("/auth/me", userData);
  },

  /**
   * Send OTP to phone number
   * @param {string} phoneNumber - 10-digit phone number (without +91)
   * @returns {Promise} Response with success message and expiry time
   */
  async sendOtp(phoneNumber) {
    return await apiClient.post("/auth/send-otp", { phoneNumber });
  },

  /**
   * Verify OTP and login/register
   * @param {string} phoneNumber - 10-digit phone number (without +91)
   * @param {string} otp - 4-digit OTP code
   * @param {string} name - User's name (required for registration)
   * @returns {Promise} Response with user data and token
   */
  async verifyOtp(phoneNumber, otp, name = null) {
    return await apiClient.post("/auth/verify-otp", {
      phoneNumber,
      otp,
      ...(name && { name }),
    });
  },

  /**
   * Login/Register with Google
   * @param {string} credential - Google ID token
   * @returns {Promise} Response with user data and token
   */
  async googleLogin(credential) {
    return await apiClient.post("/auth/google-login", { credential });
  },
};

export default authService;
