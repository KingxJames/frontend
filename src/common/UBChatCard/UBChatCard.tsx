import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { ChatCardType } from "../../common/utils/LeftPanel.types"; // Ensure this path is correct

interface ChatCardProps {
  item: ChatCardType;
}

export const UBChatCard: React.FC<ChatCardProps> = ({ item }) => {
  const { name, lastSeen, lastText, selected } = item;
  return (
    <Box
      display="flex"
      sx={{
        background: selected ? "rgba(224, 218, 218, 0.1)" : "rgba(224, 218, 218, 0.1)",
        padding: "8px 12px",
      }}
    >
      <Avatar />
      <Box
        display="flex"
        flexDirection="column"
        pl="15px"
        width="100%"
        alignItems="flex-start"
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="body1" color="rgba(59, 59, 59, 0.84)">
            {name}
          </Typography>
          <Typography variant="caption" color="rgba(59, 59, 59, 0.84)">
            {lastSeen}
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="rgba(59, 59, 59, 0.84)">
          {lastText}
        </Typography>
        <Box
          width="100%"
          mt="13px"
          sx={{
            
            border: ".01px solid rgba(143, 143, 143, 0.32)",
          }}
        />
      </Box>
    </Box>
  );
}