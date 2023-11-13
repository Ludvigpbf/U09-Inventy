// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { User } from "../interfaces/companyTypes";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import supplierReducer from "./slices/supplierSlice";
import itemReducer from "./slices/itemSlice";
import categoryReducer from "./slices/categorySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export interface CompanyState {
  data: User | null;
  // Other properties
}

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    company: companyReducer,
    supplier: supplierReducer,
    item: itemReducer,
    category: categoryReducer,
  },
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
