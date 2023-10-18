import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";

interface CategoryOption {
  _id: string;
  category: string;
}

interface SupplierOption {
  _id: string;
  supplierName: string;
}
interface UpdateItemProps {
  itemId: string; // Define the type for the itemId prop
}

// Assuming you have a prop called 'itemId' to specify the item to be updated
const UpdateItem: React.FC<UpdateItemProps> = ({ itemId }) => {
  // State variables for input fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSKU] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [supplierOptions, setSupplierOptions] = useState<SupplierOption[]>([]);

  const unitOptions = ["st", "kg", "g", "ml", "l", "dl"];

  const updateItemData = {
    itemTitle: title,
    itemDescription: description,
    itemSKU: sku,
    itemSupplier: supplier,
    itemQuantity: quantity,
    itemUnit: unit,
    itemPrice: price,
    itemCategory: category,
  };

  // Event handler for form submission
  const handleUpdate = () => {
    // You can submit the updated data to your API or perform any other actions here
    axios
      .put(`${API_BASE_URL}/item/item/${itemId}`, updateItemData)
      .then((response) => {
        console.log("Item updated successfully:", response.data);
        // You can add further logic here, e.g., navigating back to the item details screen.
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  useEffect(() => {
    // Fetch the item's details from the API using 'itemId'
    axios.get(`${API_BASE_URL}/item/item/${itemId}`).then((response) => {
      const itemData = response.data;
      // Populate the input fields with item details
      setTitle(itemData.itemTitle);
      setDescription(itemData.itemDescription);
      setSKU(itemData.itemSKU);
      setSupplier(itemData.itemSupplier);
      setQuantity(itemData.itemQuantity);
      setUnit(itemData.itemUnit);
      setPrice(itemData.itemPrice);
      setImage(itemData.itemImage); // Assuming you have an item image field
      setCategory(itemData.itemCategory);
    });

    // Fetch category options from the API
    axios.get(`${API_BASE_URL}/category/categories`).then((response) => {
      setCategoryOptions(response.data);
    });

    // Fetch supplier options from the API
    axios.get(`${API_BASE_URL}/supplier/suppliers`).then((response) => {
      setSupplierOptions(response.data);
    });
  }, [itemId]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="SKU"
        value={sku}
        onChangeText={(text) => setSKU(text)}
      />
      <View style={styles.dropdownContainer}>
        <Text>Select Supplier:</Text>
        <Picker
          selectedValue={supplier}
          onValueChange={(itemValue) => setSupplier(itemValue)}
        >
          {supplierOptions.map((supplierOption) => (
            <Picker.Item
              label={supplierOption.supplierName}
              value={supplierOption._id}
              key={supplierOption._id}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <View style={styles.dropdownContainer}>
        <Text>Select Unit:</Text>
        <Picker
          selectedValue={unit}
          onValueChange={(itemValue) => setUnit(itemValue)}
        >
          {unitOptions.map((unitOption) => (
            <Picker.Item
              label={unitOption}
              value={unitOption}
              key={unitOption}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <View style={styles.dropdownContainer}>
        <Text>Select Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categoryOptions.map((categoryOption) => (
            <Picker.Item
              label={categoryOption.category}
              value={categoryOption._id}
              key={categoryOption._id}
            />
          ))}
        </Picker>
      </View>

      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  dropdownContainer: { width: 200 },
});

export default UpdateItem;
