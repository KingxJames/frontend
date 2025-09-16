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
  description: string;
  caseNumber: string;
  disposition: string;
  incidentReportStatus: string;
  incidentType: string;
  incidentFiles: IIncidentFile[];
  buildingName: string;
  campus: string;
  uploadedBy: string;
  date: string;
  time: string | null;
  reportedBy: string;
  contact: string;
  witnesses: string;
  formSubmitted: boolean;
}

const initialState: IncidentReportInitialState = {
  id: "",
  action: "",
  description: "",
  caseNumber: "",
  disposition: "",
  incidentReportStatus: "",
  incidentType: "",
  incidentFiles: [],
  buildingName: "",
  campus: "",
  uploadedBy: "",
  date: "",
  time: "",
  reportedBy: "",
  contact: "",
  witnesses: "",
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
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setCaseNumber: (state, action: PayloadAction<string>) => {
      state.caseNumber = action.payload;
    },
    setDisposition: (state, action: PayloadAction<string>) => {
      state.disposition = action.payload;
    },
    setIncidentReportStatus: (state, action: PayloadAction<string>) => {
      state.incidentReportStatus = action.payload;
    },
    setIncidentType: (state, action: PayloadAction<string>) => {
      state.incidentType = action.payload;
    },
    setIncidentFiles: (state, action: PayloadAction<IIncidentFile[]>) => {
      state.incidentFiles = action.payload;
    },
    setBuildingName: (state, action: PayloadAction<string>) => {
      state.buildingName = action.payload;
    },
    setUploadedBy: (state, action: PayloadAction<string>) => {
      state.uploadedBy = action.payload;
    },
    setCampus: (state, action: PayloadAction<string>) => {
      state.campus = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setReportedBy: (state, action: PayloadAction<string>) => {
      state.reportedBy = action.payload;
    },
    setContact: (state, action: PayloadAction<string>) => {
      state.contact = action.payload;
    },
    setWitnesses: (state, action: PayloadAction<string>) => {
      state.witnesses = action.payload;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
  },
});

export const {
  setIncidentReportState,
  setAction,
  setDescription,
  setCaseNumber,
  setDisposition,
  setIncidentReportStatus,
  setIncidentType,
  setIncidentFiles,
  setBuildingName,
  setUploadedBy,
  setDate,
  setCampus,
  setTime,
  setReportedBy,
  setContact,
  setWitnesses,
  setFormSubmitted,
} = incidentReportSlice.actions;

export const selectIncidentReports = (state: RootState) =>
  state.incidentReports;
export const selectAction = (state: RootState) => state.incidentReports.action;
export const selectDescription = (state: RootState) =>
  state.incidentReports.description;
export const selectCaseNumber = (state: RootState) =>
  state.incidentReports.caseNumber;
export const selectDisposition = (state: RootState) =>
  state.incidentReports.disposition;
export const selectIncidentStatus = (state: RootState) =>
  state.incidentReports.incidentReportStatus;
export const selectIncidentType = (state: RootState) =>
  state.incidentReports.incidentType;
export const selectBuildingName = (state: RootState) =>
  state.incidentReports.buildingName;
export const selectUploadedBy = (state: RootState) =>
  state.incidentReports.uploadedBy;
export const selectCampus = (state: RootState) => state.incidentReports.campus;
export const selectDate = (state: RootState) => state.incidentReports.date;
export const selectTime = (state: RootState) => state.incidentReports.time;
export const selectFormSubmitted = (state: RootState) =>
  state.incidentReports.formSubmitted;

export default incidentReportSlice.reducer;
