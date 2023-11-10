import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: any[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<any>) => {
      state.categories = [...state.categories, ...action.payload];
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories, addCategory } = categorySlice.actions;

export default categorySlice.reducer;
