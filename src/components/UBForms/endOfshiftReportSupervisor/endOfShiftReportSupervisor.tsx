import React from "react";
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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEndOfShiftReportSupervisor,
  setDate,
  setTime,
  setCampus,
  setReport,
  setFormSubmitted,
} from "../../../../store/features/endOfShiftReportSupervisorSlice";

import { selectCampus, ICampus } from "../../../../store/features/campusSlice";
import {
  useFetchEndOfShiftReportSupervisorQuery,
  useCreateEndOfShiftReportSupervisorMutation,
  useUpdateEndOfShiftReportSupervisorMutation,
} from "../../../../store/services/endOfShiftReportSupervisorAPI";
import { useFetchCampusesQuery } from "../../../../store/services/campusAPI";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { useAutosaveEndOfReportSupervisor } from "../../../hooks/useAutoSave";

export const EndOfShiftReportSupervisor: React.FC = () => {
  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: endOfShiftReportSupervisorData } =
    useFetchEndOfShiftReportSupervisorQuery({});
  const { data: campusData } = useFetchCampusesQuery();
  const [createEndOfShiftReportSupervisor] =
    useCreateEndOfShiftReportSupervisorMutation();
  const [updateEndOfShiftReportSupervisor] =
    useUpdateEndOfShiftReportSupervisorMutation();
  const endOfShiftReportSupervisors = useSelector(
    selectEndOfShiftReportSupervisor
  );
  useAutosaveEndOfReportSupervisor();
  const campus = useSelector(selectCampus);

  const validateForm = () => {
    const requiredFields = ["date", "time", "campus", "report"];

    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (
        !endOfShiftReportSupervisors[
          field as keyof typeof endOfShiftReportSupervisors
        ]
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
      await updateEndOfShiftReportSupervisor({
        ...endOfShiftReportSupervisors,
        formSubmitted: true,
        id: endOfShiftReportSupervisors.id, // Firestore document id
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
          End of Shift Report{" "}
        </Typography>
      </Box>
      {/* Form body */}
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
          End of Shift Report Supervisor
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => dispatch(setDate(e.target.value))}
              value={endOfShiftReportSupervisors.date}
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
              value={endOfShiftReportSupervisors.time}
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
                value={endOfShiftReportSupervisors.campus}
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
          <Grid item xs={6}>
            <TextField
              label="Uploaded By"
              fullWidth
              value={endOfShiftReportSupervisors.uploadedBy}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Report"
              type="text"
              multiline
              rows={10}
              value={endOfShiftReportSupervisors.report}
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

export default EndOfShiftReportSupervisor;
