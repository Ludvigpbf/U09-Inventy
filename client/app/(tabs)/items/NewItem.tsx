import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NewItem = () => {
  return (
    <View style={styles.container}>
      <Text>NewItem</Text>
    </View>
  );
};

export default NewItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
