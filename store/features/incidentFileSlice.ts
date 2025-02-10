import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IIncidentFile {
  id: number;
  path: string;
  comment: string;
  messageId: number;
}

export interface IncidentFileInitialState {
  incidentFiles: IIncidentFile[];
}

const initialState: IncidentFileInitialState = {
  incidentFiles: [],
};

const incidentFilesSlice = createSlice({
  name: "incidentFiles",
  initialState,
  reducers: {
    setIncidentFiles: (state, action: PayloadAction<IIncidentFile[]>) => {
      return { ...state, incidentFiles: action.payload };
    },

    addIncidentFiles: (state, action: PayloadAction<IIncidentFile>) => {
      state.incidentFiles.push(action.payload); // Push new role directly into the array
    },

    updateIncidentFiles: (state, action: PayloadAction<IIncidentFile>) => {
      const index = state.incidentFiles.findIndex(
        (incidentFile) => incidentFile.id === action.payload.id
      );
      if (index !== -1) {
        state.incidentFiles[index] = {
          ...state.incidentFiles[index],
          ...action.payload,
        };
      }
    },
    deleteIncidentFiles: (state, action: PayloadAction<number>) => {
      state.incidentFiles = state.incidentFiles.filter(
        (incidentFiles) => incidentFiles.id !== action.payload
      );
    },
  },
});

export const { setIncidentFiles, addIncidentFiles, updateIncidentFiles, deleteIncidentFiles } =
incidentFilesSlice.actions;
export const selectIncidentFiles = (state: RootState) => state.incidentFiles;
export default incidentFilesSlice.reducer;