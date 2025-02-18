import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentReport {
  id: number;
  action: string;
  buildingId: number;
  campusId: number;
  caseNumber: string;
  disposition: string;
  frequency: number;
  incidentFileId: number;
  incidentReoccured: string;
  incidentStatusId: number;
  incidentTypeId: string;
  location: string;
  report: string;
  uploadedBy: string;
  userId: number;
}

export interface IncidentReportState {
  incidentReports: IIncidentReport[];
}

const initialState: IncidentReportState = {
  incidentReports: [],
};

export const incidentReportSlice = createSlice({
  name: "incidentReports",
  initialState,
  reducers: {
    setIncidentReports: (state, action: PayloadAction<IIncidentReport[]>) => {
      return { ...state, incidentReports: action.payload };
    },

    addIncidentReports: (state, action: PayloadAction<IIncidentReport>) => {
      state.incidentReports.push(action.payload); // Push new role directly into the array
    },

    updateIncidentReports: (state, action: PayloadAction<IIncidentReport>) => {
      const index = state.incidentReports.findIndex(
        (incidentReport) => incidentReport.id === action.payload.id
      );
      if (index !== -1) {
        state.incidentReports[index] = {
          ...state.incidentReports[index],
          ...action.payload,
        };
      }
    },
    deleteIncidentReports: (state, action: PayloadAction<number>) => {
      state.incidentReports = state.incidentReports.filter(
        (incidentReports) => incidentReports.id !== action.payload
      );
    },
  },
});

export const {
  setIncidentReports,
  addIncidentReports,
  updateIncidentReports,
  deleteIncidentReports,
} = incidentReportSlice.actions;

export const selectIncidentReports = (state: RootState) =>
  state.incidentReports;

export default incidentReportSlice.reducer;
