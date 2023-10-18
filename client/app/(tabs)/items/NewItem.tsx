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

const NewItem = () => {
  // State variables for input fields

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sku, setSKU] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [supplierOptions, setSupplierOptions] = useState<SupplierOption[]>([]);

  const unitOptions = [
    "st",
    "kg",
    "g",
    "mg",
    "l",
    "dl",
    "cl",
    "ml",
    "knippe",
    "fl",
    "dunk",
    "låda",
    "kolli",
    "säck",
    "pkt",
  ];

  const newItemData = {
    itemTitle: title,
    itemDescription: description,
    itemSKU: sku,
    itemSupplier: supplier,
    itemQuantity: quantity,
    itemUnit: unit,
    itemPrice: price,
    itemCategory: category,
    ownedBy: "650d97b2f719f5bc7e80dcd5",
  };

  // Event handler for form submission
  const handleSubmit = () => {
    // You can submit the form data to your API or perform any other actions here
    console.log(newItemData);

    axios
      .post(`${API_BASE_URL}/item/item`, newItemData)
      .then((response) => {
        console.log("Item added successfully:", response.data);
        // You can add further logic here, e.g., clearing input fields or navigating to another screen.
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  useEffect(() => {
    // Fetch category options from the API
    axios.get(`${API_BASE_URL}/category/categories`).then((response) => {
      setCategoryOptions(response.data);
    });

    // Fetch supplier options from the API
    axios.get(`${API_BASE_URL}/supplier/suppliers`).then((response) => {
      setSupplierOptions(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Text>SKU</Text>
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
              label={supplierOption.supplierName} // Adjust this based on your API response structure
              value={supplierOption._id} // Adjust this based on your API response structure
              key={supplierOption._id} // Use the 'id' property as the unique key
            />
          ))}
        </Picker>
      </View>
      <Text>Quantity</Text>
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
      <Text>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <Text>Image</Text>
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
              label={categoryOption.category} // Adjust this based on your API response structure
              value={categoryOption._id} // Adjust this based on your API response structure
              key={categoryOption._id} // Adjust this based on your API response structure
            />
          ))}
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
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

export default NewItem;
