import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentFile {
  incidentPicture: string;
  displayURL?: string;
}

export interface IIncidentReport {
  id: string;
  action: string;
  caseNumber: string;
  disposition: string;
  incidentStatus: string;
  incidentType: string;
  incidentFiles?: IIncidentFile[]; // Array of incident files (picture URL)
  buildingId: string;
  buildingLocation: string;
  report: string;
  uploadedBy: string;
}

export interface IncidentReportInitialState {
  incidentReports: IIncidentReport[];
}

const initialState: IncidentReportInitialState = {
  incidentReports: [],
};

export const incidentReportSlice = createSlice({
  name: "incidentReports",
  initialState,
  reducers: {
    setIncidentReport: (state, action: PayloadAction<IIncidentReport[]>) => {
      return { ...state, incidentReports: action.payload };
    },

    addIncidentReport: (state, action: PayloadAction<IIncidentReport>) => {
      state.incidentReports.push(action.payload); // Push new role directly into the array
    },

    updateIncidentReport: (state, action: PayloadAction<IIncidentReport>) => {
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
    deleteIncidentReport: (state, action: PayloadAction<string>) => {
      state.incidentReports = state.incidentReports.filter(
        (incidentReports) => incidentReports.id !== action.payload
      );
    },
  },
});

export const {
  setIncidentReport,
  addIncidentReport,
  updateIncidentReport,
  deleteIncidentReport,
} = incidentReportSlice.actions;

export const selectIncidentReports = (state: RootState) =>
  state.incidentReports.incidentReports;

export default incidentReportSlice.reducer;
