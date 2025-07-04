import axios from "axios";

//  url for api request - done by vite

const api = axios.create({
    baseURL: "/api",
    
});


//  authorisation token adding to requests

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const register = async (username, email, password) => {
    try {
        if (!username || !email || !password) {
            throw new Error("All fields are required");
        }
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        const response = await api.post("/auth/register", {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Registraton error: ",error)
        throw error.response?.data?.message || "Registration failed";
    }
};



export const login = async (username, password) => {
    try {
        if (!username || !password) {
            throw new Error("Username and password are required");
        }
        const response = await api.post("/auth/login", { username, password });
        return response.data;

    } catch (error) {

        console.error("Login error",error)

        throw error.response?.data?.message || "Login failed";
    }
};


export const verifyPassword = async (password) => {
    try {
        if (!password) {
            throw new Error("Password is required");
        }
        const response = await api.post("/auth/verify-password", { password });
        return response.data.isvalid  ?? false;
    } catch (error) {
        console.error("verify pass err",error)
        throw error.response?.data?.message || "Password verification failed";
    }
};