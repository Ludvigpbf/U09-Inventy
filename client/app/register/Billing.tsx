// Billing.tsx
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type YourNavigatorParams = {
  Account: undefined;
  Billing: {
    company: string;
    email: string;
    password: string;
  };
  Plan: {
    company: string;
    email: string;
    password: string;
    orgNumber: string;
    address: string;
    phone: string;
  };
  /*   Terms: ;
  Preview: ;
 */
};

type Props = StackScreenProps<YourNavigatorParams, "Billing">;

const Billing: React.FC<Props> = ({ navigation, route }) => {
  // Get the data passed from the "Account" screen
  const { company, email, password } = route.params;

  const [orgNumber, setOrgNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = () => {
    // Pass the billing information to the next step (e.g., "Plan" component)
    navigation.navigate("Plan", {
      company,
      email,
      password,
      orgNumber,
      address,
      phone,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Billing Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Organization Number"
        value={orgNumber}
        onChangeText={(text) => setOrgNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
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

export default Billing;
