import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { User } from "../../interfaces/companyTypes";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_BASE_URL } from "../../api/authApi";
import { Item } from "../../interfaces/itemInterface";
import { fetchUsersItems } from "../../api/itemApi";

const Dashboard = () => {
  const companyData: User | null = useSelector(
    (state: RootState) => state.company.data
  );

  const [lists, setLists] = useState<any[]>([]); // State to store the retrieved lists
  const [items, setItems] = useState<Item[]>([]);
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

  const fetchItems = async () => {
    try {
      const items = await fetchUsersItems(companyData);
      setItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (companyData) {
      fetchLists();
      fetchItems();
    }
  }, [companyData]);

  return (
    <ScrollView contentContainerStyle={styles.containerColumn}>
      <View style={styles.containerRow}>
        <Text>{companyData?.company}'s Dashboard</Text>
        <View style={styles.btnsContainer}>
          <View>
            <Link href="/period/Index" style={styles.btn}>
              <Ionicons
                name="ios-clipboard-outline"
                size={32}
                color={"white"}
              />
            </Link>
            <Text style={styles.btnText}>Periods</Text>
          </View>
          <View>
            <Link href="/lists/MyLists" style={styles.btn}>
              <Ionicons name="ios-list-outline" size={32} color="white" />
            </Link>
            <Text style={styles.btnText}>Lists</Text>
          </View>
          <View>
            <Link href="/items/MyItems" style={styles.btn}>
              <Ionicons name="ios-cube-outline" size={32} color={"white"} />
            </Link>
            <Text style={styles.btnText}>Items</Text>
          </View>
          <View>
            <Link href="/statistics/Statistic" style={styles.btn}>
              <Ionicons
                name="ios-stats-chart-outline"
                size={32}
                color={"white"}
              />
            </Link>
            <Text style={styles.btnText}>Statistics</Text>
          </View>
          <View>
            <Link href="/settings/Index" style={styles.btn}>
              {" "}
              <Ionicons name="ios-settings-outline" size={32} color={"white"} />
            </Link>
            <Text style={styles.btnText}>Settings</Text>
          </View>
        </View>
        <View style={styles.container2}>
          <Text>Email:</Text>
          <Text>{companyData?.email}</Text>
        </View>
        <View style={styles.flatlistContainer}>
          {/* <FlatList
            data={items}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.container3}>
                <Text>Some Information</Text>
                <Text>{item.content}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          /> */}
        </View>
        <View style={[styles.containerColumn, styles.background]}>
          <Link
            href="/(tabs)/statistics/Statistic"
            style={styles.containerColumn}
          >
            <Text style={styles.title}>Lists:</Text>
            {lists.map((list) => (
              <View key={list._id}>
                <Text>{list.listTitle}</Text>
              </View>
            ))}
          </Link>
        </View>
        <View style={[styles.containerColumn, styles.background]}>
          <Link
            href="/(tabs)/statistics/Statistic"
            style={styles.containerColumn}
          >
            <Text style={styles.title}>Items:</Text>
            {items.map((item) => (
              <View key={item._id}>
                <View style={styles.itemContainer}>
                  <Text>{item.itemTitle}</Text>
                  <View style={styles.itemDataContainer}>
                    <Text>{item.itemQuantity}</Text>
                    <Text>{item.itemUnit}</Text>
                  </View>
                </View>
              </View>
            ))}
          </Link>
        </View>
        <View style={[styles.containerColumn, styles.background]}>
          <Link
            href="/(tabs)/statistics/Statistic"
            style={styles.containerColumn}
          >
            <Text style={styles.title}>Departments:</Text>
            {companyData?.departments.map((department) => (
              <View key={department._id}>
                <Text>{department.department}</Text>
              </View>
            ))}
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  containerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  background: {
    backgroundColor: "#D9D9D9",
    height: 200,
    borderRadius: 10,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btnsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    height: 200,
    borderRadius: 10,
  },
  btn: {
    height: 60,
    width: 60,
    backgroundColor: "gray",
    margin: 10,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    /*  textAlignVertical: "center", */
  },
  container2: {
    backgroundColor: "#D9D9D9",
    width: 300,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  container3: {
    backgroundColor: "#D9D9D9",
    width: 200,
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginTop: 20,
    marginLeft: 30,
  },
  container4: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
  },
  flatlistContainer: {
    flexDirection: "row",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  itemDataContainer: {
    flex: 0.5,
    flexDirection: "row",
  },
});
