import axios from "axios";
import { verifyPassword } from "./auth";

// Using proxy configured in vite.config.js
const API_URL = "/api";

// Create axios instance with auth header
const authAxios = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createCredential = async (credentialData, userPassword) => {
  try {
    // First verify the password
    const isValid = await verifyPassword(userPassword);
    if (!isValid) {
      throw new Error("Failed to verify password");
    }

    // If password is valid, proceed with credential creation
    const response = await authAxios.post("/credentials", {
      ...credentialData,
      userPassword,
    });

    return response.data;
  } catch (error) {
    if (error.message === "Failed to verify password") {
      throw { message: "Failed to verify password. Please try again." };
    }
    throw error.response?.data || { message: "Error creating credential" };
  } finally {
    // Clear sensitive data
    userPassword = null;
    credentialData = null;
  }
};

export const getCredentials = async () => {
  try {
    const response = await authAxios.get("/credentials");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching credentials" };
  }
};

export const getCredential = async (id, userPassword) => {
  try {
    // First verify the password
    const isValid = await verifyPassword(userPassword);
    if (!isValid) {
      throw new Error("Failed to verify password");
    }

    // If password is valid, proceed with decryption
    const response = await authAxios.post(`/credentials/${id}/decrypt`, {
      userPassword,
    });

    return response.data;
  } catch (error) {
    if (error.message === "Failed to verify password") {
      throw { message: "Failed to verify password. Please try again." };
    }
    throw error.response?.data || { message: "Error fetching credential" };
  } finally {
    // Clear sensitive data
    userPassword = null;
  }
};

export const updateCredential = async (id, credentialData, userPassword) => {
  try {
    // First verify the password
    const isValid = await verifyPassword(userPassword);
    if (!isValid) {
      throw new Error("Failed to verify password");
    }

    // If password is valid, proceed with update
    const response = await authAxios.put(`/credentials/${id}`, {
      ...credentialData,
      userPassword,
    });

    return response.data;
  } catch (error) {
    if (error.message === "Failed to verify password") {
      throw { message: "Failed to verify password. Please try again." };
    }
    throw error.response?.data || { message: "Error updating credential" };
  } finally {
    // Clear sensitive data
    userPassword = null;
    credentialData = null;
  }
};

export const deleteCredential = async (id, userPassword) => {
  try {
    // First verify the password
    const isValid = await verifyPassword(userPassword);
    if (!isValid) {
      throw new Error("Failed to verify password");
    }

    const response = await authAxios.delete(`/credentials/${id}`, {
      data: { userPassword },
    });
    return response.data;
  } catch (error) {
    if (error.message === "Failed to verify password") {
      throw { message: "Failed to verify password. Please try again." };
    }
    throw error.response?.data || { message: "Error deleting credential" };
  } finally {
    // Clear sensitive data
    userPassword = null;
  }
};
