import axios from "axios";
import { API_BASE_URL } from "./../api/authApi";
import { User } from "./../interfaces/companyTypes";

export const fetchUserLists = async (companyId: User | null) => {
  try {
    // Fetch the user's ID from your Redux state
    const userId = companyId?._id;
    console.log("list userId:", userId);
    // Fetch lists related to the user's ID
    const response = await axios.get(`${API_BASE_URL}/list/lists`, {
      params: {
        ownedBy: userId, // Replace with your actual user _id
      },
    });
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};
