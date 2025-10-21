import React, { useEffect, useState } from "react";
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
  selectEndOfShiftReportPatrol,
  selectUploadedBy,
  setEndOfShiftReportPatrol,
  setFormSubmitted,
  setDate,
  setTime,
  setCampus,
  setReport,
  setUploadedBy,
} from "../../../../store/features/endOfShiftReportPatrolSlice";
import { selectCampus, ICampus } from "../../../../store/features/campusSlice";
import {
  useFetchEndOfShiftReportPatrolQuery,
  useCreateEndOfShiftReportPatrolMutation,
  useUpdateEndOfShiftReportPatrolMutation,
} from "../../../../store/services/endOfShiftReportPatrolAPI";
import { useFetchCampusesQuery } from "../../../../store/services/campusAPI";
import { buildApiUrl } from "../../../../store/config/api";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { useAutosaveEndOfReportPatrol } from "../../../hooks/useAutoSave";

export const EndOfShiftReportPatrol: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: endOfShiftReportPatrolData } =
    useFetchEndOfShiftReportPatrolQuery({});
  const { data: campusData } = useFetchCampusesQuery();
  const [createEndOfShiftReportPatrol] =
    useCreateEndOfShiftReportPatrolMutation();
  const [updateEndOfShiftReportPatrol] =
    useUpdateEndOfShiftReportPatrolMutation();

  const endOfShiftReportPatrols = useSelector(selectEndOfShiftReportPatrol);
  console.log("endOfShiftReportPatrols", endOfShiftReportPatrols);
  console.log("End of Shift Report Patrol ID:", endOfShiftReportPatrols.id);
  // console.log("End of Shift Report Patrol Form Submitted:", endOfShiftReportPatrols.uploadedBy);
  useAutosaveEndOfReportPatrol();
  const campus = useSelector(selectCampus);

  const validateForm = () => {
    const requiredFields = ["date", "time", "campus", "report"];

    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (
        !endOfShiftReportPatrols[field as keyof typeof endOfShiftReportPatrols]
      ) {
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
      await updateEndOfShiftReportPatrol({
        ...endOfShiftReportPatrols,
        formSubmitted: true,
        id: endOfShiftReportPatrols.id, // Firestore document id
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
          End of Shift Report - Patrol Officer
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
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "#5E4B8B",
            fontWeight: "bold",
            borderBottom: "2px solid #C5A645",
            pb: 1,
          }}
        >
          End of Shift Report
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => dispatch(setDate(e.target.value))}
              value={endOfShiftReportPatrols.date}
              error={!!errors["date"]}
              helperText={errors["date"] ? "Date is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endOfShiftReportPatrols.time}
              onChange={(e) => dispatch(setTime(e.target.value))}
              error={!!errors["time"]}
              helperText={errors["time"] ? "Time is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="building-location-label">Campus</InputLabel>
              <Select
                labelId="building-location-label"
                label="Campus"
                value={endOfShiftReportPatrols.campus}
                onChange={(e) => dispatch(setCampus(e.target.value))}
              >
                {campus?.data?.campus?.map((campus: ICampus) => (
                  <MenuItem key={campus.id} value={campus.campus}>
                    {campus.campus}
                  </MenuItem>
                ))}
              </Select>
              {errors["campus"] && (
                <Typography color="error" variant="caption">
                  Campus is required
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Uploaded By"
              fullWidth
              value={endOfShiftReportPatrols.uploadedBy}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Report"
              type="text"
              multiline
              rows={10}
              value={endOfShiftReportPatrols.report}
              onChange={(e) => dispatch(setReport(e.target.value))}
              fullWidth
              error={!!errors["report"]}
              helperText={errors["report"] ? "Report is required" : ""}
            />
            {errors["report"] && (
              <Typography color="error" variant="caption">
                Report is required
              </Typography>
            )}
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

export default EndOfShiftReportPatrol;
