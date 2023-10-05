import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { login } from "./../api/authApi";

export interface LoginFormProps {
  onLogin: (credentials: { company: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Logging in with credentials:", { company, password });
      // Call the login function from your API module
      const response = await login({ company, password });

      // Handle the authentication response, e.g., update UI or trigger a callback
      console.log("Login successful:", response);

      // Call the onLogin function to notify the parent component of the login attempt
      onLogin({ company, password });
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => console.log("Forgot password?")}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
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
});

export default LoginForm;
