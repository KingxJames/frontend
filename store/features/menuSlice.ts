import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IMenu {
  id: number;
  name: string;
  icon: string;
  path: string;
}

export interface IMenuInitialState {
  menus: IMenu[];
}

const initialState: IMenuInitialState = {
  menus: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<IMenu[]>) => {
      state.menus = action.payload;
    },
    addMenus: (state, action: PayloadAction<IMenu>) => {
      state.menus.push(action.payload); // Push new role directly into the array
    },

    updateMenus: (state, action: PayloadAction<IMenu>) => {
      const index = state.menus.findIndex(
        (menu) => menu.id === action.payload.id
      );
      if (index !== -1) {
        state.menus[index] = { ...state.menus[index], ...action.payload };
      }
    },
    deleteMenus: (state, action: PayloadAction<number>) => {
      state.menus = state.menus.filter((menus) => menus.id !== action.payload);
    },
  },
});

export const { setMenus, addMenus, updateMenus, deleteMenus } = menuSlice.actions;
export const selectMenus = (state: RootState) => state.menus;
export default menuSlice.reducer;
