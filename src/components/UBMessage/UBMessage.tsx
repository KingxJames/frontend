import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import UBSidebar from "../UBSidebar/UBSidebar";
import { UBMyMessage } from "../../common/UBMyMessage/UBMyMessage";

export const UBMessage: React.FC = () => {
<<<<<<< HEAD

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
=======
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        {/* Sidebar */}

        {/* Main Content Wrapper */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flex: 1,
              padding: 0,
              overflow: "auto",
              backgroundColor: "background.body",
            }}
          >
            <UBMyMessage />
          </Box>
        </Box>
>>>>>>> 69ffdeb1667781c7da397988981e5b1a82801348
      </Box>
    </CssVarsProvider >
  );
};
