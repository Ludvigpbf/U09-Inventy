import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="MyLists"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="NewList"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};
