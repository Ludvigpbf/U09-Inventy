import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="MyItems" options={{ headerShown: false }} />
      <Stack.Screen name="NewItem" options={{ headerShown: false }} />
      <Stack.Screen name="UpdateItem/:id" options={{ headerShown: false }} />
    </Stack>
  );
};
