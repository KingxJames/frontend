import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store";

interface ListState {
    searchQuery: string;
  }
  
  const initialState: ListState = {
    searchQuery: "",
  };
  
  const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
      setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;
      },
    },
  });
  
  export const {  setSearchQuery } = listSlice.actions;
  
  export default listSlice.reducer;