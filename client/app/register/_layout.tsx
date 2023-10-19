import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";

export default () => {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
};
