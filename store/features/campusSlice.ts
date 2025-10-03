import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICampus {
  id: string;
  campus: string;
}

export interface CampusInitialState {
  campus: ICampus[];
}

const initialState: CampusInitialState = {
  campus: [],
};

export const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    setCampus: (state, action: PayloadAction<ICampus[]>) => {
      return { ...state, campus: action.payload };
    },

    addCampus: (state, action: PayloadAction<ICampus>) => {
      state.campus.push(action.payload);
    },

    updateCampus: (state, action: PayloadAction<ICampus>) => {
      const index = state.campus.findIndex(
        (campus) => campus.id === action.payload.id
      );
      if (index !== -1) {
        state.campus[index] = { ...state.campus[index], ...action.payload };
      }
    },

    deleteCampus: (state, action: PayloadAction<string>) => {
      state.campus = state.campus.filter(
        (campus) => campus.id !== action.payload
      );
    },
  },
});

export const { setCampus, addCampus, updateCampus, deleteCampus } =
  campusSlice.actions;

export const selectCampus = (state: RootState) => state.campus.campus;

export default campusSlice.reducer;
