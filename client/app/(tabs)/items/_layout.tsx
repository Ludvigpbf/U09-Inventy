import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="Items" options={{ headerShown: false }} />
      <Stack.Screen name="NewItem" options={{ headerShown: false }} />
    </Stack>
  );
};
