import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentType {
  id: string;
  type: string;
}

export interface IncidentTypeInitialState {
  incidentTypes: IIncidentType[];
}

const initialState: IncidentTypeInitialState = {
  incidentTypes: [],
};

export const incidnetTypesSlice = createSlice({
  name: "incidentTypes",
  initialState,
  reducers: {
    setIncidentType: (state, action: PayloadAction<IIncidentType[]>) => {
      return { ...state, incidentTypes: action.payload };
    },

    addIncidentType: (state, action: PayloadAction<IIncidentType>) => {
      state.incidentTypes.push(action.payload);
    },

    updateIncidentType: (state, action: PayloadAction<IIncidentType>) => {
      const index = state.incidentTypes.findIndex(
        (incidentTypes) => incidentTypes.id === action.payload.id
      );
      if (index !== -1) {
        state.incidentTypes[index] = {
          ...state.incidentTypes[index],
          ...action.payload,
        };
      }
    },
    deleteIncidentType: (state, action: PayloadAction<string>) => {
      state.incidentTypes = state.incidentTypes.filter(
        (incidentTypes) => incidentTypes.id !== action.payload
      );
    },
  },
});

export const {
  setIncidentType,
  addIncidentType,
  updateIncidentType,
  deleteIncidentType,
} = incidnetTypesSlice.actions;
export const selectIncidentTypes = (state: RootState) =>
  state.incidentTypes.incidentTypes;
export default incidnetTypesSlice.reducer;
