import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default () => {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="Index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
