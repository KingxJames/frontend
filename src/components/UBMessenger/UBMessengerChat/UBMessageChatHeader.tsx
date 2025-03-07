import React from "react";
import { Box, Avatar } from "@mui/material";

interface UBMessageChatHeaderProps {
  name: string;
  onOpen: () => void;
}

export const UBMessageChatHeader: React.FC<UBMessageChatHeaderProps> = ({
  name,
  onOpen,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "8vh",
        borderBottom: "1px solid #f1f1f1",
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(146, 146, 146, 0.12)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // Softer shadow for depth
      }}
    >
      <span
        onClick={onOpen} // Opens UBMessengerDetail
        className="hidden lg:flex items-center space-x-2 text-right"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "2%",
          cursor: "pointer",
        }}
      >
        <Avatar
          alt="User Avatar"
          src={"/static/images/avatar/1.jpg"}
          sx={{ marginRight: "10px" }}
        />
        <span className="text-sm font-medium text-black dark:text-white">
          {name}
        </span>
      </span>
    </Box>
  );
};

export default UBMessageChatHeader;
