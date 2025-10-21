import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface EndOfShiftReportSupervisorInitialState {
  id: string;
  date: string;
  time: string;
  campus: string;
  report: string;
  uploadedBy: string; //patrol officer
  formSubmitted: boolean;
}

const initialState: EndOfShiftReportSupervisorInitialState = {
  id: "",
  date: "",
  time: "",
  campus: "",
  report: "",
  uploadedBy: "",
  formSubmitted: false,
};

export const endOfShiftReportSupervisorSlice = createSlice({
  name: "endOfShiftReportSupervisor",
  initialState,
  reducers: {
    setEndOfShiftReportSupervisor: (
      state,
      action: PayloadAction<EndOfShiftReportSupervisorInitialState>
    ) => {
      Object.assign(state, action.payload);
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setCampus: (state, action: PayloadAction<string>) => {
      state.campus = action.payload;
    },

    setReport: (state, action: PayloadAction<string>) => {
      state.report = action.payload;
    },
    setUploadedBy: (state, action: PayloadAction<string>) => {
      state.uploadedBy = action.payload;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
  },
});

export const {
  setDate,
  setTime,
  setCampus,
  setReport,
  setUploadedBy,
  setEndOfShiftReportSupervisor,
  setFormSubmitted,
} = endOfShiftReportSupervisorSlice.actions;


export const selectEndOfShiftReportSupervisor = (state: RootState) =>
  state.endOfShiftReportSupervisor;
export const selectDate = (state: RootState) =>
  state.endOfShiftReportSupervisor.date;
export const selectTime = (state: RootState) =>
  state.endOfShiftReportSupervisor.time;
export const selectCampus = (state: RootState) =>
  state.endOfShiftReportSupervisor.campus;
export const selectReport = (state: RootState) =>
  state.endOfShiftReportSupervisor.report;
export const selectUploadedBy = (state: RootState) =>
  state.endOfShiftReportSupervisor.uploadedBy;
export const selectFormSubmitted = (state: RootState) =>
  state.endOfShiftReportSupervisor.formSubmitted;

export default endOfShiftReportSupervisorSlice.reducer;