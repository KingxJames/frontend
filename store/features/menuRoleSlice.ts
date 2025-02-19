import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IMenuRole {
  id: number;
  menu_id: string;
  role_id: string;
}

export interface MenuRoleInitialState {
  menuRoles: IMenuRole[];
}

const initialState: MenuRoleInitialState = {
  menuRoles: [],
};

export const menuRoleSlice = createSlice({
  name: "menuRoles",
  initialState,
  reducers: {
    setMenuRoles: (state, action: PayloadAction<IMenuRole[]>) => {
      return { ...state, menuRoles: action.payload };
    },

    addMenuRoles: (state, action: PayloadAction<IMenuRole>) => {
      state.menuRoles.push(action.payload); // Push new role directly into the array
    },

    updateMenuRoles: (state, action: PayloadAction<IMenuRole>) => {
      const index = state.menuRoles.findIndex(
        (menuRole) => menuRole.id === action.payload.id
      );
      if (index !== -1) {
        state.menuRoles[index] = {
          ...state.menuRoles[index],
          ...action.payload,
        };
      }
    },
    deleteMenuRoles: (state, action: PayloadAction<number>) => {
      state.menuRoles = state.menuRoles.filter(
        (menuRoles) => menuRoles.id !== action.payload
      );
    },
  },
});

export const { setMenuRoles, addMenuRoles, updateMenuRoles, deleteMenuRoles } =
  menuRoleSlice.actions;
export const selectMenuRoles = (state: RootState) => state.menuRoles;
export default menuRoleSlice.reducer;
