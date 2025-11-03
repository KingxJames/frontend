import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { UBButton } from "../../common/Button/Button";

export const Reports: React.FC = () => {
  const navigate = useNavigate();

  const handleShowTable = (text: string) => {
    const routes: Record<string, string> = {
      "Incident Reports": "/incidentReports",
      "End of Shift Report (Patrol Officer)": "/endOfShiftReportPatrolTable",
      "End of Shift Report (Shift Supervisor)":
        "/endOfShiftReportSupervisorTable",
      "Lost and Found Tracking Form": "/lostAndFoundTrackingFormTable",
      "Lost Property Report Form": "/lostPropertyTable",
    };

    if (routes[text]) navigate(routes[text]);
  };

  const reports = [
    "Incident Reports",
    "End of Shift Report (Patrol Officer)",
    "End of Shift Report (Shift Supervisor)",
    "Lost and Found Tracking Form",
    "Lost Property Report Form",
  ];

  return (
    <Box
      sx={{
        padding: "3%",
        minHeight: "92.5vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          color: "#4A148C",
        }}
      >
        Reports Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {reports.map((text, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                backgroundColor: "#fff",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#6A1B9A",
                }}
              >
                {text}
              </Typography>
              <UBButton
                text="Open"
                onClick={() => handleShowTable(text)}
                sx={{
                  width: "100%",
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "10px",
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports;
