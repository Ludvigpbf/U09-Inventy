import { StatusBar } from "expo-status-bar";
import { Platform, Image, StyleSheet, View, Text } from "react-native";

/* import { Text, View } from "../components/Themed"; */
import LoginForm from "../components/LoginForm";
import { login } from "../api/authApi";
import { Link, router } from "expo-router";

export default function LandingScreen() {
  const handleLogin = async (credentials: {
    company: string;
    password: string;
  }) => {
    console.log("success");
    router.replace("/Omaka");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/inventy.png")} />
      <Text>Login</Text>
      <LoginForm onLogin={handleLogin} />
      <Link href="/Omaka" style={styles.link}>
        Login
      </Link>
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
  link: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
    textDecorationStyle: "solid",
    cursor: "pointer",
  },
});
