import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
  items: any[];
}

const initialState: ItemState = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
