import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

const NewPeriod = () => {
  const [periodName, setPeriodName] = useState("");
  const historyTexts = ["Januari", "Februari", "Mars"];

  const handleSubmit = () => {
    // Handle the submit action here. You can use the periodName state.
    console.log("Submitted period name:", periodName);
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.containerColumn}>
        <View style={[styles.container, styles.bg, styles.newPeriodContainer]}>
          <Text>NewPeriod</Text>
          <View style={[styles.bg, styles.calenderContainer]}>
            <Text>Choose period</Text>
            <View style={[styles.bg, styles.calender]}>
              <View>
                <Text>Calender</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>Name period:</Text>
            <TextInput
              style={styles.input}
              value={periodName}
              onChangeText={(text) => setPeriodName(text)}
              placeholder="Enter period name"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerColumn}>
          <Text>History</Text>
          {historyTexts.map((text, index) => (
            <View
              key={index}
              style={[styles.containerColumn, styles.bg, styles.historyButton]}
            >
              <Text>{text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default NewPeriod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 330,
  },
  containerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bg: {
    backgroundColor: "#D9D9D9",
  },
  newPeriodContainer: {
    height: 200,
  },
  calenderContainer: {
    height: 100,

    width: 250,
    padding: 10,
  },
  calender: {
    height: 70,
    backgroundColor: "white",
  },
  input: {
    height: 25,
    width: 150,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  historyButton: {
    padding: 10,
    width: 330,
    borderRadius: 10,
  },
});
