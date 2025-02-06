import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentType {
  id: number;
  icon: string;
  name: string;
  message: string;
}

export interface IncidentTypeInitialState {
  incidentTypes: IIncidentType[];
}

const initialState: IncidentTypeInitialState = {
  incidentTypes: [],
};

const incidnetTypesSlice = createSlice({
  name: "incidentTypes",
  initialState,
  reducers: {
    setIncidentTypes: (state, action: PayloadAction<IIncidentType[]>) => {
      return { ...state, incidentTypes: action.payload };
    },

    addIncidentTypes: (state, action: PayloadAction<IIncidentType>) => {
      state.incidentTypes.push(action.payload);
    },

    updateIncidentTypes: (state, action: PayloadAction<IIncidentType>) => {
      const index = state.incidentTypes.findIndex(
        (incidentTypes) => incidentTypes.id === action.payload.id
      );
      if (index !== -1) {
        state.incidentTypes[index] = { ...state.incidentTypes[index], ...action.payload };
      }
    },
    deleteIncidentTypes: (state, action: PayloadAction<number>) => {
      state.incidentTypes = state.incidentTypes.filter((incidentTypes) => incidentTypes.id !== action.payload);
    },
  },
});

export const { setIncidentTypes, addIncidentTypes, updateIncidentTypes, deleteIncidentTypes } =
incidnetTypesSlice.actions;
export const selectIncidentTypes = (state: RootState) => state.incidentTypes;
export default incidnetTypesSlice.reducer;
