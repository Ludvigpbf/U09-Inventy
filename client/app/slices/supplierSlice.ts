import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Supplier } from "../../interfaces/supplierTypes";

interface SupplierState {
  suppliers: Supplier[];
}

const initialState: SupplierState = {
  suppliers: [],
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSuppliers: (state, action: PayloadAction<Supplier[]>) => {
      state.suppliers = [...state.suppliers, ...action.payload];
    },
    addSupplier: (state, action: PayloadAction<Supplier>) => {
      state.suppliers.push(action.payload);
      console.log("state.suppliers:", state.suppliers);
    },
  },
});

export const { setSuppliers, addSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
