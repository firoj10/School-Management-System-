// tokenUtils.js

// Access Token Get
// tokenUtils.js
export const getAccessToken = () => {
  return localStorage.getItem('accessToken'); // Verify the key matches where you store the token
};

// Refresh Token Get
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Tokens Save
export const setTokens = (access, refresh) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

// Tokens Remove
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Check if User is Authenticated
export const isAuthenticated = () => {
  return !!getAccessToken();
};
