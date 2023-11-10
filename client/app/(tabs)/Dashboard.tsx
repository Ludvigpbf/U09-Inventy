import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { User } from "../../interfaces/companyTypes";
import { Ionicons } from "@expo/vector-icons";
type Item = {
  id: number;
  content: string;
};

const Dashboard = () => {
  const companyData: User | null = useSelector(
    (state: RootState) => state.company.data
  );

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
            <Text style={styles.title}>Last Period:</Text>
            {companyData?.departments.map((department) => (
              <View key={department._id}>
                <Text>{department.department}</Text>
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
});
