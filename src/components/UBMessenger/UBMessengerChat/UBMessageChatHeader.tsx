import React from "react";
import { Box } from "@mui/material";
import { Typography, Avatar } from "@mui/material";

export const UBMessageChatHeader: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "8vh",
        borderBottom: "1px solid #f1f1f1",
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(146, 146, 146, 0.12)",
        boxShadow: "2px 1px 3px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span
        className="hidden lg:flex items-center space-x-2 text-right"
        style={{ display: "flex", alignItems: "center", marginLeft: "2%" }}
      >
        <Avatar alt="User Avatar" src={"/static/images/avatar/1.jpg"} sx={{ marginRight: "10px"}}/>
        <span className="text-sm font-medium text-black dark:text-white">
          John Doe
        </span>
      </span>
    </Box>
  );
};

export default UBMessageChatHeader;
