// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { User } from "../interfaces/companyTypes";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import supplierReducer from "./slices/supplierSlice";
import itemReducer from "./slices/itemSlice";
import categoryReducer from "./slices/categorySlice";

export interface CompanyState {
  data: User | null;
  // Other properties
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    supplier: supplierReducer,
    item: itemReducer,
    category: categoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
