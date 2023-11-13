import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
/* import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"; */
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  useEffect(() => {
    if (!token) {
      router.replace(`/`);
    }
  }, [token, router]);

  return (
    /*    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */

    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>

    /*  </ThemeProvider> */
  );
}
