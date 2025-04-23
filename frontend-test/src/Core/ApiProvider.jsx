import axios from "axios";
import { toast } from "react-toastify";

// Create Axios instance
const API = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to attach auth token dynamically
const attachToken = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Function to handle token expiration
const handleTokenExpiration = (error) => {
    if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";  // Redirect to login page
    }
};

// Generic error handler
const handleRequestError = (error) => {
    console.error("Request error:", error.response?.data || error.message);
    if (error.response?.data?.message) {
        toast.error(error.response.data.message);
    } else {
        toast.error("Something went wrong. Please try again later.");
    }
    handleTokenExpiration(error);  // Check for token expiration (401)
    throw error;
};

// GET request function
export const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await API.get(endpoint, { params, headers: attachToken() });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// POST request function
export const postRequest = async (endpoint, data, options = {}) => {
    try {
        const response = await API.post(endpoint, data, { headers: attachToken(), ...options });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// PUT request function (for full updates)
export const putRequest = async (endpoint, data) => {
    try {
        const response = await API.put(endpoint, data, { headers: attachToken() });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// PATCH request function (for partial updates)
export const patchRequest = async (endpoint, data) => {
    try {
        const response = await API.patch(endpoint, data, { headers: attachToken() });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

// DELETE request function
export const deleteRequest = async (endpoint) => {
    try {
        const response = await API.delete(endpoint, { headers: attachToken() });
        return response.data;
    } catch (error) {
        handleRequestError(error);
    }
};

export default API;
