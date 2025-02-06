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
  
  const campuSlice = createSlice({
    name: "campus",
    initialState,
    reducers: {
      setCampus: (state, action: PayloadAction<ICampus[]>) => {
        return { ...state, campus: action.payload };
      },
  
      addCampus: (state, action: PayloadAction<ICampus>) => {
        state.campus.push(action.payload); // Push new campu directly into the array
      },
  
      updateCampus: (state, action: PayloadAction<ICampus>) => {
        const index = state.campus.findIndex(
          (campus) => campus.id === action.payload.id
        );
        if (index !== -1) {
          state.campus[index] = { ...state.campus[index], ...action.payload };
        }
      },
      deleteCampus: (state, action: PayloadAction<number>) => {
        state.campus = state.campus.filter((campus) => campus.id !== action.payload);
      },
    },
  });
  
  export const { setCampus, addCampus, updateCampus, deleteCampus } =
    campuSlice.actions;
  export const selectcampus = (state: RootState) => state.campuses;
  export default campuSlice.reducer;
  