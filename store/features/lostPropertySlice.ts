import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface LostPropertyFile {}

export interface lostProperty {
  lostPropertyFiles?: LostPropertyFile[];
}

export interface lostPropertyInitialState {
  id: string;
  complainantName: string;
  complainantAddress: string;
  complainantDOB: string;
  complainantTelephone: string;
  complainantID: string;
  complainantEmail: string;
  dateLost: string;
  timeLost: string;
  complainantAffiliation: string;
  additionalDescription: string;
  owner: string;
  ownerSignature: string;
  dateReported: string;
  dateReturnedToOwner: string;
  timeReturnedToOwner: string;
  ownerName: string;
  ownerAddress: string;
  ownerDOB: string;
  ownerID: string;
  ownerEmail: string;
  ownerTelephone: string;
  remarks: string;
  signatureDPS: string;
  returnedToOwnerSignature: string;
  uploadedBy: string;
  formSubmitted: boolean;
}

const initialState: lostPropertyInitialState = {
  id: "",
  complainantName: "",
  complainantAddress: "",
  complainantDOB: "",
  complainantTelephone: "",
  complainantID: "",
  complainantEmail: "",
  dateLost: "",
  timeLost: "",
  complainantAffiliation: "",
  additionalDescription: "",
  owner: "",
  ownerSignature: "",
  dateReported: "",
  dateReturnedToOwner: "",
  timeReturnedToOwner: "",
  ownerName: "",
  ownerAddress: "",
  ownerDOB: "",
  ownerID: "",
  ownerEmail: "",
  ownerTelephone: "",
  remarks: "",
  signatureDPS: "",
  returnedToOwnerSignature: "",
  uploadedBy: "",
  formSubmitted: false,
};

