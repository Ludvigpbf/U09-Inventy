import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "./actions";

const initialState = {
  isAuthenticated: false,
  // Add other user-related state as needed
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(login, (state) => {
    state.isAuthenticated = true;
  });

  builder.addCase(logout, (state) => {
    state.isAuthenticated = false;
  });
});

export default authReducer;
