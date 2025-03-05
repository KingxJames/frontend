import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBox from "../../../common/search/search";
import UBTabs from "../../../common/search/Tabs/tabs";

export const UBMessengerListHeader: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography
        sx={{ fontSize: "20px", fontWeight: "bold", padding: "5% 0 2% 5%" }}
      >
        Chats
      </Typography>

      <Box sx={{ pb: "3%", pt: "2%" }}>
        <SearchBox />
      </Box>

      <Box sx={{}}>
        <UBTabs />
      </Box>
    </Box>
  );
};

export default UBMessengerListHeader;
