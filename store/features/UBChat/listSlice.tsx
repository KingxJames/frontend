import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store";

interface ListState {
    // users: User[];
    searchQuery: string;
  }
  
  const initialState: ListState = {
    // users: [],
    searchQuery: "",
  };
  
  const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
    //   setUsers: (state, action: PayloadAction<User[]>) => {
    //     state.users = action.payload;
    //   },
      setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;
      },
    },
  });
  
  export const { /*setUsers,*/ setSearchQuery } = listSlice.actions;
  
  export default listSlice.reducer;