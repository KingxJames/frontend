import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface lostAndFoundtrackingFile {
  url?: string;
  generated_name?: string;
  lostAndFoundTrackingPicture: string; //original file name
}

export interface lostAndFoundTracking {
  lostAndFoundTrackingFiles?: lostAndFoundtrackingFile[];
}

export interface lostAndFoundTrackingInitialState {
  id: string;
  facilityName: string;
  time: string;
  todaysDate: string;
  serialNumber: string;
  locationFound: string;
  itemDescription: string;
  roomNo: string;
  foundBy: string;
  supervisorWhoReceivedItem: string;
  dateReturnedToOwner: string;
  timeReturnedToOwner: string;
  owner: string;
  ownerDOB: string;
  ownerAddress: string;
  ownerIDNumber: string;
  ownerTelephone: string;
  remarks: string;
  returnedToOwnerSignature: string;
  ownerAcknowledgementSignature: string;
  uploadedBy: string;
  formSubmitted: boolean;
}

const initialState: lostAndFoundTrackingInitialState = {
  id: "",
  facilityName: "",
  time: "",
  todaysDate: "",
  serialNumber: "",
  locationFound: "",
  itemDescription: "",
  roomNo: "",
  foundBy: "",
  supervisorWhoReceivedItem: "",
  dateReturnedToOwner: "",
  timeReturnedToOwner: "",
  owner: "",
  ownerDOB: "",
  ownerAddress: "",
  ownerIDNumber: "",
  ownerTelephone: "",
  remarks: "",
  returnedToOwnerSignature: "",
  ownerAcknowledgementSignature: "",
  uploadedBy: "",
  formSubmitted: false,
};

export const lostAndFoundTrackingSlice = createSlice({
  name: "lostAndFoundTracking",
  initialState,
  reducers: {
    setLostAndFoundTrackingState: (
      state,
      action: PayloadAction<Partial<lostAndFoundTrackingInitialState>>
    ) => {
      Object.assign(state, action.payload);
    },
    setFacilityName: (state, action: PayloadAction<string>) => {
      state.facilityName = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setSerialNumber: (state, action: PayloadAction<string>) => {
      state.serialNumber = action.payload;
    },
    setTodaysDate: (state, action: PayloadAction<string>) => {
      state.todaysDate = action.payload;
    },
    setItemDescription: (state, action: PayloadAction<string>) => {
      state.itemDescription = action.payload;
    },
    setLocationFound: (state, action: PayloadAction<string>) => {
      state.locationFound = action.payload;
    },
    setRoomNo: (state, action: PayloadAction<string>) => {
      state.roomNo = action.payload;
    },
    setFoundBy: (state, action: PayloadAction<string>) => {
      state.foundBy = action.payload;
    },
    setSupervisorWhoReceivedItem: (state, action: PayloadAction<string>) => {
      state.supervisorWhoReceivedItem = action.payload;
    },
    setDateReturnedToOwner: (state, action: PayloadAction<string>) => {
      state.dateReturnedToOwner = action.payload;
    },
    setTimeReturnedToOwner: (state, action: PayloadAction<string>) => {
      state.timeReturnedToOwner = action.payload;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setOwnerDOB: (state, action: PayloadAction<string>) => {
      state.ownerDOB = action.payload;
    },
    setOwnerAddress: (state, action: PayloadAction<string>) => {
      state.ownerAddress = action.payload;
    },
    setOwnerIDNumber: (state, action: PayloadAction<string>) => {
      state.ownerIDNumber = action.payload;
    },
    setOwnerTelephone: (state, action: PayloadAction<string>) => {
      state.ownerTelephone = action.payload;
    },
    setRemarks: (state, action: PayloadAction<string>) => {
      state.remarks = action.payload;
    },
    setReturnedToOwnerSignature: (state, action: PayloadAction<string>) => {
      state.returnedToOwnerSignature = action.payload;
    },
    setOwnerAcknowledgementSignature: (
      state,
      action: PayloadAction<string>
    ) => {
      state.ownerAcknowledgementSignature = action.payload;
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
  setLostAndFoundTrackingState,
  setFacilityName,
  setTime,
  setTodaysDate,
  setSerialNumber,
  setLocationFound,
  setRoomNo,
  setItemDescription,
  setFoundBy,
  setSupervisorWhoReceivedItem,
  setDateReturnedToOwner,
  setTimeReturnedToOwner,
  setOwner,
  setOwnerDOB,
  setOwnerAddress,
  setOwnerIDNumber,
  setOwnerTelephone,
  setRemarks,
  setReturnedToOwnerSignature,
  setOwnerAcknowledgementSignature,
  setUploadedBy,
  setFormSubmitted,
} = lostAndFoundTrackingSlice.actions;

export const selectLostAndFoundTracking = (state: RootState) =>
  state.lostAndFoundTracking;
export const selectFacilityName = (state: RootState) =>
  state.lostAndFoundTracking.facilityName;
export const selectTime = (state: RootState) => state.lostAndFoundTracking.time;
export const selectTodaysdate = (state: RootState) =>
  state.lostAndFoundTracking.todaysDate;
export const selectLocationFound = (state: RootState) =>
  state.lostAndFoundTracking.locationFound;
export const selectRoomNo = (state: RootState) =>
  state.lostAndFoundTracking.roomNo;
export const selectFoundBy = (state: RootState) =>
  state.lostAndFoundTracking.foundBy;
export const selectItemDescription = (state: RootState) =>
  state.lostAndFoundTracking.itemDescription;
export const selectSupervisorWhoReceivedItem = (state: RootState) =>
  state.lostAndFoundTracking.supervisorWhoReceivedItem;
export const selectDateReturnedToOwner = (state: RootState) =>
  state.lostAndFoundTracking.dateReturnedToOwner;
export const selectTimeReturnedToOwner = (state: RootState) =>
  state.lostAndFoundTracking.timeReturnedToOwner;
export const selectOwner = (state: RootState) =>
  state.lostAndFoundTracking.owner;
export const selectOwnerDOB = (state: RootState) =>
  state.lostAndFoundTracking.ownerDOB;
export const selectOwnerAddress = (state: RootState) =>
  state.lostAndFoundTracking.ownerAddress;
export const selectOwnerIDNumber = (state: RootState) =>
  state.lostAndFoundTracking.ownerIDNumber;
export const selectOwnerTelephone = (state: RootState) =>
  state.lostAndFoundTracking.ownerTelephone;
export const selectRemarks = (state: RootState) =>
  state.lostAndFoundTracking.remarks;
export const selectReturnedToOwnerSignature = (state: RootState) =>
  state.lostAndFoundTracking.returnedToOwnerSignature;
export const selectOwnerAcknowledgementSignature = (state: RootState) =>
  state.lostAndFoundTracking.ownerAcknowledgementSignature;
export const selectUploadedBy = (state: RootState) =>
  state.lostAndFoundTracking.uploadedBy;
export const selectFormSubmitted = (state: RootState) =>
  state.lostAndFoundTracking.formSubmitted;

export default lostAndFoundTrackingSlice.reducer;
