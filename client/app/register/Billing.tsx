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
  const [phone, setPhone] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [orgNumberError, setOrgNumberError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const validateOrgNumber = (value: string) => {
    const orgNumberRegex = /^\d{10}$/;
    if (!orgNumberRegex.test(value)) {
      setOrgNumberError("Must be a 10-digit number.");
      return;
    } else {
      setOrgNumberError("");
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const validatePhone = (value: string) => {
    const phoneRegex = /^[+]+[0-9]{8,12}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Invalid phone number");
      return;
    } else {
      setPhoneError("");
    }
  };

  const handleNext = () => {
    validateOrgNumber(orgNumber);
    validateEmail(email);
    validatePhone(phone);

    // If there are errors, do not proceed
    if (orgNumberError || emailError || phoneError) {
      return;
    }
    const billingData = {
      company: company,
      orgNumber: orgNumber,
      address: address,
      email: email,
      phone: phone,
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
        placeholder="Company AB"
        placeholderTextColor="#BABABA"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <Text>
        Organization number:{" "}
        {orgNumberError && (
          <Text style={styles.errorText}>{orgNumberError}</Text>
        )}
      </Text>
      <TextInput
        style={[styles.input, orgNumberError ? { borderColor: "red" } : null]}
        placeholder="1234567891"
        placeholderTextColor="#BABABA"
        value={orgNumber}
        onChangeText={(text) => {
          setOrgNumber(text);
          validateOrgNumber(text);
        }}
      />
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Billing street 5b"
        placeholderTextColor="#BABABA"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text>
        Phone:{" "}
        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
      </Text>
      <TextInput
        style={[styles.input, phoneError ? { borderColor: "red" } : null]}
        placeholder="+46701234567"
        placeholderTextColor="#BABABA"
        value={phone !== undefined ? phone : ""}
        onChangeText={(text) => {
          setPhone(text);
          validatePhone(text);
        }}
        keyboardType="numeric"
      />
      <Text>
        Email:{" "}
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </Text>
      <TextInput
        style={[styles.input, emailError ? { borderColor: "red" } : null]}
        placeholder="billing@mail.com"
        placeholderTextColor="#BABABA"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
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
  errorText: {
    padding: 5,
    fontSize: 10,
  },
});

export default Billing;
