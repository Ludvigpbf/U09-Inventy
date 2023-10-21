// authApi.ts
import axios from "axios";

export const API_BASE_URL = "http://localhost:3000";

export const loginApiCall = async (credentials: {
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
    const token = response.data.token;
    console.log("Token:", token);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchCompanyInfo = async (token: string, companyId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/user/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching company information:", error);
    throw error;
  }
};
