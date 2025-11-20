import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IImpoundedReportFile {
  url: string;
  generated_name: string;
  original_name: string;
  displayURL: string;
}

export interface ISignatureFile {
  url: string;
  generated_name: string;
}

export interface IOwnerSignatureFile {
  url: string;
  generated_name: string;
}

export interface ISignaturePSDFile {
  url: string;
  generated_name: string;
}

export interface IOwnerSignatureFile2 {
  url: string;
  generated_name: string;
}

export interface ISignaturePSDFile2 {
  url: string;
  generated_name: string;
}

export interface impoundedReportInitialState {
  id: string;
  name: string;
  studentID: string;
  phoneNumber: string;
  address: string;
  todayDate: string;
  brand: string;
  model: string;
  color: string;
  style: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: string;
  locationOfBikeStolen: string;
  whatTimeBikeStolen: string;
  bicycleRack: string;
  impoundedReportFiles: IImpoundedReportFile[];
  whenWasBikeWasStolen: string;
  signature: ISignatureFile[];
  dateOfSignature: string;
  dateReturnedToOwner: string;
  ownerName: string;
  ownerAddress: string;
  ownerDOB: string;
  ownerIDNumber: string;
  ownerTelephone: string;
  remarks: string;
  ownerSignature: IOwnerSignatureFile[];
  signaturePSD: ISignaturePSDFile[];
  nameOfFinder: string;
  locationFound: string;
  trackingBrand: string;
  trackingModel: string;
  trackingColor: string;
  trackingStyle: string;
  trackingSerialNumber: string;
  supervisorWhoreceivedItems: string;
  trackingFormRemarks: string;
  dateReturnedToOwner2: string;
  ownerName2: string;
  ownerAddress2: string;
  ownerDOB2: string;
  ownerIDNumber2: string;
  ownerTelephone2: string;
  remarks2: string;
  ownerSignature2: IOwnerSignatureFile2[];
  signaturePSD2: ISignaturePSDFile2[];
  uploadedBy: string;
  formSubmitted: boolean;
}

const initialState: impoundedReportInitialState = {
  id: "",
  name: "",
  studentID: "",
  phoneNumber: "",
  address: "",
  todayDate: "",
  brand: "",
  model: "",
  color: "",
  style: "",
  serialNumber: "",
  purchaseDate: "",
  purchasePrice: "",
  locationOfBikeStolen: "",
  whatTimeBikeStolen: "",
  bicycleRack: "",
  impoundedReportFiles: [],
  whenWasBikeWasStolen: "",
  signature: [],
  dateOfSignature: "",
  dateReturnedToOwner: "",
  ownerName: "",
  ownerAddress: "",
  ownerDOB: "",
  ownerIDNumber: "",
  ownerTelephone: "",
  remarks: "",
  ownerSignature: [],
  signaturePSD: [],
  nameOfFinder: "",
  locationFound: "",
  trackingBrand: "",
  trackingModel: "",
  trackingColor: "",
  trackingStyle: "",
  trackingSerialNumber: "",
  supervisorWhoreceivedItems: "",
  trackingFormRemarks: "",
  dateReturnedToOwner2: "",
  ownerName2: "",
  ownerAddress2: "",
  ownerDOB2: "",
  ownerIDNumber2: "",
  ownerTelephone2: "",
  remarks2: "",
  ownerSignature2: [],
  signaturePSD2: [],
  uploadedBy: "",
  formSubmitted: false,
};