export const lostPropertySlice = createSlice({
  name: "lostProperty",
  initialState,
  reducers: {
    setLostPropertyState: (
      state,
      action: PayloadAction<Partial<lostPropertyInitialState>>
    ) => {
      Object.assign(state, action.payload);
    },
    setComplainantName: (state, action: PayloadAction<string>) => {
      state.complainantName = action.payload;
    },
    setComplainantAddress: (state, action: PayloadAction<string>) => {
      state.complainantAddress = action.payload;
    },
    setComplainantDOB: (state, action: PayloadAction<string>) => {
      state.complainantDOB = action.payload;
    },
    setComplainantTelephone: (state, action: PayloadAction<string>) => {
      state.complainantTelephone = action.payload;
    },
    setComplainantID: (state, action: PayloadAction<string>) => {
      state.complainantID = action.payload;
    },
    setComplainantEmail: (state, action: PayloadAction<string>) => {
      state.complainantEmail = action.payload;
    },
    setDateLost: (state, action: PayloadAction<string>) => {
      state.dateLost = action.payload;
    },
    setTimeLost: (state, action: PayloadAction<string>) => {
      state.timeLost = action.payload;
    },
    setComplainantAffiliation: (state, action: PayloadAction<string>) => {
      state.complainantAffiliation = action.payload;
    },
    setAdditionalDescription: (state, action: PayloadAction<string>) => {
      state.additionalDescription = action.payload;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setOwnerSignature: (state, action: PayloadAction<string>) => {
      state.ownerSignature = action.payload;
    },
    setDateReported: (state, action: PayloadAction<string>) => {
      state.dateReported = action.payload;
    },
    setDateReturnedToOwner: (state, action: PayloadAction<string>) => {
      state.dateReturnedToOwner = action.payload;
    },
    setTimeReturnedToOwner: (state, action: PayloadAction<string>) => {
      state.timeReturnedToOwner = action.payload;
    },
    setOwnerName: (state, action: PayloadAction<string>) => {
      state.ownerName = action.payload;
    },
    setOwnerAddress: (state, action: PayloadAction<string>) => {
      state.ownerAddress = action.payload;
    },
    setOwnerDOB: (state, action: PayloadAction<string>) => {
      state.ownerDOB = action.payload;
    },
    setOwnerID: (state, action: PayloadAction<string>) => {
      state.ownerID = action.payload;
    },
    setOwnerEmail: (state, action: PayloadAction<string>) => {
      state.ownerEmail = action.payload;
    },
    setOwnerTelephone: (state, action: PayloadAction<string>) => {
      state.ownerTelephone = action.payload;
    },
    setRemarks: (state, action: PayloadAction<string>) => {
      state.remarks = action.payload;
    },
    setSignatureDPS: (state, action: PayloadAction<string>) => {
      state.signatureDPS = action.payload;
    },
    setReturnedToOwnerSignature: (state, action: PayloadAction<string>) => {
      state.returnedToOwnerSignature = action.payload;
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
  setLostPropertyState,
  setComplainantName,
  setComplainantAddress,
  setComplainantDOB,
  setComplainantTelephone,
  setComplainantID,
  setComplainantEmail,
  setDateLost,
  setTimeLost,
  setComplainantAffiliation,
  setAdditionalDescription,
  setOwner,
  setOwnerSignature,
  setDateReported,
  setDateReturnedToOwner,
  setTimeReturnedToOwner,
  setOwnerName,
  setOwnerAddress,
  setOwnerDOB,
  setOwnerID,
  setOwnerEmail,
  setOwnerTelephone,
  setRemarks,
  setSignatureDPS,
  setReturnedToOwnerSignature,
  setUploadedBy,
  setFormSubmitted,
} = lostPropertySlice.actions;

export const selectLostProperty = (state: RootState) => state.lostProperty;
export const selectComplainantName = (state: RootState) =>
  state.lostProperty.complainantName;
export const selectComplainantAddress = (state: RootState) =>
  state.lostProperty.complainantAddress;
export const selectComplainantDOB = (state: RootState) =>
  state.lostProperty.complainantDOB;
export const selectComplainantTelephone = (state: RootState) =>
  state.lostProperty.complainantTelephone;
export const selectComplainantID = (state: RootState) =>
  state.lostProperty.complainantID;
export const selectComplainantEmail = (state: RootState) =>
  state.lostProperty.complainantEmail;
export const selectDateLost = (state: RootState) => state.lostProperty.dateLost;
export const selectTimeLost = (state: RootState) => state.lostProperty.timeLost;
export const selectComplainantAffiliation = (state: RootState) =>
  state.lostProperty.complainantAffiliation;
export const selectAdditionalDescription = (state: RootState) =>
  state.lostProperty.additionalDescription;
export const selectOwner = (state: RootState) => state.lostProperty.owner;
export const selectOwnerSignature = (state: RootState) =>
  state.lostProperty.ownerSignature;
export const selectDateReported = (state: RootState) =>
  state.lostProperty.dateReported;
export const selectDateReturnedToOwner = (state: RootState) =>
  state.lostProperty.dateReturnedToOwner;
export const selectTimeReturnedToOwner = (state: RootState) =>
  state.lostProperty.timeReturnedToOwner;
export const selectOwnerName = (state: RootState) =>
  state.lostProperty.ownerName;
export const selectOwnerAddress = (state: RootState) =>
  state.lostProperty.ownerAddress;
export const selectOwnerDOB = (state: RootState) => state.lostProperty.ownerDOB;
export const selectOwnerID = (state: RootState) => state.lostProperty.ownerID;
export const selectOwnerEmail = (state: RootState) =>
  state.lostProperty.ownerEmail;
export const selectOwnerTelephone = (state: RootState) =>
  state.lostProperty.ownerTelephone;
export const selectRemarks = (state: RootState) => state.lostProperty.remarks;
export const selectSignatureDPS = (state: RootState) =>
  state.lostProperty.signatureDPS;
export const selectReturnedToOwnerSignature = (state: RootState) =>
  state.lostProperty.returnedToOwnerSignature;
export const selectUploadedBy = (state: RootState) =>
  state.lostProperty.uploadedBy;
export const selectFormSubmitted = (state: RootState) =>
  state.lostProperty.formSubmitted;

export default lostPropertySlice.reducer;
