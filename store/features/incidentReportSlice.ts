import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentFile {
  incidentPicture: string;
  displayURL?: string;
}

export interface IIncidentReport {
  incidentFiles?: IIncidentFile[];
}

export interface IncidentReportInitialState {
  id: string;
  action: string;
  caseNumber: string;
  disposition: string;
  incidentStatusID: string;
  incidentReportStatus: string;
  incidentType: string;
  incidentFiles: IIncidentFile[];
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
  incidentStatusID: "",
  incidentReportStatus: "",
  incidentType: "",
  incidentFiles: [],
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
    setIncidentReportState: (
      state,
      action: PayloadAction<Partial<IncidentReportInitialState>>
    ) => {
      Object.assign(state, action.payload);
    },
    setAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    setCaseNumber: (state, action: PayloadAction<string>) => {
      state.caseNumber = action.payload;
    },
    setDisposition: (state, action: PayloadAction<string>) => {
      state.disposition = action.payload;
    },
    setIncidentStatus: (state, action: PayloadAction<string>) => {
      state.incidentStatus = action.payload;
    },
    setIncidentType: (state, action: PayloadAction<string>) => {
      state.incidentType = action.payload;
    },
    setIncidentFiles: (state, action: PayloadAction<IIncidentFile[]>) => {
      state.incidentFiles = action.payload;
    },
    setBuildingId: (state, action: PayloadAction<string>) => {
      state.buildingId = action.payload;
    },
    setBuildingLocation: (state, action: PayloadAction<string>) => {
      state.buildingLocation = action.payload;
    },
    setReport: (state, action: PayloadAction<string>) => {
      state.report = action.payload;
    },
    setUploadedBy: (state, action: PayloadAction<string>) => {
      state.uploadedBy = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
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
  setIncidentFiles,
  setBuildingId,
  setBuildingLocation,
  setReport,
  setUploadedBy,
  setDate,
  setTime,
  setFormSubmitted,
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
