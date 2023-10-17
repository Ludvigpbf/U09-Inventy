import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";

import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";
import { Item } from "../../../interfaces/itemInterface";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isItemsCheckedMenuVisible, setItemsCheckedMenuVisible] =
    useState(false);
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [isItemMenuVisible, setItemMenuVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Assuming _id is of string type

  const toggleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      // If the item is already selected, remove it

      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteItem = (ids: string | string[]) => {
    if (Array.isArray(ids)) {
      // Handle multiple item deletions
      Promise.all(
        ids.map(
          (id) => axios.delete(`${API_BASE_URL}/item/item/${id}`).then(() => id) // Return the deleted ID on success
        )
      )
        .then((deletedIds) => {
          // Remove the deleted items from the local state
          setItems((prevItems) =>
            prevItems.filter((item) => !deletedIds.includes(item._id))
          );
        })
        .catch((error) => {
          console.error("Error deleting items:", error);
        });
    } else {
      // Handle single item deletion
      axios
        .delete(`${API_BASE_URL}/item/${ids}`)
        .then(() => {
          // Remove the deleted item from the local state
          setItems((prevItems) => prevItems.filter((item) => item._id !== ids));
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  const handleAddToList = () => {
    // Handle the add to list action here
    setItemsCheckedMenuVisible(false); // Close the menu
  };

  useEffect(() => {
    // Make an API request to fetch the items
    axios
      .get(`${API_BASE_URL}/item/items`) // Replace with your actual API endpoint
      .then((response) => {
        setItems(response.data as Item[]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {!isCheckboxChecked && (
        <View style={styles.menuContainer}>
          <Pressable onPress={() => handleDeleteItem(selectedItems)}>
            <Text>Delete</Text>
          </Pressable>
          <Pressable onPress={handleAddToList}>
            <Text>Add to Lists</Text>
          </Pressable>
        </View>
      )}
      <Text>Items screen</Text>
      <FlatList
        style={styles.itemList}
        data={items}
        keyExtractor={(item) => item._id} // Replace with the actual item ID field
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.chooseContainer}>
              {" "}
              <Checkbox
                value={selectedItems.includes(item._id)}
                onValueChange={() => toggleItemSelection(item._id)}
              />
            </View>
            <View style={styles.imageContainer}>
              <Ionicons name="ios-image-outline" size={24} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.itemTitle}</Text>
              <Text>{item.itemDescription}</Text>
            </View>
            <View style={styles.itemDataContainer}>
              <Text>{item.itemQuantity}</Text>
              <Text>{item.itemUnit}</Text>
            </View>
            <View style={styles.itemOptionsContainer}>
              <Pressable onPress={() => setItemMenuVisible(true)}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            <Modal
              visible={isItemMenuVisible}
              transparent={true}
              animationType="fade"
            >
              <View style={styles.modalContainer}>
                {/* Your menu options go here */}
                <Pressable style={styles.modalContent}>
                  <Ionicons
                    name="ios-arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.modalText}>Edit item</Text>
                </Pressable>
                <Pressable style={styles.modalContent}>
                  <Ionicons
                    name="ios-arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.modalText}>Delete item</Text>
                </Pressable>
                <Pressable onPress={() => setItemMenuVisible(false)}>
                  <Ionicons
                    style={styles.closeBtn}
                    name="ios-close-circle-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
              </View>
            </Modal>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemContainer: {
    backgroundColor: "#dfdfdf",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: 60,
  },
  itemList: {
    width: 330,
  },
  itemTitle: {
    fontWeight: "bold",
    height: 20,
  },
  itemDescription: {
    height: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  chooseContainer: {},
  imageContainer: {},
  textContainer: {
    width: 150,
  },
  itemDataContainer: {
    flex: 0.5,
    flexDirection: "row",
  },
  itemOptionsContainer: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
  },
  modalContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    display: "flex",
    alignItems: "center",

    width: 100,
    margin: 10,
    color: "white",
  },
  closeBtn: {
    margin: 10,
    bottom: -100,
  },
  menuContainer: {
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Items;
