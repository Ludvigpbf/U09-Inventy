import { Stack } from "expo-router";

export default () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="Account"
          /* options={{ headerShown: false }} */
        ></Stack.Screen>
        <Stack.Screen
          name="Billing"
          /* options={{ headerShown: false }} */
        ></Stack.Screen>
        <Stack.Screen
          name="Plan"
          /* options={{ headerShown: false }} */
        ></Stack.Screen>
        <Stack.Screen
          name="Preview"
          /* options={{ headerShown: false }} */
        ></Stack.Screen>
        <Stack.Screen
          name="Terms"
          /* options={{ headerShown: false }} */
        ></Stack.Screen>
      </Stack>
    </>
  );
};
