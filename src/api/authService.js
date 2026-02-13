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
};

export default authService;
