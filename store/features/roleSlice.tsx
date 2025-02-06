import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IRole {
  id: number;
  roles: string;
  description: string;
}

export interface RoleInitialState {
  roles: IRole[];
}

const initialState: RoleInitialState = {
  roles: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<IRole[]>) => {
      return { ...state, roles: action.payload };
    },

    addRoles: (state, action: PayloadAction<IRole>) => {
      state.roles.push(action.payload); // Push new role directly into the array
    },

    updateRoles: (state, action: PayloadAction<IRole>) => {
      const index = state.roles.findIndex(
        (role) => role.id === action.payload.id
      );
      if (index !== -1) {
        state.roles[index] = { ...state.roles[index], ...action.payload };
      }
    },
    deleteRoles: (state, action: PayloadAction<number>) => {
      state.roles = state.roles.filter((roles) => roles.id !== action.payload);
    },
  },
});

export const { setRoles, addRoles, updateRoles, deleteRoles } =
  roleSlice.actions;
export const selectRoles = (state: RootState) => state.roles;
export default roleSlice.reducer;
