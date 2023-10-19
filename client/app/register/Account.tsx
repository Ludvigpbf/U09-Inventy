import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { setUserData } from "./actions";
import { useDispatch } from "react-redux";

const Account = () => {
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [departments, setDepartments] = useState<
    Array<{ department: string; manager: string }>
  >([{ department: "", manager: "" }]);

  const dispatch = useDispatch();

  const handleNext = () => {
    // Create an object to store the user's information
    const userData = {
      company: company,
      email: email,
      password: password,
      plan: "",
      billing: {
        company: "",
        orgNumber: "",
        address: "",
        email: "",
        phone: 0,
      },
      departments: departments,
    };
    console.log(userData);
    dispatch(setUserData(userData));

    // You can store this userData in your app's state, context, or send it to the "Billing" screen as needed
    // For now, we'll just navigate to the "Billing" screen
    router.push("/register/Billing");
  };

  const addDepartment = () => {
    // Add a new empty department and manager field when the user clicks "+"
    setDepartments([...departments, { department: "", manager: "" }]);
  };

  const updateDepartment = (
    text: string,
    index: number,
    isManager: boolean
  ) => {
    // Update the department or manager value based on the index
    const updatedDepartments = [...departments];
    updatedDepartments[index][isManager ? "manager" : "department"] = text;
    setDepartments(updatedDepartments);
  };

  return (
    <View style={styles.container}>
      <Text>1/4</Text>
      <Text>Register Account</Text>
      <Text>Company:</Text>
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Text>Departments and Managers:</Text>
      {departments.map((item, index) => (
        <View key={index} style={styles.departmentContainer}>
          <TextInput
            style={styles.departmentInput}
            placeholder="Department"
            value={item.department}
            onChangeText={(text) => updateDepartment(text, index, false)}
          />
          <TextInput
            style={styles.departmentInput}
            placeholder="Manager"
            value={item.manager}
            onChangeText={(text) => updateDepartment(text, index, true)}
          />
        </View>
      ))}
      <TouchableOpacity onPress={addDepartment} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  departmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  departmentInput: {
    width: 140,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  addButton: {
    backgroundColor: "blue",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default Account;
