import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";
import { useSelector } from "react-redux";
import { User } from "../../../interfaces/companyTypes";
import { RootState } from "../../store";

const NewCategoryComponent = () => {
  const [newCategory, setNewCategory] = useState("");
  const companyData: User | null = useSelector(
    (state: RootState) => state.company.data
  );

  const newCategoryObject = {
    categoryTitle: newCategory,
    ownedBy: companyData?._id,
  };

  const handleAddCategory = async () => {
    console.log(newCategory);

    axios
      .post(`${API_BASE_URL}/category/newCategory`, newCategoryObject)
      .then((response) => {
        console.log("Category added successfully:", response.data);
        if (response.status >= 200 && response.status < 300) {
          setNewCategory("");
          alert(`Category: ${newCategory} added successfully`);
        } else {
          alert("Failed to add category");
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Add New Category:</Text>
      <TextInput
        style={styles.input}
        placeholder="New Category"
        value={newCategory}
        onChangeText={(text) => setNewCategory(text)}
      />
      <Button title="Add Category" onPress={handleAddCategory}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 300,
    height: 20,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default NewCategoryComponent;
