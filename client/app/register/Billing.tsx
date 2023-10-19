import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBillingData } from "./actions"; // Create a new action for billing data
import { RootState } from "./store"; // Import your RootState type
import { router } from "expo-router";

const Billing = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const [company, setCompany] = useState<string>("");
  const [orgNumber, setOrgNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<number | undefined>();

  const [email, setEmail] = useState<string>("");

  const handleNext = () => {
    const billingData = {
      company: company,
      orgNumber: orgNumber,
      address: address,
      email: email,
      phone: phone || 0,
    };

    // Dispatch the SET_BILLING_DATA action to update billing data
    dispatch(setBillingData(billingData));

    // You can navigate to the next screen as needed
    router.push("/register/Plan");
  };

  return (
    <View>
      <Text>2/4</Text>
      <Text>Billing</Text>
      {/* Input fields for billing data */}
      <Text>Company name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <Text>Organization number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Org Number"
        value={orgNumber}
        onChangeText={(text) => setOrgNumber(text)}
      />
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text>Phone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone !== undefined ? phone.toString() : ""}
        onChangeText={(text) => setPhone(parseInt(text) || undefined)}
        keyboardType="numeric"
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Save" onPress={handleNext} />
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Billing;
