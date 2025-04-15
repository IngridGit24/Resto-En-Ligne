import axios from "axios";
import Cookies from "js-cookie";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Required for Laravel Sanctum authentication
});

// ✅ Fetch CSRF cookie before making authenticated requests
const getCsrfToken = async () => {
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });
    console.log("CSRF cookie successfully fetched.");
  } catch (error) {
    console.error("Failed to fetch CSRF cookie:", error);
  }
};

// Attach CSRF token & Authorization headers dynamically
api.interceptors.request.use(
  (config) => {
    const xsrfToken = Cookies.get("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// 🚨 Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 419) {
      console.warn("⚠️ CSRF token mismatch! Try refreshing the page.");
      getCsrfToken();
    }

    return Promise.reject(error);
  }
);

// ✅ Export both api and CSRF utility
export { getCsrfToken };
export default api;
