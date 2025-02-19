import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IDepartment {
  id: number;
  departments: string;
}

export interface DepartmentInitialState {
  departments: IDepartment[];
}

const initialState: DepartmentInitialState = {
  departments: [],
};

export const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<IDepartment[]>) => {
      return { ...state, departments: action.payload };
    },

    addDepartments: (state, action: PayloadAction<IDepartment>) => {
      state.departments.push(action.payload); 
    },

    updateDepartments: (state, action: PayloadAction<IDepartment>) => {
      const index = state.departments.findIndex(
        (departments) => departments.id === action.payload.id
      );
      if (index !== -1) {
        state.departments[index] = {
          ...state.departments[index],
          ...action.payload,
        };
      }
    },
    deleteDepartments: (state, action: PayloadAction<number>) => {
      state.departments = state.departments.filter(
        (departments) => departments.id !== action.payload
      );
    },
  },
});

export const {
  setDepartments,
  addDepartments,
  updateDepartments,
  deleteDepartments,
} = departmentSlice.actions;

export const selectDepartments = ( state: RootState) => state.departments;
export default departmentSlice.reducer;