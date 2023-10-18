import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="Index"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};
