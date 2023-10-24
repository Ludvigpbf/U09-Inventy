import axios from "axios";
import { API_BASE_URL } from "./../api/authApi";
import { User } from "./../interfaces/companyTypes";

// fetch users items

export const fetchUsersItems = async (companyId: User | null) => {
  try {
    // Fetch the user's ID from your Redux state
    const userId = companyId?._id;
    console.log("items userId:", userId);
    // Fetch items related to the user's ID
    const response = await axios.get(
      `${API_BASE_URL}/item/items?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a single item
export const deleteSingleItem = async (itemId: string) => {
  try {
    // Perform the delete operation for a single item
    const response = await axios.delete(`${API_BASE_URL}/item/item/${itemId}`);
    return response.data; // You can return the response data if needed
  } catch (error) {
    console.error("Error deleting item:", error);
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
