// authApi.ts
import axios from "axios";
import { login as loginAction } from "../app/actions"; // Import the login action from your Redux store

export const API_BASE_URL = "http://localhost:3000";

export const login = async (credentials: {
  company: string;
  password: string;
}) => {
  try {
    console.log("Sending login request with credentials:", credentials);
    const response = await axios.post(
      `${API_BASE_URL}/auth/login/`,
      credentials
    );
    console.log("Login response:", response.data);
    loginAction(response.data); // Dispatch the login action with user data
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
