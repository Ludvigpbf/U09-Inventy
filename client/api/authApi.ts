// authApi.ts
import axios from "axios";

export const API_BASE_URL = "https://inventy-api.onrender.com";

export const loginApiCall = async (credentials: {
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
