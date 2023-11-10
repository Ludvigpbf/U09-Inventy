import { StatusBar } from "expo-status-bar";
import { Platform, Image, StyleSheet, View, Text } from "react-native";

/* import { Text, View } from "../components/Themed"; */
import LoginForm from "../components/LoginForm";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setToken } from "./slices/authSlice";
import { setCompanyData } from "./slices/companySlice";
import { fetchCompanyInfo, loginApiCall } from "../api/authApi";
import jwtDecode from "jwt-decode";

export default function LandingScreen() {
  const dispatch = useDispatch();
  const handleLogin = async (credentials: {
    company: string;
    password: string;
  }) => {
    try {
      const response = await loginApiCall(credentials);
      const token = response.token;

      const decodedToken: { companyId: string } | undefined = jwtDecode(token);

      if (decodedToken && decodedToken.companyId) {
        const userId = decodedToken.companyId;

        dispatch(setToken(token));
        const companyInfo = await fetchCompanyInfo(token, userId);
        dispatch(setCompanyData(companyInfo));
        router.replace(`/Dashboard`);
      } else {
        console.error("Invalid token format");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
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
  link: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
    textDecorationStyle: "solid",
    cursor: "pointer",
  },
});
