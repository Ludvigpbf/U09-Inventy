import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";

const MyLists = () => {
  const [lists, setLists] = useState([
    { _id: "1", listTitle: "Grocery List" },
    { _id: "2", listTitle: "To-Do List" },
    { _id: "3", listTitle: "Shopping List" },
    // Add more dummy lists as needed
  ]);

  /*  const [lists, setLists] = useState<{ _id: string; listTitle: string }[]>([]); */

  const [searchQuery, setSearchQuery] = useState("");

  const fetchLists = () => {
    axios
      .get(`${API_BASE_URL}/list/lists`)
      .then((response) => {
        setLists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
      });
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Implement your search logic here
  const filteredLists = lists.filter((list) =>
    list.listTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search lists"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <FlatList
        style={styles.listList}
        data={filteredLists}
        keyExtractor={(list) => list._id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Link href={`/lists/Details/${item._id}`}>
              <Text>{item.listTitle}</Text>
            </Link>
          </View>
        )}
      />
      <Link href="/lists/NewList" style={styles.newList}>
        New list
      </Link>
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
  searchBar: {
    width: "100%",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  listList: {
    width: 310,
  },
  listItem: {
    backgroundColor: "#dfdfdf",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: 30,
  },
  newList: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default MyLists;
