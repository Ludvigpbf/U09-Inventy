import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Statistic = () => {
  return (
    <View style={styles.container}>
      <Text>Statistic</Text>
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
