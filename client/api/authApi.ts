import axios from "axios";

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
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
