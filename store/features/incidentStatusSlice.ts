import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentStatus {
  id: string;
  incidentStatus: string;
}

export interface IncidentStatusInitialState {
  incidentStatus: IIncidentStatus[];
}

const initialState: IncidentStatusInitialState = {
  incidentStatus: [],
};

export const incidentStatustSlice = createSlice({
  name: "incidentStatus",
  initialState,
  reducers: {
    setIncidentStatus: (state, action: PayloadAction<IIncidentStatus[]>) => {
      state.incidentStatus = action.payload;
    },

   

    addIncidentStatus: (state, action: PayloadAction<IIncidentStatus>) => {
      state.incidentStatus.push(action.payload);
    },

    updateIncidentStatus: (state, action: PayloadAction<IIncidentStatus>) => {
      const index = state.incidentStatus.findIndex(
        (incidentStatus) => incidentStatus.id === action.payload.id
      );
      if (index !== -1) {
        state.incidentStatus[index] = {
          ...state.incidentStatus[index],
          ...action.payload,
        };
      }
    },
    deleteIncidentStatus: (state, action: PayloadAction<string>) => {
      state.incidentStatus = state.incidentStatus.filter(
        (incidentStatus) => incidentStatus.id !== action.payload
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
export const selectIncidentStatus = (state: RootState) =>
  state.incidentStatus.incidentStatus;
export default incidentStatustSlice.reducer;
