import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IDepartmentMembers {
  id: number;
  departmentId: number;
  userId: number;
}

export interface departmentMembersInitialState {
  departmentMembers: IDepartmentMembers[];
}

const initialState: departmentMembersInitialState = {
  departmentMembers: [],
};

const departmentMembersSlice = createSlice({
  name: "departmentMembers",
  initialState,
  reducers: {
    setDepartmentMembers: (
      state,
      action: PayloadAction<IDepartmentMembers[]>
    ) => {
      return { ...state, departmentMembers: action.payload };
    },

    addDepartmentMembers: (
      state,
      action: PayloadAction<IDepartmentMembers>
    ) => {
      state.departmentMembers.push(action.payload); // Push new role directly into the array
    },

    updateDepartmentMembers: (
      state,
      action: PayloadAction<IDepartmentMembers>
    ) => {
      const index = state.departmentMembers.findIndex(
        (departmentMember) => departmentMember.id === action.payload.id
      );
      if (index !== -1) {
        state.departmentMembers[index] = {
          ...state.departmentMembers[index],
          ...action.payload,
        };
      }
    },
    deleteDepartmentMembers: (state, action: PayloadAction<number>) => {
      state.departmentMembers = state.departmentMembers.filter(
        (departmentMembers) => departmentMembers.id !== action.payload
      );
    },
  },
});

export const {
  setDepartmentMembers,
  addDepartmentMembers,
  updateDepartmentMembers,
  deleteDepartmentMembers,
} = departmentMembersSlice.actions;


export const selectDepartmentMembers = ( state: RootState) => state.departmentMembers;
export default departmentMembersSlice.reducer