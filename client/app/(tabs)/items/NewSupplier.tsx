import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { API_BASE_URL } from "../../../api/authApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../interfaces/companyTypes";
import { RootState } from "../../store";
import { addSupplier } from "../../slices/supplierSlice";

const NewSupplier = () => {
  const dispatch = useDispatch();
  const [newSupplier, setNewSupplier] = useState("");
  const companyData: User | null = useSelector(
    (state: RootState) => state.company.data
  );

  const newSupplierObject = {
    supplierName: newSupplier,
    ownedBy: companyData?._id,
  };

  const handleAddSupplier = async () => {
    // Replace this with your actual API call
    console.log(newSupplier);

    axios
      .post(`${API_BASE_URL}/supplier/newSupplier`, newSupplierObject)
      .then((response) => {
        console.log("Supplier added successfully:", response.data);
        if (response.status >= 200 && response.status < 300) {
          setNewSupplier("");
          dispatch(addSupplier(response.data));
          alert(`Supplier: ${newSupplier} added successfully`);
        } else {
          alert("Failed to add supplier");
        }
      })
      .catch((error) => {
        console.error("Error adding supplier:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Add New Supplier:</Text>
      <TextInput
        style={styles.input}
        placeholder="New Supplier"
        value={newSupplier}
        onChangeText={(text) => setNewSupplier(text)}
      />
      <Button title="Add Supplier" onPress={handleAddSupplier} />
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

export default NewSupplier;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
