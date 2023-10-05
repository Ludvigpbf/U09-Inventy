import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="Statistic" options={{ headerShown: false }} />
    </Stack>
  );
};
