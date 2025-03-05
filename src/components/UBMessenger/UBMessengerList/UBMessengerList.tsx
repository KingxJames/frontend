import React from "react";
import { Box } from "@mui/material";
import UBMessengerListHeader from "./UBMessengerListHeader";
import UBMessengerListChats from "./UBMessengerListChats";

export const UBMessengerList: React.FC = () => {
  return (
    <Box sx={{ border: "1px solid #ddd", height: "100vh", width: "25%" }}>
      <Box sx={{ width: "100%", backgroundColor: "#fFFFFF", pb: "2%" }}>
        <UBMessengerListHeader />
      </Box>

      <Box>
        <UBMessengerListChats />
      </Box>
    </Box>
  );
};

export default UBMessengerList;
