import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API URL

export const login = async (credentials: {
  company: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login/`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
