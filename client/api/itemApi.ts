import axios from "axios";
import { API_BASE_URL } from "./../api/authApi";

// Function to fetch items
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/items`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete multiple items
export const deleteItems = async (itemIds: string[]) => {
  try {
    console.log("Deleting items:", itemIds); // Log the itemIds being deleted
    const response = await axios.delete(`${API_BASE_URL}/item/items`, {
      data: { itemIds }, // Pass itemIds in the request body
    });
    console.log("Response data:", response.data); // Log the response data
    return response.data.deletedItems;
  } catch (error) {
    console.error("Error deleting items:", error); // Log the error
    throw error;
  }
};
