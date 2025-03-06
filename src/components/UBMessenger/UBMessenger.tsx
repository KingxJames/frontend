import React from "react";
import { Box } from "@mui/material";
import UBMessengerChat from "./UBMessengerChat/UBMessengerChat";
import UBMessengerDetail from "./UBMessengerDetail/UBMessengerDetail";
import UBMessengerList from "./UBMessengerList/UBMessengerList";

export const UBMessenger: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevents scrolling
      }}
    >
      <UBMessengerList />
      <UBMessengerChat />

      {/* <UBMessengerDetail /> */}
    </Box>
  );
};

export default UBMessenger;
