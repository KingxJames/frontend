import React, { useState } from 'react';
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import UBSidebar from "../UBSidebar/UBSidebar";
import UBHeader from "../UBHeader/UBHeader";
import { UBMyMessage } from "../../common/UBMyMessage/UBMyMessage";

export const UBMessage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        {/* Sidebar */}
        <UBSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Wrapper */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          {/* <UBHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flex: 1,
              padding: 2,
              overflow: 'auto',  // Allows scrolling when content exceeds the height
              backgroundColor: 'background.body',
            }}
          >
            <UBMyMessage />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};
