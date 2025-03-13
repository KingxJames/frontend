import React from "react";
import { Box } from "@mui/material";


interface UBCustomAppBarProps {
 children?: any;
}

export const UBCustomAppBar: React.FC<UBCustomAppBarProps> = ({ children }) => {
  return (
    <Box width="100%" height="60px" sx={{ backgroundColor: "rgba(230, 230, 230, 0.25)", padding: "8px 20px" }}>
      {children}
    </Box>
  );
};

export default UBCustomAppBar;
