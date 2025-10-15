import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { UBButton } from "../../common/Button/Button";

export const Reports: React.FC = () => {
  const navigate = useNavigate();

  const handleShowTable = (text: string) => {
    const routes: Record<string, string> = {
      "Incident Reports": "/incidentReports",
    };

    if (routes[text]) {
      navigate(routes[text]);
    }
  };

  return (
    <Box sx={{ padding: "3%" }}>
      <Grid container spacing={3}>
        {["Incident Reports"].map((text, index) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{ display: "flex", justifyContent: "left" }}
          >
            <UBButton text={text} onClick={() => handleShowTable(text)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports;
