import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../../interfaces/companyTypes";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { addItem, setItems } from "../../slices/itemSlice";

const NewList: React.FC = () => {
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState<string>("");
  const [listDescription, setListDescription] = useState<string>("");
  const [lists, setLists] = useState<any[]>([]); // State to store the retrieved lists

  const companyData: User | null = useSelector(
    (state: RootState) => state.company.data
  );

  const newList = {
    listTitle: listTitle,
    listDescription: listDescription,
    ownedBy: companyData?._id || "",
  };

  const handleSubmit = () => {
    // You can send a request to your API to create a new list here
    console.log(newList);

    axios
      .post(`${API_BASE_URL}/list/list`, newList) // Replace with your actual API endpoint
      .then((response) => {
        console.log("List created successfully:", response.data);
        dispatch(addItem(response.data));
        // You can add further logic here, e.g., clearing input fields or navigating to another screen.
        // After creating the list, you may also want to fetch the updated list of lists.
        fetchLists();
      })
      .catch((error) => {
        console.error("Error creating list:", error);
      });
  };

  const fetchLists = () => {
    axios
      .get(`${API_BASE_URL}/list/lists`, {
        params: {
          ownedBy: companyData?._id, // Replace with your actual user _id
        },
      }) // Replace with your actual API endpoint
      .then((response) => {
        setLists(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
        console.log(companyData?._id);
      });
  };

  useEffect(() => {
    // Fetch the list of lists when the component is mounted
    fetchLists();
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <View style={styles.container}>
      <Text>List Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={listTitle}
        onChangeText={(text) => setListTitle(text)}
      />
      <Text>List Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={listDescription}
        onChangeText={(text) => setListDescription(text)}
      />
      {/* Add more input fields for other list properties if needed */}
      <Button title="Create List" onPress={handleSubmit} />

      {/* Display the retrieved lists */}
      <Text>Lists:</Text>
      {lists.map((list) => (
        <Text key={list._id}>{list.listTitle}</Text>
      ))}
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
});

export default NewList;
