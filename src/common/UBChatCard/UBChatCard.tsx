import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface ChatCardProps {
  item: {
    id: number;
    name: string;
    lastSeen: string;
    lastText: string;
    selected?: boolean;
    profilePic?: string;
    messageCategoryId?: number;
  };
  onClick?: () => void;
}

export const UBChatCard: React.FC<ChatCardProps> = ({ item, onClick }) => {
  const { name, lastSeen, lastText, selected = false, profilePic } = item;

  // Format the last seen time if needed
  const formatLastSeen = (timestamp: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Truncate long messages
  const truncateText = (text: string, maxLength = 30) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Box
      display="flex"
      onClick={onClick}
      sx={{
        background: selected ? "rgba(224, 218, 218, 0.75)" : "transparent",
        padding: "8px 12px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(224, 218, 218, 0.4)",
        },
        transition: "background-color 0.3s ease",
      }}
    >
      <Avatar
        src={profilePic}
        alt={name}
        sx={{
          width: 56,
          height: 56,
          border: selected ? "2px solid #008069" : "none",
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        pl="15px"
        width="100%"
        alignItems="flex-start"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatLastSeen(lastSeen)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {truncateText(lastText)}
        </Typography>
        <Box
          width="100%"
          mt="13px"
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        />
      </Box>
    </Box>
  );
};
