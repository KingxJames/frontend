import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface EndOfShiftReportPatrolInitialState {
  id: string;
  date: string;
  time: string;
  campus: string;
  report: string;
  uploadedBy: string; //patrol officer
  formSubmitted: boolean;
}

const initialState: EndOfShiftReportPatrolInitialState = {
  id: "",
  date: "",
  time: "",
  campus: "",
  report: "",
  uploadedBy: "",
  formSubmitted: false,
};

export const endOfShiftReportPatrolSlice = createSlice({
  name: "endOfShiftReportPatrol",
  initialState,
  reducers: {
    setEndOfShiftReportPatrol: (
      state,
      action: PayloadAction<EndOfShiftReportPatrolInitialState>
    ) => {
      Object.assign(state, action.payload);
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
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
  setId,
  setDate,
  setTime,
  setCampus,
  setReport,
  setUploadedBy,
  setEndOfShiftReportPatrol,
  setFormSubmitted,
} = endOfShiftReportPatrolSlice.actions;

export const selectEndOfShiftReportPatrol = (state: RootState) =>
  state.endOfShiftReportPatrol;
export const selectId = (state: RootState) => state.endOfShiftReportPatrol.id;
export const selectDate = (state: RootState) =>
  state.endOfShiftReportPatrol.date;
export const selectTime = (state: RootState) =>
  state.endOfShiftReportPatrol.time;
export const selectCampus = (state: RootState) =>
  state.endOfShiftReportPatrol.campus;
export const selectReport = (state: RootState) =>
  state.endOfShiftReportPatrol.report;
export const selectUploadedBy = (state: RootState) =>
  state.endOfShiftReportPatrol.uploadedBy;
export const selectFormSubmitted = (state: RootState) =>
  state.endOfShiftReportPatrol.formSubmitted;

export default endOfShiftReportPatrolSlice.reducer;
