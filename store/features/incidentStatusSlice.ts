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

const incidentStatustSlice = createSlice({
  name: "incidentStatuses",
  initialState,
  reducers: {
    setIncidentStatus: (state, action: PayloadAction<IIncidentStatus[]>) => {
      return { ...state, statuses: action.payload };
    },

    addIncidentStatus: (state, action: PayloadAction<IIncidentStatus>) => {
      state.statuses.push(action.payload); 
    },

    updateIncidentStatus: (state, action: PayloadAction<IIncidentStatus>) => {
      const index = state.statuses.findIndex(
        (statuses) => statuses.id === action.payload.id
      );
      if (index !== -1) {
        state.statuses[index] = { ...state.statuses[index], ...action.payload };
      }
    },
    deleteIncidentStatus: (state, action: PayloadAction<number>) => {
      state.statuses = state.statuses.filter(
        (statuses) => statuses.id !== action.payload
      );
    },
  },
});

export const {
  setIncidentStatus,
  addIncidentStatus,
  updateIncidentStatus,
  deleteIncidentStatus,
} = incidentStatustSlice.actions;
export const selectStatus = (state: RootState) => state.incidentStatuses;
export default incidentStatustSlice.reducer;
