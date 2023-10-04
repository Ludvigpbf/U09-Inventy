import { StatusBar } from "expo-status-bar";
import { Platform, Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import LoginForm from "../components/LoginForm";
import { login } from "./../api/authApi";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function LandingScreen() {
  const navigation = useNavigation();

  const handleLogin = async (credentials: {
    company: string;
    password: string;
  }) => {
    console.log("success");
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/inventy.png")} />
      <Text>Login</Text>
      <LoginForm onLogin={handleLogin} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
