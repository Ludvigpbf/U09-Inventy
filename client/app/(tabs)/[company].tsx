import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";

const Dashboard = () => {
  const { company } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>{company}'s Dashboard</Text>
      <View style={styles.btnsContainer}>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
        <Link href="/period/lists/NewList" style={styles.btn}>
          New List
        </Link>
      </View>
      <View style={styles.container2}>
        <Text>Some Information</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, iusto!
        </Text>
      </View>
      <View style={styles.container4}>
        <View style={styles.container3}>
          <Text>Some Information</Text>
          <Text></Text>
        </View>
        <View style={styles.container3}>
          <Text>Some Information</Text>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 330,
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
  },
  container2: {
    backgroundColor: "#D9D9D9",
    width: 330,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  container3: {
    backgroundColor: "#D9D9D9",
    width: 150,
    borderRadius: 10,

    padding: 10,
  },
  container4: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 330,
    marginTop: 20,
  },
});
