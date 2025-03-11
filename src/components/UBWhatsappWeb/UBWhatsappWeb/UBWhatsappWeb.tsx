import React from "react";
import { Box } from "@mui/material";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";
import { red } from "@mui/material/colors";

export const UBWhatsappWeb: React.FC = () => {
  return (
    <Box display="flex" flexDirection="row" height={"100vh"}>
      <Box width="30%" sx={{ backgroundColor: "red" }}>
        <LeftPanel item={{ }} />
      </Box>
      <Box  sx={{ backgroundColor: "green", border: ".05px solid white" }}/>

      <Box width="70%" sx={{ backgroundColor: "yellow" }}>
        <RightPanel />
      </Box>
    </Box>
  );
};

export default UBWhatsappWeb;
