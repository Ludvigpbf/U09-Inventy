// store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./registrationReducer";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState

export default store;
