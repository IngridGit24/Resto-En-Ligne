import axios from "axios";

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

// GET request function
export const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await API.get(endpoint, { params, headers: attachToken() });
        return response.data;
    } catch (error) {
        console.error("GET request error:", error.response?.data || error.message);
        throw error;
    }
};

// POST request function
export const postRequest = async (endpoint, data, options = {}) => {
    try {
        const response = await API.post(endpoint, data, { headers: attachToken(), ...options });
        return response.data;
    } catch (error) {
        console.error("POST request error:", error.response?.data || error.message);
        throw error;
    }
};

// PUT request function (for full updates)
export const putRequest = async (endpoint, data) => {
    try {
        const response = await API.put(endpoint, data, { headers: attachToken() });
        return response.data;
    } catch (error) {
        console.error("PUT request error:", error.response?.data || error.message);
        throw error;
    }
};

// PATCH request function (for partial updates)
export const patchRequest = async (endpoint, data) => {
    try {
        const response = await API.patch(endpoint, data, { headers: attachToken() });
        return response.data;
    } catch (error) {
        console.error("PATCH request error:", error.response?.data || error.message);
        throw error;
    }
};

// DELETE request function
export const deleteRequest = async (endpoint) => {
    try {
        const response = await API.delete(endpoint, { headers: attachToken() });
        return response.data;
    } catch (error) {
        console.error("DELETE request error:", error.response?.data || error.message);
        throw error;
    }
};

export default API;