import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NewPeriod = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>NewPeriod</Text>
      </View>
      <View style={styles.container}>
        <Text>History</Text>
      </View>
    </>
  );
};

export default NewPeriod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
