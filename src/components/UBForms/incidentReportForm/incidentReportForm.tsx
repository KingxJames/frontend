import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIncidentReports,
  selectCaseNumber,
  selectDate,
  selectTime,
  setDate,
  setTime,
  setIncidentReportStatus,
} from "../../../../store/features/incidentReportSlice";
import {
  selectIncidentStatus,
  IIncidentStatus,
  setIncidentStatus,
  selectSelectedIncidentStatus,
  setSelectedIncidentStatus,
} from "../../../../store/features/incidentStatusSlice";
import { useFetchIncidentStatusesQuery } from "../../../../store/services/incidentStatusAPI";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const IncidentReportForm: React.FC = () => {
  const dispatch = useDispatch();

  const incidentReports = useSelector(selectIncidentReports);
  console.log("incidentReports", incidentReports);
  const caseNumber = useSelector(selectCaseNumber);
  const date = useSelector(selectDate);
  const time = useSelector(selectTime);
  // const { data: incidentReportsData } = useInitializeIncidentReportQuery();

  const { data: incidentStatusData } = useFetchIncidentStatusesQuery();
  // console.log("incidentStatusData", incidentStatusData);

  const incidentStatus = useSelector(selectIncidentStatus);
  // console.log("incidentStatus", incidentStatus);

  const selectedIncidentStatus = useSelector(selectSelectedIncidentStatus);
  console.log("selectedIncidentStatus", selectedIncidentStatus);

  if (incidentStatus.length <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: "80px",
          bgcolor: "#6C3777;", // Purple
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Incident Report Form
        </Typography>
      </Box>

      {/* Form Body */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "900px",
            p: 4,
            borderRadius: "12px",
            backgroundColor: "#fff",
            border: "2px solid #C5A645", // Gold border
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
            Incident Details - {caseNumber}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => dispatch(setDate(e.target.value))}
                value={date}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={time}
                onChange={(e) => dispatch(setTime(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Location" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Campus" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Incident Type" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <TextField label="Incident Status" fullWidth /> */}
              <FormControl fullWidth>
                <InputLabel id="incident-status-label">
                  Incident Status
                </InputLabel>
                <Select
                  labelId="incident-status-label"
                  value={selectedIncidentStatus}
                  onChange={(e) =>
                    dispatch(setSelectedIncidentStatus(e.target.value))
                  }
                >
                  {incidentStatus.data?.map((status: IIncidentStatus) => (
                    <MenuItem key={status.id} value={status.incidentStatus}>
                      {status.incidentStatus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description of Incident"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Action Taken"
                multiline
                rows={4}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                component="label"
                role={undefined}
                // tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: "#6C3777;",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#6d54a3ff",
                  },
                }}
              >
                Upload files
              </Button>{" "}
            </Grid>
          </Grid>

          {/* Section: People Involved */}
          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 2,
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            People Involved
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Reported By" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Contact" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Witnesses" fullWidth />
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
            >
              Submit Report
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default IncidentReportForm;