export const impoundedReportSlice = createSlice({
  name: "impoundedReport",
  initialState,
  reducers: {
    setImpoundedReportState: (
      state,
      action: PayloadAction<Partial<impoundedReportInitialState>>
    ) => {
      Object.assign(state, action.payload);
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setStudentID: (state, action: PayloadAction<string>) => {
      state.studentID = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setTodayDate: (state, action: PayloadAction<string>) => {
      state.todayDate = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setStyle: (state, action: PayloadAction<string>) => {
      state.style = action.payload;
    },
    setSerialNumber: (state, action: PayloadAction<string>) => {
      state.serialNumber = action.payload;
    },
    setPurchaseDate: (state, action: PayloadAction<string>) => {
      state.purchaseDate = action.payload;
    },
    setPurchasePrice: (state, action: PayloadAction<string>) => {
      state.purchasePrice = action.payload;
    },
    setLocationOfBikeStolen: (state, action: PayloadAction<string>) => {
      state.locationOfBikeStolen = action.payload;
    },
    setWhatTimeBikeStolen: (state, action: PayloadAction<string>) => {
      state.whatTimeBikeStolen = action.payload;
    },
    setBicycleRack: (state, action: PayloadAction<string>) => {
      state.bicycleRack = action.payload;
    },
    setImpoundedReportFiles: (
      state,
      action: PayloadAction<IImpoundedReportFile[]>
    ) => {
      state.impoundedReportFiles = action.payload;
    },
    setWhenWasBikeWasStolen: (state, action: PayloadAction<string>) => {
      state.whenWasBikeWasStolen = action.payload;
    },
    setSignature: (state, action: PayloadAction<ISignatureFile[]>) => {
      state.signature = action.payload;
    },
    setDateOfSignature: (state, action: PayloadAction<string>) => {
      state.dateOfSignature = action.payload;
    },
    setDateReturnedToOwner: (state, action: PayloadAction<string>) => {
      state.dateReturnedToOwner = action.payload;
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
    setOwnerIDNumber: (state, action: PayloadAction<string>) => {
      state.ownerIDNumber = action.payload;
    },
    setOwnerTelephone: (state, action: PayloadAction<string>) => {
      state.ownerTelephone = action.payload;
    },
    setRemarks: (state, action: PayloadAction<string>) => {
      state.remarks = action.payload;
    },
    setOwnerSignature: (
      state,
      action: PayloadAction<IOwnerSignatureFile[]>
    ) => {
      state.ownerSignature = action.payload;
    },
    setSignaturePSD: (state, action: PayloadAction<ISignaturePSDFile[]>) => {
      state.signaturePSD = action.payload;
    },
    setNameOfFinder: (state, action: PayloadAction<string>) => {
      state.nameOfFinder = action.payload;
    },
    setLocationFound: (state, action: PayloadAction<string>) => {
      state.locationFound = action.payload;
    },
    setTrackingBrand: (state, action: PayloadAction<string>) => {
      state.trackingBrand = action.payload;
    },
    setTrackingModel: (state, action: PayloadAction<string>) => {
      state.trackingModel = action.payload;
    },
    setTrackingColor: (state, action: PayloadAction<string>) => {
      state.trackingColor = action.payload;
    },
    setTrackingStyle: (state, action: PayloadAction<string>) => {
      state.trackingStyle = action.payload;
    },
    setTrackingSerialNumber: (state, action: PayloadAction<string>) => {
      state.trackingSerialNumber = action.payload;
    },
    setSupervisorWhoreceivedItems: (state, action: PayloadAction<string>) => {
      state.supervisorWhoreceivedItems = action.payload;
    },
    setTrackingFormRemarks: (state, action: PayloadAction<string>) => {
      state.trackingFormRemarks = action.payload;
    },
    setDateReturnedToOwner2: (state, action: PayloadAction<string>) => {
      state.dateReturnedToOwner2 = action.payload;
    },
    setOwnerName2: (state, action: PayloadAction<string>) => {
      state.ownerName2 = action.payload;
    },
    setOwnerAddress2: (state, action: PayloadAction<string>) => {
      state.ownerAddress2 = action.payload;
    },
    setOwnerDOB2: (state, action: PayloadAction<string>) => {
      state.ownerDOB2 = action.payload;
    },
    setOwnerIDNumber2: (state, action: PayloadAction<string>) => {
      state.ownerIDNumber2 = action.payload;
    },
    setOwnerTelephone2: (state, action: PayloadAction<string>) => {
      state.ownerTelephone2 = action.payload;
    },
    setRemarks2: (state, action: PayloadAction<string>) => {
      state.remarks2 = action.payload;
    },
    setOwnerSignature2: (
      state,
      action: PayloadAction<IOwnerSignatureFile2[]>
    ) => {
      state.ownerSignature2 = action.payload;
    },
    setSignaturePSD2: (state, action: PayloadAction<ISignaturePSDFile2[]>) => {
      state.signaturePSD2 = action.payload;
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
  setImpoundedReportState,
  setName,
  setStudentID,
  setPhoneNumber,
  setAddress,
  setTodayDate,
  setBrand,
  setModel,
  setColor,
  setStyle,
  setSerialNumber,
  setPurchaseDate,
  setPurchasePrice,
  setLocationOfBikeStolen,
  setWhatTimeBikeStolen,
  setBicycleRack,
  setImpoundedReportFiles,
  setWhenWasBikeWasStolen,
  setSignature,
  setDateOfSignature,
  setDateReturnedToOwner,
  setOwnerName,
  setOwnerAddress,
  setOwnerDOB,
  setOwnerIDNumber,
  setOwnerTelephone,
  setRemarks,
  setOwnerSignature,
  setSignaturePSD,
  setNameOfFinder,
  setLocationFound,
  setTrackingBrand,
  setTrackingModel,
  setTrackingColor,
  setTrackingStyle,
  setTrackingSerialNumber,
  setSupervisorWhoreceivedItems,
  setTrackingFormRemarks,
  setDateReturnedToOwner2,
  setOwnerName2,
  setOwnerAddress2,
  setOwnerDOB2,
  setOwnerIDNumber2,
  setOwnerTelephone2,
  setRemarks2,
  setOwnerSignature2,
  setSignaturePSD2,
  setUploadedBy,
  setFormSubmitted,
} = impoundedReportSlice.actions;

export const selectImpoundedReport = (state: RootState) =>
  state.impoundedReport;
export const selectName = (state: RootState) => state.impoundedReport.name;
export const selectStudentID = (state: RootState) =>
  state.impoundedReport.studentID;
export const selectPhoneNumber = (state: RootState) =>
  state.impoundedReport.phoneNumber;
export const selectAddress = (state: RootState) =>
  state.impoundedReport.address;
export const selectTodayDate = (state: RootState) =>
  state.impoundedReport.todayDate;
export const selectBrand = (state: RootState) => state.impoundedReport.brand;
export const selectModel = (state: RootState) => state.impoundedReport.model;
export const selectColor = (state: RootState) => state.impoundedReport.color;
export const selectStyle = (state: RootState) => state.impoundedReport.style;
export const selectSerialNumber = (state: RootState) =>
  state.impoundedReport.serialNumber;
export const selectPurchaseDate = (state: RootState) =>
  state.impoundedReport.purchaseDate;
export const selectPurchasePrice = (state: RootState) =>
  state.impoundedReport.purchasePrice;
export const selectLocationOfBikeStolen = (state: RootState) =>
  state.impoundedReport.locationOfBikeStolen;
export const selectWhatTimeBikeStolen = (state: RootState) =>
  state.impoundedReport.whatTimeBikeStolen;
export const selectBicycleRack = (state: RootState) =>
  state.impoundedReport.bicycleRack;
export const selectImpoundedReportFiles = (state: RootState) =>
  state.impoundedReport.impoundedReportFiles;
export const selectWhenWasBikeWasStolen = (state: RootState) =>
  state.impoundedReport.whenWasBikeWasStolen;
export const selectSignature = (state: RootState) =>
  state.impoundedReport.signature;
export const selectDateOfSignature = (state: RootState) =>
  state.impoundedReport.dateOfSignature;
export const selectDateReturnedToOwner = (state: RootState) =>
  state.impoundedReport.dateReturnedToOwner;
export const selectOwnerName = (state: RootState) =>
  state.impoundedReport.ownerName;
export const selectOwnerAddress = (state: RootState) =>
  state.impoundedReport.ownerAddress;
export const selectOwnerDOB = (state: RootState) =>
  state.impoundedReport.ownerDOB;
export const selectOwnerIDNumber = (state: RootState) =>
  state.impoundedReport.ownerIDNumber;
export const selectOwnerTelephone = (state: RootState) =>
  state.impoundedReport.ownerTelephone;
export const selectRemarks = (state: RootState) =>
  state.impoundedReport.remarks;
export const selectOwnerSignature = (state: RootState) =>
  state.impoundedReport.ownerSignature;
export const selectSignaturePSD = (state: RootState) =>
  state.impoundedReport.signaturePSD;
export const selectNameOfFinder = (state: RootState) =>
  state.impoundedReport.nameOfFinder;
export const selectLocationFound = (state: RootState) =>
  state.impoundedReport.locationFound;
export const selectTrackingBrand = (state: RootState) =>
  state.impoundedReport.trackingBrand;
export const selectTrackingModel = (state: RootState) =>
  state.impoundedReport.trackingModel;
export const selectTrackingColor = (state: RootState) =>
  state.impoundedReport.trackingColor;
export const selectTrackingStyle = (state: RootState) =>
  state.impoundedReport.trackingStyle;
export const selectTrackingSerialNumber = (state: RootState) =>
  state.impoundedReport.trackingSerialNumber;
export const selectSupervisorWhoreceivedItems = (state: RootState) =>
  state.impoundedReport.supervisorWhoreceivedItems;
export const selectTrackingFormRemarks = (state: RootState) =>
  state.impoundedReport.trackingFormRemarks;
export const selectDateReturnedToOwner2 = (state: RootState) =>
  state.impoundedReport.dateReturnedToOwner2;
export const selectOwnerName2 = (state: RootState) =>
  state.impoundedReport.ownerName2;
export const selectOwnerAddress2 = (state: RootState) =>
  state.impoundedReport.ownerAddress2;
export const selectOwnerDOB2 = (state: RootState) =>
  state.impoundedReport.ownerDOB2;
export const selectOwnerIDNumber2 = (state: RootState) =>
  state.impoundedReport.ownerIDNumber2;
export const selectOwnerTelephone2 = (state: RootState) =>
  state.impoundedReport.ownerTelephone2;
export const selectRemarks2 = (state: RootState) =>
  state.impoundedReport.remarks2;
export const selectOwnerSignature2 = (state: RootState) =>
  state.impoundedReport.ownerSignature2;
export const selectSignaturePSD2 = (state: RootState) =>
  state.impoundedReport.signaturePSD2;
export const selectUploadedBy = (state: RootState) =>
  state.impoundedReport.uploadedBy;
export const selectFormSubmitted = (state: RootState) =>
  state.impoundedReport.formSubmitted;

export default impoundedReportSlice.reducer;
