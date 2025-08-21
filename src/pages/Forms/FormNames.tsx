import React from "react";
import UBFormCard from "../../components/UBForms/UBFormCard/UBFormCard";
import { Box, Typography } from "@mui/material";
import warning from "../../images/incident/warning.png";
import { useNavigate } from "react-router-dom";

export const FormNames: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("incidentReportForm");
  };

  console.log(handleClick);
  return (
    <Box>
      <UBFormCard
        title="Incident Report Form"
        image={warning}
        onClick={handleClick}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "250px",
          borderTop: "1px solid gray",
          backgroundColor: "white", // keep it visible over content
          textAlign: "left",
          pl: "1%",
        }}
      >
        <Typography>Draft</Typography>
      </Box>
    </Box>
  );
};

export default FormNames;
