import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IBuilding {
  id: number;
  name: string;
  location: string;
  campusId: number;
  created_at: string;
  updated_at: string;
  // campus: string;
}

export interface BuildingInitialState {
  buildings: IBuilding[];
}

const initialState: BuildingInitialState = {
  buildings: [],
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setBuilding: (state, action: PayloadAction<IBuilding[]>) => {
      return { ...state, buildings: action.payload };
    },

    addBuilding: (state, action: PayloadAction<IBuilding>) => {
      state.buildings.push(action.payload);
    },

    updateBuilding: (state, action: PayloadAction<IBuilding>) => {
      const index = state.buildings.findIndex(
        (building) => building.id === action.payload.id
      );
      if (index !== -1) {
        state.buildings[index] = {
          ...state.buildings[index],
          ...action.payload,
        };
      }
    },
    deleteBuilding: (state, action: PayloadAction<number>) => {
      state.buildings = state.buildings.filter(
        (buildings) => buildings.id !== action.payload
      );
    },
  },
});

export const { setBuilding, addBuilding, updateBuilding, deleteBuilding } =
  buildingSlice.actions;
export const selectBuildings = (state: RootState) => state.buildings.buildings;
export default buildingSlice.reducer;
