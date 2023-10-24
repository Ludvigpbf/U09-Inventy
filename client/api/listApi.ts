import axios from "axios";
import { API_BASE_URL } from "./../api/authApi";
import { User } from "./../interfaces/companyTypes";

export const fetchUserLists = async (companyId: User | null) => {
  try {
    // Fetch the user's ID from your Redux state
    const userId = companyId?._id;
    console.log("list userId:", userId);
    // Fetch lists related to the user's ID (replace 'lists' with the actual API endpoint for fetching lists)
    const response = await axios.get(
      `${API_BASE_URL}/list/lists?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
