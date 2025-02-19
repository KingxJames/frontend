import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListState {
  searchQuery: string;
}

const initialState: ListState = {
  searchQuery: "",
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = listSlice.actions;

export default listSlice.reducer;
