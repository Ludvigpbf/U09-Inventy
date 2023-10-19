import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers for your app here
  },
});

export default store;
