import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAccessRight {
  id: number;
  description: string;
  roleId: number;
}

export interface accessRightInitialState {
  accessRights: IAccessRight[];
}

const initialState: accessRightInitialState = {
  accessRights: [],
};

const accessRightSlice = createSlice({
  name: "accessRight",
  initialState,
  reducers: {
    setAccessRights: (state, action: PayloadAction<IAccessRight[]>) => {
      return { ...state, accessRights: action.payload };
    },

    addAccessRights: (state, action: PayloadAction<IAccessRight>) => {
      state.accessRights.push(action.payload); // Push new role directly into the array
    },

    updateAccessRights: (state, action: PayloadAction<IAccessRight>) => {
      const index = state.accessRights.findIndex(
        (accessRight) => accessRight.id === action.payload.id
      );
      if (index !== -1) {
        state.accessRights[index] = {
          ...state.accessRights[index],
          ...action.payload,
        };
      }
    },
    deleteAccessRights: (state, action: PayloadAction<number>) => {
      state.accessRights = state.accessRights.filter(
        (accessRights) => accessRights.id !== action.payload
      );
    },
  },
});

export const {
  setAccessRights,
  addAccessRights,
  updateAccessRights,
  deleteAccessRights,
} = accessRightSlice.actions;
export const selectAccessRights = (state: RootState) => state.accessRights;
export default accessRightSlice.reducer;
