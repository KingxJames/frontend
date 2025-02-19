import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the path according to your project structure

interface ITotal {
  usersTotal: number;
  reportTotal: number;
  incidentFilesTotal: number;
  messageTotal: number;
}

export interface DashboardInitialState {
  total: ITotal;
}

const initialState: DashboardInitialState = {
  total: {
    usersTotal: 0,
    reportTotal: 0,
    incidentFilesTotal: 0,
    messageTotal: 0,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardState: (
      state,
      action: PayloadAction<DashboardInitialState>
    ) => {
      return { ...state, ...action.payload };
    },
    setTotalState: (state, action: PayloadAction<Partial<ITotal>>) => {
      return {
        ...state,
        total: {
          ...state.total,
          ...action.payload,
        },
      };
    },
  },
});

export const { setDashboardState, setTotalState } = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => {
  return state.dashboard;
};

export const selectTotalState = (state: RootState) => state.dashboard.total;

export default dashboardSlice.reducer;
