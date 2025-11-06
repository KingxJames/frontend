import React, { useEffect, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import {
  selectImpoundedReport,
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
} from "../../../../store/features/impoundedReportSlice";
import {
  useUpdateImpoundedReportMutation,
  useFetchImpoundedReportQuery,
  useCreateImpoundedReportMutation,
} from "../../../../store/services/impoundedReportAPI";
import { useFetchCampusesQuery } from "../../../../store/services/campusAPI";
import axios from "axios";
import { buildApiUrl } from "../../../../store/config/api";
import { RootState } from "../../../../store/store";
import { Form, useNavigate } from "react-router-dom";
import { useAutosaveImpoundedReport } from "../../../hooks/useAutoSave";
import UBLogoWhite from "../../../images/UBLogoWhite.png";

export const ImpoundedReportTrackingForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signatureRef = useRef<any>(null);
  const ownerSigRef = useRef<any>(null);
  const signaturePSDRef = useRef<any>(null);
  const ownerSigRef1 = useRef<any>(null);
  const signaturePSDRef1 = useRef<any>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const { data: impoundedReportData } = useFetchImpoundedReportQuery({});
  const [createImpoundedReport] = useCreateImpoundedReportMutation();
  const [updateImpoundedReport] = useUpdateImpoundedReportMutation();

  const impoundedReport = useSelector(selectImpoundedReport);
  console.log("Impounded Report ID:", impoundedReport.id);
  useAutosaveImpoundedReport();

  // Load saved signatures (from Redux or DB) on mount
  useEffect(() => {
    if (impoundedReport.signature && signatureRef.current) {
      signatureRef.current.fromDataURL(impoundedReport.signature);
    }
    if (impoundedReport.ownerSignature && ownerSigRef.current) {
      ownerSigRef.current.fromDataURL(impoundedReport.ownerSignature);
    }
    if (impoundedReport.signaturePSD && signaturePSDRef.current) {
      signaturePSDRef.current.fromDataURL(impoundedReport.signaturePSD);
    }
    if (impoundedReport.ownerSignature2 && ownerSigRef1.current) {
      ownerSigRef1.current.fromDataURL(impoundedReport.ownerSignature2);
    }

    if (impoundedReport.signaturePSD2 && signaturePSDRef1.current) {
      signaturePSDRef1.current.fromDataURL(impoundedReport.signaturePSD2);
    }
  }, [impoundedReport]);

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const clearOwnerSignature = () => {
    ownerSigRef.current.clear();
  };

  const clearSignaturePSD = () => {
    signaturePSDRef.current.clear();
  };

  const clearOwnerSignature1 = () => {
    ownerSigRef1.current.clear();
  };

  const clearSignaturePSD1 = () => {
    signaturePSDRef1.current.clear();
  };

  const saveSignature = () => {
    const dataURL = signatureRef.current.toDataURL();
    dispatch(setSignature(dataURL));
  };

  const saveOwnerSignature = () => {
    const dataURL = ownerSigRef.current.toDataURL();
    dispatch(setOwnerSignature(dataURL));
  };

  const saveSignaturePSD = () => {
    const dataURL = signaturePSDRef.current.toDataURL();
    dispatch(setSignaturePSD(dataURL));
  };

  const saveOwnerSignature1 = () => {
    const dataURL = ownerSigRef1.current.toDataURL();
    dispatch(setOwnerSignature2(dataURL));
  };

  const saveSignaturePSD1 = () => {
    const dataURL = signaturePSDRef1.current.toDataURL();
    dispatch(setSignaturePSD2(dataURL));
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "studentID",
      "phoneNumber",
      "address",
      "todayDate",
      "brand",
      "model",
      "color",
      "style",
      "serialNumber",
      "purchaseDate",
      "purchasePrice",
      "locationOfBikeStolen",
      "whatTimeBikeStolen",
      "bicycleRack",
      "whenWasBikeWasStolen",
      "signature",
      "dateReturnedToOwner",
      "ownerName",
      "ownerAddress",
      "ownerDOB",
      "ownerIDNumber",
      "ownerTelephone",
      "remarks",
      "ownerSignature",
      "signaturePSD",
      "nameOfFinder",
      "locationFound",
      "trackingBrand",
      "trackingModel",
      "trackingColor",
      "trackingStyle",
      "trackingSerialNumber",
      "supervisorWhoreceivedItems",
      "trackingFormRemarks",
      "dateReturnedToOwner2",
      "ownerName2",
      "ownerAddress2",
      "ownerDOB2",
      "ownerIDNumber2",
      "ownerTelephone2",
      "remarks2",
      "ownerSignature2",
      "signaturePSD2",
      "uploadedBy",
    ];

    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!impoundedReport[field as keyof typeof impoundedReport]) {
        newErrors[field] = true;
        missingFields.push(field);
      }
    });

    setErrors(newErrors);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required field${
          missingFields.length > 1 ? "s" : ""
        }: ${missingFields.join(", ")}`
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      // 2. Update the incident report (not create a new one)
      await updateImpoundedReport({
        ...impoundedReport,
        formSubmitted: true,
        id: impoundedReport.id, // Firestore document id
      }).unwrap();

      dispatch(setFormSubmitted(true));

      // 4. Navigate away
      navigate(`/forms`);
    } catch (error) {
      console.error("Failed to submit incident report:", error);
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: "100px",
          background: "linear-gradient(90deg, #6C3777 0%, #8E44AD 100%)", // purple gradient
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
          position: "relative",
          top: 0,
          left: 0,
          zIndex: 1000,
          borderBottom: "4px solid #ffd900ad", // gold accent line
        }}
      >
        {/* Add a logo if you want */}
        <Box
          sx={{
            height: "60px",
            mr: 2,
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))",
          }}
        />

        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            left: "20px",
            color: "#fff",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)", // glowing text effect
            textTransform: "uppercase",
          }}
        >
          Bicycle Lost / Impounded Report Tracking Form
        </Typography>
      </Box>

      {/* Form Body */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          pt: "50px", // push content below header
          overflowY: "auto",
        }}
      >
        {/* Section: Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Person Name"
              fullWidth
              value={impoundedReport.name}
              onChange={(e) => dispatch(setName(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Student ID Number"
              fullWidth
              value={impoundedReport.studentID}
              onChange={(e) => dispatch(setStudentID(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              fullWidth
              value={impoundedReport.phoneNumber}
              onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              fullWidth
              value={impoundedReport.address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Today's Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.todayDate}
              onChange={(e) => dispatch(setTodayDate(e.target.value))}
              error={!!errors["todayDate"]}
              helperText={errors["todayDate"] ? "Today's date is required" : ""}
            />
          </Grid>

          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 4,
              width: "100%",
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Bicycle Information Form
          </Typography>

          <Grid item xs={12} md={6}>
            <TextField
              label="Brand"
              fullWidth
              value={impoundedReport.brand}
              onChange={(e) => dispatch(setBrand(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Model"
              fullWidth
              value={impoundedReport.model}
              onChange={(e) => dispatch(setModel(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Color"
              fullWidth
              value={impoundedReport.color}
              onChange={(e) => dispatch(setColor(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Style"
              fullWidth
              value={impoundedReport.style}
              onChange={(e) => dispatch(setStyle(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Serial Number"
              fullWidth
              value={impoundedReport.serialNumber}
              onChange={(e) => dispatch(setSerialNumber(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Purchase Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.purchaseDate}
              onChange={(e) => dispatch(setPurchaseDate(e.target.value))}
              error={!!errors["purchaseDate"]}
              helperText={
                errors["purchaseDate"] ? "Purchase date is required" : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Purchase Price"
              fullWidth
              value={impoundedReport.purchasePrice}
              onChange={(e) => dispatch(setPurchasePrice(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Where or The Location Bike Was Stolen?"
              fullWidth
              value={impoundedReport.locationOfBikeStolen}
              onChange={(e) =>
                dispatch(setLocationOfBikeStolen(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="What Time Stolen?"
              fullWidth
              value={impoundedReport.whatTimeBikeStolen}
              onChange={(e) => dispatch(setWhatTimeBikeStolen(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Was Your Bicycle Locked To The Rack?
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={impoundedReport.bicycleRack}
                onChange={(e) => dispatch(setBicycleRack(e.target.value))}
                label="Was Your Bicycle Locked To The Rack?"
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                When Was Bike Stolen?
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={impoundedReport.whenWasBikeWasStolen}
                onChange={(e) =>
                  dispatch(setWhenWasBikeWasStolen(e.target.value))
                }
                label="When Was Bike Stolen?"
              >
                <MenuItem value={"Morning"}>Morning</MenuItem>
                <MenuItem value={"Afternoon"}>Afternoon</MenuItem>
                <MenuItem value={"Evening"}>Evening</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Signature</label>
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas",
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button size="small" onClick={clearSignature}>
                Clear
              </Button>
              <Button size="small" onClick={saveSignature}>
                Save
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Signature"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.dateOfSignature}
              onChange={(e) => dispatch(setDateOfSignature(e.target.value))}
              error={!!errors["dateOfSignature"]}
              helperText={
                errors["dateOfSignature"] ? "Date of signature is required" : ""
              }
            />
          </Grid>

          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 4,
              width: "100%",
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Disposition Of Property
          </Typography>

          <Grid item xs={12} md={6}>
            <TextField
              label="Date Returned to Owner"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.dateReturnedToOwner}
              onChange={(e) => dispatch(setDateReturnedToOwner(e.target.value))}
              error={!!errors["dateReturnedToOwner"]}
              helperText={
                errors["dateReturnedToOwner"] ? "Date returned is required" : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Name"
              fullWidth
              value={impoundedReport.ownerName}
              onChange={(e) => dispatch(setOwnerName(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Address"
              fullWidth
              value={impoundedReport.ownerAddress}
              onChange={(e) => dispatch(setOwnerAddress(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner DOB"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.ownerDOB}
              onChange={(e) => dispatch(setOwnerDOB(e.target.value))}
              error={!!errors["ownerDOB"]}
              helperText={errors["ownerDOB"] ? "Owner DOB is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner ID Number"
              fullWidth
              value={impoundedReport.ownerIDNumber}
              onChange={(e) => dispatch(setOwnerIDNumber(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Telephone"
              fullWidth
              value={impoundedReport.ownerTelephone}
              onChange={(e) => dispatch(setOwnerTelephone(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              type="text"
              multiline
              rows={4}
              fullWidth
              value={impoundedReport.remarks}
              onChange={(e) => dispatch(setRemarks(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Owner Signature</label>
            <SignatureCanvas
              ref={ownerSigRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas",
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button size="small" onClick={clearOwnerSignature}>
                Clear
              </Button>
              <Button size="small" onClick={saveOwnerSignature}>
                Save
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Signature of PSD Rep</label>
            <SignatureCanvas
              ref={signaturePSDRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas",
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button size="small" onClick={clearSignaturePSD}>
                Clear
              </Button>
              <Button size="small" onClick={saveSignaturePSD}>
                Save
              </Button>
            </div>
          </Grid>

          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 4,
              width: "100%",
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Impound Report Tracking Form
          </Typography>

          <Grid item xs={12} md={6}>
            <TextField
              label="Name of Finder"
              fullWidth
              value={impoundedReport.nameOfFinder}
              onChange={(e) => dispatch(setNameOfFinder(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Location Found"
              fullWidth
              value={impoundedReport.locationFound}
              onChange={(e) => dispatch(setLocationFound(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Brand"
              fullWidth
              value={impoundedReport.trackingBrand}
              onChange={(e) => dispatch(setTrackingBrand(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Model"
              fullWidth
              value={impoundedReport.trackingModel}
              onChange={(e) => dispatch(setTrackingModel(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Color"
              fullWidth
              value={impoundedReport.trackingColor}
              onChange={(e) => dispatch(setTrackingColor(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Style"
              fullWidth
              value={impoundedReport.trackingStyle}
              onChange={(e) => dispatch(setTrackingStyle(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Serial Number"
              fullWidth
              value={impoundedReport.trackingSerialNumber}
              onChange={(e) =>
                dispatch(setTrackingSerialNumber(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Supervisor Who Received Items"
              fullWidth
              value={impoundedReport.supervisorWhoreceivedItems}
              onChange={(e) =>
                dispatch(setSupervisorWhoreceivedItems(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Remarks"
              fullWidth
              value={impoundedReport.trackingFormRemarks}
              onChange={(e) => dispatch(setTrackingFormRemarks(e.target.value))}
            />
          </Grid>

          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 4,
              width: "100%",
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Disposition Of Property
          </Typography>

          <Grid item xs={12} md={6}>
            <TextField
              label="Date Returned to Owner"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.dateReturnedToOwner2}
              onChange={(e) =>
                dispatch(setDateReturnedToOwner2(e.target.value))
              }
              error={!!errors["dateReturnedToOwner2"]}
              helperText={
                errors["dateReturnedToOwner2"]
                  ? "Date returned is required"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Name"
              fullWidth
              value={impoundedReport.ownerName2}
              onChange={(e) => dispatch(setOwnerName2(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Address"
              fullWidth
              value={impoundedReport.ownerAddress2}
              onChange={(e) => dispatch(setOwnerAddress2(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner DOB"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={impoundedReport.ownerDOB2}
              onChange={(e) => dispatch(setOwnerDOB2(e.target.value))}
              error={!!errors["ownerDOB2"]}
              helperText={errors["ownerDOB2"] ? "Owner DOB is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner ID Number"
              fullWidth
              value={impoundedReport.ownerIDNumber2}
              onChange={(e) => dispatch(setOwnerIDNumber2(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Telephone"
              fullWidth
              value={impoundedReport.ownerTelephone2}
              onChange={(e) => dispatch(setOwnerTelephone2(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              type="text"
              multiline
              rows={4}
              fullWidth
              value={impoundedReport.remarks2}
              onChange={(e) => dispatch(setRemarks2(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Owner Signature</label>
            <SignatureCanvas
              ref={ownerSigRef1}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas",
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button size="small" onClick={clearOwnerSignature1}>
                Clear
              </Button>
              <Button size="small" onClick={saveOwnerSignature1}>
                Save
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Signature DPS</label>
            <SignatureCanvas
              ref={signaturePSDRef1}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas",
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button size="small" onClick={clearSignaturePSD1}>
                Clear
              </Button>
              <Button size="small" onClick={saveSignaturePSD1}>
                Save
              </Button>
            </div>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#6C3777;",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#6d54a3ff",
              },
            }}
            onClick={handleSubmit}
          >
            Submit Report
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
