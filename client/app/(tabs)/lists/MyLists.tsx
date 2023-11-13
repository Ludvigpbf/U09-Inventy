import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { API_BASE_URL } from "../../../api/authApi";
import { User } from "../../../interfaces/companyTypes";
import { List } from "../../../interfaces/listInterface";
import { fetchUserLists } from "../../../api/listApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MyLists = () => {
  const [lists, setLists] = useState<List[]>([]);

  const companyId: User | null = useSelector(
    (state: RootState) => state.company.data
  );

  const [searchQuery, setSearchQuery] = useState("");

  const fetchLists = async () => {
    try {
      const response = await fetchUserLists(companyId);
      console.log("API Response:", response);
      setLists(response);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [companyId]);

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
            <Link href={`/lists/${item._id}`}>
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
