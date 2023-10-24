import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  fetchUsersItems,
  deleteItems,
  deleteSingleItem,
} from "../../../api/itemApi";
import { Item } from "../../../interfaces/itemInterface";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { User } from "../../../interfaces/companyTypes";
import { RootState } from "../../store";

const MyItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isItemsCheckedMenuVisible, setItemsCheckedMenuVisible] =
    useState(false);
  const [isItemMenuVisible, setItemMenuVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const companyId: User | null = useSelector(
    (state: RootState) => state.company.data
  );
  /*   const [selectedItemForEdit, setSelectedItemForEdit] = useState<string>(null); */

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const toggleItemSelection = (itemId: string) => {
    // Check if the item is already selected
    if (selectedItems.includes(itemId)) {
      // If the item is already selected, remove it
      const updatedSelectedItems = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updatedSelectedItems);
      console.log(updatedSelectedItems); // Log the updated items
      setSelectAllChecked(updatedSelectedItems.length === items.length);
    } else {
      // If the item is not selected, add it
      const updatedSelectedItems = [...selectedItems, itemId];
      setSelectedItems(updatedSelectedItems);
      console.log(updatedSelectedItems); // Log the updated items
      setSelectAllChecked(updatedSelectedItems.length === items.length);
    }
  };

  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedItems([]); // Deselect all items
    } else {
      const allItemIds = items.map((item) => item._id);
      setSelectedItems(allItemIds); // Select all items
    }
    setSelectAllChecked(!selectAllChecked); // Toggle "Select All" checkbox state
  };

  const handleDeleteItem = async (ids: string | string[]) => {
    console.log("Selected items for deletion:", selectedItems);

    const deleteItemsAndRefresh = async (itemIds: string[]) => {
      try {
        // Delete the selected items
        const deletedItems = await deleteItems(itemIds);
        console.log("Items deleted successfully:", deletedItems);

        // Fetch the updated list of items
        const updatedItems = await fetchUsersItems(companyId);
        setItems(updatedItems);
        console.log(updatedItems);
      } catch (error) {
        console.error("Error deleting or fetching items:", error);
      }
    };

    if (Array.isArray(ids)) {
      deleteItemsAndRefresh(ids);
    } else {
      // Handle single item deletion
      try {
        await deleteSingleItem(ids); // Use the deleteSingleItem function
        // Remove the deleted item from the local state
        setItems((prevItems) => prevItems.filter((item) => item._id !== ids));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.itemTitle.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleAddToList = () => {
    // Handle the add to list action here
    setItemsCheckedMenuVisible(false); // Close the menu
  };

  const fetchItemsData = async () => {
    try {
      const userItems = await fetchUsersItems(companyId);
      console.log("API Response:", userItems);
      setItems(userItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItemsData();
  }, [companyId]);

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.menuContainer}>
          <Checkbox value={selectAllChecked} onValueChange={toggleSelectAll} />
          <Text style={styles.selectAllText}>Select all</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Link href="/items/NewItem" style={styles.newItemBtn}>
          New Item
          <Ionicons name="ios-add-circle-outline" size={16} color="black" />
        </Link>
      </View>
      <FlatList
        style={styles.itemList}
        data={filteredItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.chooseContainer}>
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
              <Pressable
                onPress={() => {
                  setItemMenuVisible(true);
                  /* setSelectedItemForEdit(item._id); */
                }}
              >
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
                <Link
                  href={{
                    pathname: "/items/UpdateItem",

                    params: { selectedItemId: item._id },
                  }}
                  style={styles.modalContent}
                >
                  <Ionicons
                    name="ios-arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.modalText}>Edit item</Text>
                </Link>
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
                    size={52}
                    color="white"
                  />
                </Pressable>
              </View>
            </Modal>
          </View>
        )}
      />
      {selectedItems.length > 0 ? (
        <View style={styles.menuContainer}>
          <Pressable onPress={() => handleDeleteItem(selectedItems)}>
            <Text style={styles.dropdownBtn}>Delete</Text>
          </Pressable>
          <Pressable onPress={handleAddToList}>
            <Text style={styles.dropdownBtn}>Add to Lists</Text>
          </Pressable>
        </View>
      ) : null}
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
    margin: 5,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: 60,
  },
  itemList: {
    width: 310,
    zIndex: -1,
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
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    margin: 5,
    padding: 10,
    width: 100,
    textAlign: "center",
  },
  newItemBtn: {
    display: "flex",
    alignItems: "center",
    margin: 10,
    fontSize: 10,
  },
  topMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: 330,
    justifyContent: "space-between",
    padding: 10,
  },
  selectAllText: {
    marginLeft: 5,
    fontSize: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    width: 200,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    zIndex: 2,
  },
  suggestionText: {
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});

export default MyItems;
