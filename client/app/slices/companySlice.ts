// companySlice.js
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/companyTypes";

const companySlice = createSlice({
  name: "company",
  initialState: {
    data: null as User | null,
  },
  reducers: {
    setCompanyData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCompanyData } = companySlice.actions;

export default companySlice.reducer;
