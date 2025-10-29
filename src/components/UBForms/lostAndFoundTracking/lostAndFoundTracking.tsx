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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLostAndFoundTracking,
  setLostAndFoundTrackingState,
  setFacilityName,
  setTime,
  setTodaysDate,
  setSerialNumber,
  setLocationFound,
  setItemDescription,
  setRoomNo,
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
  setFormSubmitted,
} from "../../../../store/features/lostAndFoundTrackingSlice";
import { selectCampus, ICampus } from "../../../../store/features/campusSlice";
import {
  useUpdateLostAndFoundTrackingMutation,
  useFetchLostAndFoundTrackingQuery,
  useCreateLostAndFoundTrackingMutation,
} from "../../../../store/services/lostAndFoundTrackingAPI";
import { useFetchCampusesQuery } from "../../../../store/services/campusAPI";
import axios from "axios";
import { buildApiUrl } from "../../../../store/config/api";
import { RootState } from "../../../../store/store";
import { Form, useNavigate } from "react-router-dom";
import { useAutosaveLostAndFoundTracking } from "../../../hooks/useAutoSave";
import UBLogoWhite from "../../../images/UBLogoWhite.png";

export const LostAndFoundTracking: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const returnedSigRef = useRef<any>(null);
  const ownerSigRef = useRef<any>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const { data: lostAndFoundTrackingData } = useFetchLostAndFoundTrackingQuery(
    {}
  );
  const { data: campusData } = useFetchCampusesQuery();

  const [updateLostAndFoundTracking] = useUpdateLostAndFoundTrackingMutation();
  const [createLostAndFoundTracking] = useCreateLostAndFoundTrackingMutation();

  const lostAndFoundTrackings = useSelector(selectLostAndFoundTracking);
  console.log("Lost and Found Tracking ID:", lostAndFoundTrackings.id);
  useAutosaveLostAndFoundTracking();
  const campus = useSelector(selectCampus);

    // Load saved signatures (from Redux or DB) on mount
  useEffect(() => {
    if (lostAndFoundTrackings.returnedToOwnerSignature && returnedSigRef.current) {
      returnedSigRef.current.fromDataURL(lostAndFoundTrackings.returnedToOwnerSignature);
    }
    if (lostAndFoundTrackings.ownerAcknowledgementSignature && ownerSigRef.current) {
      ownerSigRef.current.fromDataURL(lostAndFoundTrackings.ownerAcknowledgementSignature);
    }
  }, [lostAndFoundTrackings]);

  const clearReturnedSignature = () => returnedSigRef.current.clear();
  const clearOwnerSignature = () => ownerSigRef.current.clear();

  const saveReturnedSignature = () => {
    const dataURL = returnedSigRef.current.toDataURL();
    dispatch(setReturnedToOwnerSignature(dataURL));
  };

  const saveOwnerSignature = () => {
    const dataURL = ownerSigRef.current.toDataURL();
    dispatch(setOwnerAcknowledgementSignature(dataURL));
  };

  const validateForm = () => {
    const requiredFields = [
      "todaysDate",
      "time",
      "facilityName",
      "locationFound",
      "roomNo",
      "foundBy",
      "supervisorWhoReceivedItem",
      "dateReturnedToOwner",
      "timeReturnedToOwner",
      "owner",
      "ownerDOB",
      "ownerAddress",
      "ownerIDNumber",
      "ownerTelephone",
      "remarks",
      "returnedToOwnerSignature",
      "ownerAcknowledgementSignature",
    ];

    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!lostAndFoundTrackings[field as keyof typeof lostAndFoundTrackings]) {
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
      await updateLostAndFoundTracking({
        ...lostAndFoundTrackings,
        formSubmitted: true,
        id: lostAndFoundTrackings.id, // Firestore document id
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
          Lost Found Tracking Form
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
            <FormControl fullWidth>
              <InputLabel id="building-location-label">
                Facility Name
              </InputLabel>
              <Select
                labelId="building-location-label"
                label="Facility Name"
                value={lostAndFoundTrackings.facilityName}
                onChange={(e) => dispatch(setFacilityName(e.target.value))}
              >
                {campus?.data?.campus?.map((campus: ICampus) => (
                  <MenuItem key={campus.id} value={campus.campus}>
                    {campus.campus}
                  </MenuItem>
                ))}
              </Select>
              {errors["facilityName"] && (
                <Typography color="error" variant="caption">
                  Facility name is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostAndFoundTrackings.time}
              onChange={(e) => dispatch(setTime(e.target.value))}
              error={!!errors["time"]}
              helperText={errors["time"] ? "Time is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Today's Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostAndFoundTrackings.todaysDate}
              onChange={(e) => dispatch(setTodaysDate(e.target.value))}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Serial Number"
              fullWidth
              value={lostAndFoundTrackings.serialNumber}
              onChange={(e) => dispatch(setSerialNumber(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Location Found"
              fullWidth
              value={lostAndFoundTrackings.locationFound}
              onChange={(e) => dispatch(setLocationFound(e.target.value))}
            />
            {errors["locationFound"] && (
              <Typography color="error" variant="caption">
                Location found is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Room No"
              fullWidth
              value={lostAndFoundTrackings.roomNo}
              onChange={(e) => dispatch(setRoomNo(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Found By"
              fullWidth
              value={lostAndFoundTrackings.foundBy}
              onChange={(e) => dispatch(setFoundBy(e.target.value))}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Supervisor Who Received Item"
              fullWidth
              value={lostAndFoundTrackings.supervisorWhoReceivedItem}
              onChange={(e) =>
                dispatch(setSupervisorWhoReceivedItem(e.target.value))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Item Description"
              type="text"
              multiline
              rows={4}
              value={lostAndFoundTrackings.itemDescription}
              onChange={(e) => dispatch(setItemDescription(e.target.value))}
              fullWidth
              error={!!errors["description"]}
              helperText={
                errors["description"] ? "Description is required" : ""
              }
            />
          </Grid>
        </Grid>

        {/* Section: Details */}
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 4,
            color: "#5E4B8B",
            fontWeight: "bold",
            borderBottom: "2px solid #C5A645",
            pb: 1,
          }}
        >
          Disposition of Property
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date Returned to Owner"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostAndFoundTrackings.dateReturnedToOwner}
              onChange={(e) => dispatch(setDateReturnedToOwner(e.target.value))}
              error={!!errors["dateReturnedToOwner"]}
              helperText={
                errors["dateReturnedToOwner"] ? "Date returned is required" : ""
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Time Returned to Owner"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostAndFoundTrackings.timeReturnedToOwner}
              onChange={(e) => dispatch(setTimeReturnedToOwner(e.target.value))}
              error={!!errors["timeReturnedToOwner"]}
              helperText={
                errors["timeReturnedToOwner"] ? "Time returned is required" : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner"
              fullWidth
              value={lostAndFoundTrackings.owner}
              onChange={(e) => dispatch(setOwner(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner DOB"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostAndFoundTrackings.ownerDOB}
              onChange={(e) => dispatch(setOwnerDOB(e.target.value))}
              error={!!errors["ownerDOB"]}
              helperText={errors["ownerDOB"] ? "Owner DOB is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Address"
              fullWidth
              value={lostAndFoundTrackings.ownerAddress}
              onChange={(e) => dispatch(setOwnerAddress(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner ID Number"
              fullWidth
              value={lostAndFoundTrackings.ownerIDNumber}
              onChange={(e) => dispatch(setOwnerIDNumber(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Owner Telephone"
              fullWidth
              value={lostAndFoundTrackings.ownerTelephone}
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
              value={lostAndFoundTrackings.remarks}
              onChange={(e) => dispatch(setRemarks(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Returned to Owner Signature</label>
            <SignatureCanvas
              ref={returnedSigRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "sigCanvas",
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button size="small" onClick={clearReturnedSignature}>
                Clear
              </Button>
              <Button size="small" onClick={saveReturnedSignature}>
                Save
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Owner Acknowledgement Signature</label>
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

export default LostAndFoundTracking;
