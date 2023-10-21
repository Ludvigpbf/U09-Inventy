// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import companyReducer from "./companySlice";
import { User } from "../interfaces/companyTypes";

export interface CompanyState {
  data: User | null;
  // Other properties
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
