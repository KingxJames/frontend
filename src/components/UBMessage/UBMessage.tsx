import React, { useState } from 'react';
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import UBSidebar from "../UBSidebar/UBSidebar";
import { UBMyMessage } from "../../common/UBMyMessage/UBMyMessage";

export const UBMessage: React.FC = () => {

  return (
    <CssVarsProvider disableTransitionOnChange>
      {/* <CssBaseline />  */}
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: 0,
          overflow: 'hidden',  // Allows scrolling when content exceeds the height
          backgroundColor: 'background.body',
        }}
      >
        <UBMyMessage />
      </Box>
    </CssVarsProvider >
  );
};
