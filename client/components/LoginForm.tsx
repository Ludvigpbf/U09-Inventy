import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setToken } from "../app/authSlice";
import { loginApiCall } from "../api/authApi";

import { Link } from "expo-router";

export interface LoginFormProps {
  onLogin: (credentials: { company: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginApiCall({ company, password });
      const token = response.token;
      dispatch(setToken(token));
      // Call the onLogin function to notify the parent component of the login attempt */
      onLogin({ company, password });
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      setError("Company or password is incorrect. Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Company</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCompany}
        value={company}
        placeholder="Company"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      {error ? ( // Display error message if error state is not empty
        <Text style={styles.errorMessage}>{error}</Text>
      ) : null}
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.linksContainer}>
        {/*  <Link href="/ResetPassword">
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </Link> */}
        <Link href="/register/Account">
          <Text style={styles.forgotPassword}>Register</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  forgotPassword: {
    fontSize: 14,
    color: "blue",
    textAlign: "center",
    marginTop: 8,
  },
  linksContainer: {
    display: "flex",
    flexDirection: "row",
    width: 280,
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
  },
  errorMessage: {
    alignSelf: "center",
    width: 250,
    textAlign: "center",
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
  },
});

export default LoginForm;
