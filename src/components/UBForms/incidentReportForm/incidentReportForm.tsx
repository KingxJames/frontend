import React from "react";
import { Box, Button, TextField, Typography, Grid, Paper, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  selectIncidentReports,
  setAction,
  setCaseNumber,
  setDisposition,
  setIncidentStatus,
  setIncidentType,
  setIncidentReports,
  setBuildingId,
  setBuildingLocation,
  setReport,
  setUploadedBy,
  setDate,
  setTime,
} from "../../../../store/features/incidentReportSlice";

import { IBuilding } from "../../../../store/features/buildingSlice";
import {selectBuildings} from "../../../../store/features/buildingSlice";
import { useFetchBuildingsQuery } from "../../../../store/services/buildingsAPI";



export const IncidentReportForm: React.FC = () => {
  const dispatch = useDispatch();
  const incidentReports = useSelector(selectIncidentReports);
  const { data: buildingsData } = useFetchBuildingsQuery();

  // console.log("incidentReports", incidentReports);
  const buildings = useSelector(selectBuildings);

  console.log("buildings", buildings);

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
            Incident Details - {incidentReports.caseNumber}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={incidentReports.date as string}
                onChange={(e) => dispatch(setDate(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={incidentReports.time}
                onChange={(e) => dispatch(setTime(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <Select> </Select>
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
              <TextField label="Incident Status" fullWidth />
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
