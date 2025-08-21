import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICampus {
  id: number;
  campus: string;
}

export interface CampusInitialState {
  campuses: ICampus[];
}

const initialState: CampusInitialState = {
  campuses: [
    {
      id: 0,
      campus: "",
    },
  ],
};

export const campusSlice = createSlice({
  name: "campuses",
  initialState,
  reducers: {
    setCampuses: (state, action: PayloadAction<ICampus[]>) => {
      state.campuses = action.payload;
    },

    addCampuses: (state, action: PayloadAction<ICampus>) => {
      state.campuses.push(action.payload);
    },

    updateCampuses: (state, action: PayloadAction<ICampus>) => {
      const index = state.campuses.findIndex(
        (campuses) => campuses.id === action.payload.id
      );
      if (index !== -1) {
        state.campuses[index] = { ...state.campuses[index], ...action.payload };
      }
    },

    deleteCampuses: (state, action: PayloadAction<number>) => {
      state.campuses = state.campuses.filter(
        (campuses) => campuses.id !== action.payload
      );
    },
  },
});

export const { setCampuses, addCampuses, updateCampuses, deleteCampuses } =
  campusSlice.actions;

export const selectCampus = (state: RootState) => state.campuses;

export default campusSlice.reducer;
