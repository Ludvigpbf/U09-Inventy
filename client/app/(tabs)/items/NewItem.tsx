import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../interfaces/companyTypes";
import { RootState } from "../../store";
import NewSupplier from "./NewSupplier";
import { Category } from "../../../interfaces/categoryTypes";
import NewCategory from "./NewCategory";
import { addItem, setItems } from "../../slices/itemSlice";
import { Supplier } from "../../../interfaces/supplierTypes";
import { addSupplier } from "../../slices/supplierSlice";

const NewItem = () => {
  // State variables for input fields
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sku, setSKU] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [newUnit, setNewUnit] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");

  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [supplierOptions, setSupplierOptions] = useState<Supplier[]>([]);

  const companyData: User | null = useSelector(
    (state: RootState) => state.company.data
  );

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
    itemUnit: newUnit || unit,
    itemPrice: price,
    itemCategory: newCategory || category,
    ownedBy: companyData?._id,
  };

  const fetchSuppliers = () => {
    axios.get(`${API_BASE_URL}/supplier/suppliers`).then((response) => {
      setSupplierOptions(response.data);
      console.log(response.data);
    });
  };

  const fetchCategorys = () => {
    axios.get(`${API_BASE_URL}/category/categories`).then((response) => {
      setCategoryOptions(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    // Fetch category options from the API
    fetchCategorys();

    // Fetch supplier options from the API
    fetchSuppliers();
  }, []);

  // Event handler for form submission
  const handleSubmit = () => {
    // You can submit the form data to your API or perform any other actions here
    console.log(newItemData);

    axios
      .post(`${API_BASE_URL}/item/newItem`, newItemData)
      .then((response) => {
        console.log("Item added successfully:", response.data);
        dispatch(addItem(response.data));
        fetchSuppliers();
        fetchCategorys();
        // You can add further logic here, e.g., clearing input fields or navigating to another screen.
      })

      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>*Title</Text>
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
      <NewSupplier />
      <View style={styles.dropdownContainer}>
        <Text>Select Supplier:</Text>
        <Picker
          selectedValue={supplier}
          onValueChange={(itemValue) => setSupplier(itemValue)}
        >
          <Picker.Item label="Select supplier" value="" />
          {supplierOptions.map((supplierOption) => (
            <Picker.Item
              label={supplierOption.supplierName}
              value={supplierOption._id}
              key={supplierOption._id}
            />
          ))}
        </Picker>
      </View>

      <Text>*Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <View style={styles.dropdownContainer}>
        <Text>*Select Unit:</Text>
        <Picker
          selectedValue={unit}
          onValueChange={(itemValue) => setUnit(itemValue)}
        >
          <Picker.Item label="Select a unit" value="" />
          {unitOptions.map((unitOption) => (
            <Picker.Item
              label={unitOption}
              value={unitOption}
              key={unitOption}
            />
          ))}
        </Picker>
      </View>

      <Text>*Price</Text>
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
      <NewCategory />
      <View style={styles.dropdownContainer}>
        <Text>Select Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select category" value="" />
          {categoryOptions.map((categoryOption) => (
            <Picker.Item
              label={categoryOption.categoryTitle}
              value={categoryOption._id}
              key={categoryOption._id}
            />
          ))}
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  dropdownContainer: { width: 200, marginBottom: 10 },
});

export default NewItem;
