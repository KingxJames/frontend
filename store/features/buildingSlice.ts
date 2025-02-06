import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IBuilding {
  id: number;
  name: string;
  building_location: string;
  campus_id: number;
}

export interface BuildingInitialState {
  buildings: IBuilding[];
}

const initialState: BuildingInitialState = {
  buildings: [],
};

const buildingSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    setBuildings
    : (state, action: PayloadAction<IBuilding[]>) => {
      return { ...state, buildings
        : action.payload };
    },

    addBuildings
    : (state, action: PayloadAction<IBuilding>) => {
      state.buildings
      .push(action.payload); 
    },

    updateBuildings
    : (state, action: PayloadAction<IBuilding>) => {
      const index = state.buildings
      .findIndex(
        (buildings) => buildings.id === action.payload.id
      );
      if (index !== -1) {
        state.buildings
        [index] = { ...state.buildings
            [index], ...action.payload };
      }
    },
    deleteBuildings
    : (state, action: PayloadAction<number>) => {
      state.buildings
       = state.buildings
      .filter((buildings

      ) => buildings
      .id !== action.payload);
    },
  },
});


export const { setBuildings, addBuildings, updateBuildings, deleteBuildings} = buildingSlice.actions;
export const selectBuildings = ( state: RootState) => state.buildings;
export default buildingSlice.reducer;