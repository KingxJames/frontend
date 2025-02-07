import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICampus {
  id: number;
  campus: string;
}

export interface CampusInitialState {
  campus: ICampus[];
}

const initialState: CampusInitialState = {
  campus: [],
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    setCampuses: (state, action: PayloadAction<ICampus[]>) => {
      state.campus = action.payload;
    },

    addCampuses: (state, action: PayloadAction<ICampus>) => {
      state.campus.push(action.payload);
    },

    updateCampuses: (state, action: PayloadAction<ICampus>) => {
      const index = state.campus.findIndex(
        (campus) => campus.id === action.payload.id
      );
      if (index !== -1) {
        state.campus[index] = { ...state.campus[index], ...action.payload };
      }
    },

    deleteCampuses: (state, action: PayloadAction<number>) => {
      state.campus = state.campus.filter((campus) => campus.id !== action.payload);
    },
  },
});

export const { setCampuses, addCampuses, updateCampuses, deleteCampuses } =
  campusSlice.actions;

export const selectCampuses = (state: RootState) => state.campuses;

export default campusSlice.reducer;
