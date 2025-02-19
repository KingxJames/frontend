import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentStatus {
  id: number;
  statuses: string;
}

export interface IncidentStatusInitialState {
  statuses: IIncidentStatus[];
}

const initialState: IncidentStatusInitialState = {
  statuses: [],
};

export const incidentStatustSlice = createSlice({
  name: "incidentStatuses",
  initialState,
  reducers: {
    setIncidentStatuses: (state, action: PayloadAction<IIncidentStatus[]>) => {
      return { ...state, statuses: action.payload };
    },

    addIncidentStatuses: (state, action: PayloadAction<IIncidentStatus>) => {
      state.statuses.push(action.payload);
    },

    updateIncidentStatuses: (state, action: PayloadAction<IIncidentStatus>) => {
      const index = state.statuses.findIndex(
        (statuses) => statuses.id === action.payload.id
      );
      if (index !== -1) {
        state.statuses[index] = { ...state.statuses[index], ...action.payload };
      }
    },
    deleteIncidentStatuses: (state, action: PayloadAction<number>) => {
      state.statuses = state.statuses.filter(
        (statuses) => statuses.id !== action.payload
      );
    },
  },
});

export const {
  setIncidentStatuses,
  addIncidentStatuses,
  updateIncidentStatuses,
  deleteIncidentStatuses,
} = incidentStatustSlice.actions;
export const selectIncidentStatuses = (state: RootState) => state.incidentStatuses;
export default incidentStatustSlice.reducer;
