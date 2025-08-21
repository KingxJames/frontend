import React from "react";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useInitializeIncidentReportQuery } from "../../../../store/services/incidentReportAPI";
import { selectIncidentReports } from "../../../../store/features/incidentReportSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const IncidentReportForm: React.FC = () => {
  const dispatch = useDispatch();
  const incidentReports = useSelector(selectIncidentReports);
  const { data: incidentReportsData } = useInitializeIncidentReportQuery();

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
          bgcolor: "#5E4B8B", // Purple
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
            Incident Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Location" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Campus" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description of Incident"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                component="label"
                role={undefined}
                // tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: "#5E4B8B",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#4a3970",
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
                bgcolor: "#5E4B8B",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#4a3970",
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
