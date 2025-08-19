import React from "react";
import UBFormCard from "../../components/UBForms/UBFormCard/UBFormCard";
import { Box } from "@mui/material";
import warning from "../../images/incident/warning.png";

export const FormNames: React.FC = () => {
  return (
    <Box>
      <UBFormCard title="Incident Report Form" image={warning} />
    </Box>
  );
};

export default FormNames;
