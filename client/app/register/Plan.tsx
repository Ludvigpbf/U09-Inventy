import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlanData } from "./actions";
import { router } from "expo-router";
import { RootState } from "./store"; // Make sure to import RootState from your store

const Plan = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user); // Use RootState here

  const handleSelectPlan = (selectedPlan: string) => {
    dispatch(setPlanData(selectedPlan));
    router.push("/register/Preview");
  };

  return (
    <View style={styles.container}>
      <Text>3/4</Text>
      <Text style={styles.header}>Select a Plan</Text>
      <View style={styles.buttonContainer}>
        <Button title="Plan 1" onPress={() => handleSelectPlan("Plan 1")} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Plan 2" onPress={() => handleSelectPlan("Plan 2")} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Plan 3" onPress={() => handleSelectPlan("Plan 3")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  planBtn: {
    margin: 10,
  },
  buttonContainer: {
    margin: 10,
  },
});

export default Plan;
