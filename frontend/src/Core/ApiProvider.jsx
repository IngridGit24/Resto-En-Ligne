import axios from "axios";

// Base API instance
const API = axios.create({
    baseURL: "http://localhost:8000/api", 
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to attach token to every request (If user is logged in)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Enhanced error handling function
const handleError = (error, method, url) => {
    console.error(`${method.toUpperCase()} request failed (${url}):`, error.response?.data || error.message);
    if (error.response?.status === 401) {
        console.warn("Unauthorized: Token may be expired or invalid.");
        localStorage.removeItem("token"); // Ensure expired tokens are cleared
        window.location.href = "/login"; // Redirect user to login
    }
    throw error;
};

// Generic GET request
export const getRequest = async (url, params = {}) => {
    try {
        const response = await API.get(url, { params });
        return response.data;
    } catch (error) {
        handleError(error, "get", url);
    }
};

// Generic POST request
export const postRequest = async (url, data = {}) => {
    try {
        const response = await API.post(url, data);
        return response.data;
    } catch (error) {
        handleError(error, "post", url);
    }
};

// Generic PUT request
export const putRequest = async (url, data = {}) => {
    try {
        const response = await API.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error, "put", url);
    }
};

// Generic DELETE request
export const deleteRequest = async (url) => {
    try {
        const response = await API.delete(url);
        return response.data;
    } catch (error) {
        handleError(error, "delete", url);
    }
};

export default API;
