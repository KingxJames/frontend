import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentFile {
  incidentPicture: string;
  displayURL?: string;
}

export interface IIncidentReport {
  incidentFiles?: IIncidentFile[]; // Array of incident files (picture URL)
}

export interface IncidentReportInitialState {
  id: string;
  action: string;
  caseNumber: string;
  disposition: string;
  incidentStatus: string;
  incidentType: string;
  incidentReports: IIncidentReport[];
  buildingId: string;
  buildingLocation: string;
  report: string;
  uploadedBy: string;
  date: string;
  time: string | null;
  formSubmitted: boolean;
}

const initialState: IncidentReportInitialState = {
  id: "",
  action: "",
  caseNumber: "",
  disposition: "",
  incidentStatus: "",
  incidentType: "",
  incidentReports: [],
  buildingId: "",
  buildingLocation: "",
  report: "",
  uploadedBy: "",
  date: "",
  time: "",
  formSubmitted: false,
};

export const incidentReportSlice = createSlice({
  name: "incidentReports",
  initialState,
  reducers: {
    setIncidentReportState: (state, action: PayloadAction<IIncidentReport>) => {
      return { ...state, ...action.payload };
    },

    setAction: (state, action: PayloadAction<string>) => {
      return { ...state, action: action.payload };
    },
    setCaseNumber: (state, action: PayloadAction<string>) => {
      return { ...state, caseNumber: action.payload };
    },
    setDisposition: (state, action: PayloadAction<string>) => {
      return { ...state, disposition: action.payload };
    },
    setIncidentStatus: (state, action: PayloadAction<string>) => {
      return { ...state, incidentStatus: action.payload };
    },
    setIncidentType: (state, action: PayloadAction<string>) => {
      return { ...state, incidentType: action.payload };
    },
    setIncidentReports: (state, action: PayloadAction<IIncidentReport[]>) => {
      return { ...state, incidentReports: action.payload };
    },
    setBuildingId: (state, action: PayloadAction<string>) => {
      return { ...state, buildingId: action.payload };
    },
    setBuildingLocation: (state, action: PayloadAction<string>) => {
      return { ...state, buildingLocation: action.payload };
    },
    setReport: (state, action: PayloadAction<string>) => {
      return { ...state, report: action.payload };
    },
    setUploadedBy: (state, action: PayloadAction<string>) => {
      return { ...state, uploadedBy: action.payload };
    },
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setTime: (state, action: PayloadAction<string>) => {
      return { ...state, time: action.payload };
    },
  },
});

export const {
  setIncidentReportState,
  setAction,
  setCaseNumber,
  setDisposition,
  setIncidentStatus,
  setIncidentType,
  setIncidentReports,
  setBuildingId,
  setBuildingLocation,
  setReport,
  setUploadedBy,
  setDate,
  setTime,
} = incidentReportSlice.actions;

export const selectIncidentReports = (state: RootState) =>
  state.incidentReports;
export const selectAction = (state: RootState) => state.incidentReports.action;
export const selectCaseNumber = (state: RootState) =>
  state.incidentReports.caseNumber;
export const selectDisposition = (state: RootState) =>
  state.incidentReports.disposition;
export const selectIncidentStatus = (state: RootState) =>
  state.incidentReports.incidentStatus;
export const selectIncidentType = (state: RootState) =>
  state.incidentReports.incidentType;
export const selectBuildingId = (state: RootState) =>
  state.incidentReports.buildingId;
export const selectBuildingLocation = (state: RootState) =>
  state.incidentReports.buildingLocation;
export const selectReport = (state: RootState) => state.incidentReports.report;
export const selectUploadedBy = (state: RootState) =>
  state.incidentReports.uploadedBy;
export const selectDate = (state: RootState) => state.incidentReports.date;
export const selectTime = (state: RootState) => state.incidentReports.time;
export const selectFormSubmitted = (state: RootState) =>
  state.incidentReports.formSubmitted;

export default incidentReportSlice.reducer;
