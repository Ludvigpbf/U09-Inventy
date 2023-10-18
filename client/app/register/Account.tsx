import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type YourNavigatorParams = {
  Account: undefined;
  Billing: { company: string; email: string; password: string };
  // Add more screens if needed
};

type Props = StackScreenProps<YourNavigatorParams, "Account">;

const Account: React.FC<Props> = ({ navigation }) => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = () => {
    // Pass the data to the next step (Billing.js)
    navigation.navigate("Billing", {
      company,
      email,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Register Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});

export default Account;
