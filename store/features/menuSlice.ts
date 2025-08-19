import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IMenu {
  id: string;
  name: string;
  path: string;
  icon: string;
  order: number;
  is_active: boolean;
}

export interface IMenuInitialState {
  menu: IMenu[];
}

const initialState: IMenuInitialState = {
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuState: (state, action: PayloadAction<IMenu[]>) => {
      state.menu = action.payload;
    },
    resetMenuState: () => initialState,
  },
});

export const { setMenuState, resetMenuState } = menuSlice.actions;
export const selectMenuState = (state: RootState) => state.menu.menu;
export default menuSlice.reducer;
