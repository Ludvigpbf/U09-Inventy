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
import { FontAwesome } from "@expo/vector-icons";

const Account = () => {
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [departments, setDepartments] = useState<
    Array<{ department: string; manager: string }>
  >([{ department: "", manager: "" }]);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordListVisible, setPasswordListVisibility] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState<string>("");

  const validatePasswordConfirmation = (value: string) => {
    if (value !== password) {
      setPasswordConfirmationError("Passwords do not match");
    } else {
      setPasswordConfirmationError("");
    }
  };

  const togglePasswordListVisibility = () => {
    setPasswordListVisibility((prev) => !prev);
  };

  const dispatch = useDispatch();

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¤#$%^&+=!])(?!\s).{8,16}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError("Invalid password");
    } else {
      setPasswordError("");
    }
  };

  const handleNext = () => {
    validateEmail(email);
    validatePassword(password);
    validatePasswordConfirmation(passwordConfirmation);

    // If there are errors, do not proceed
    if (emailError || passwordError || passwordConfirmationError) {
      return;
    }
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
        phone: "",
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
        placeholder="Your-Company"
        placeholderTextColor="#BABABA"
        value={company}
        onChangeText={(text) => setCompany(text)}
      />
      <Text>
        Email:{" "}
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          emailError ? { borderColor: "red" } : null, // Apply red border if there's an email error
        ]}
        placeholder="yourcompany@mail.com"
        placeholderTextColor="#BABABA"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
      />

      <Text>
        <Text>
          <TouchableOpacity
            style={styles.hintIcon}
            onPress={togglePasswordListVisibility}
          >
            <FontAwesome name="question-circle-o" size={16} color="black" />
          </TouchableOpacity>{" "}
        </Text>
        Password:{" "}
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          passwordError ? { borderColor: "red" } : null, // Apply red border if there's an email error
        ]}
        placeholder="Password"
        placeholderTextColor="#BABABA"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
        }}
        secureTextEntry
      />
      <Text>
        Confirm Password:{" "}
        {passwordConfirmationError && (
          <Text style={styles.errorText}>{passwordConfirmationError}</Text>
        )}
      </Text>
      <TextInput
        style={[
          styles.input,
          passwordConfirmationError ? { borderColor: "red" } : null,
        ]}
        placeholder="Confirm Password"
        placeholderTextColor="#BABABA"
        value={passwordConfirmation}
        onChangeText={(text) => {
          setPasswordConfirmation(text);
          validatePasswordConfirmation(text);
        }}
        secureTextEntry
      />
      {isPasswordListVisible && (
        <View style={styles.passwordList}>
          <Text style={styles.passwordListTitle}>
            Password must contain at least:
          </Text>
          <Text style={styles.passwordListItem}>{"\u2022"} one digit</Text>
          <Text style={styles.passwordListItem}>
            {"\u2022"} one lowercase letter
          </Text>
          <Text style={styles.passwordListItem}>
            {"\u2022"} one uppercase letter
          </Text>
          <Text style={styles.passwordListItem}>
            {"\u2022"} one special character
          </Text>
          <Text style={styles.passwordListItem}>{"\u2022"} no whitespace</Text>
          <Text style={styles.passwordListItem}>
            {"\u2022"} and be between 8 and 16 characters long.
          </Text>
        </View>
      )}
      <Text>Departments and Managers:</Text>
      {departments.map((item, index) => (
        <View key={index} style={styles.departmentContainer}>
          <TextInput
            style={styles.departmentInput}
            placeholder="Department"
            placeholderTextColor="#BABABA"
            value={item.department}
            onChangeText={(text) => updateDepartment(text, index, false)}
          />
          <TextInput
            style={styles.departmentInput}
            placeholder="Manager"
            placeholderTextColor="#BABABA"
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
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
  passwordList: {
    position: "absolute",
    top: 180, // Adjust the position as needed
    left: "auto", // Adjust the position as needed
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  passwordListTitle: {
    fontSize: 10,
  },
  passwordListItem: { fontSize: 8 },
  errorText: {
    /*  borderWidth: 1, */

    padding: 5,
    fontSize: 10,
  },
  hintIcon: {
    fontSize: 16,
    cursor: "pointer",
  },
});

export default Account;
