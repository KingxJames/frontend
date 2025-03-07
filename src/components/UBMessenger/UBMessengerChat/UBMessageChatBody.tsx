import React from "react";
import { Box, Typography } from "@mui/material";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

interface UBMessageChatBodyProps {
  messages: Message[];
}

export const UBMessageChatBody: React.FC<UBMessageChatBodyProps> = ({ messages }) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        height: "calc(100vh - 16vh)", // Adjusting for header and footer
      }}
    >
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            justifyContent: message.sender === "me" ? "flex-end" : "flex-start",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              maxWidth: "60%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: message.sender === "me" ? "rgb(162, 94, 175)" : "#e0e0e0",
              color: message.sender === "me" ? "white" : "black",
              wordWrap: "break-word",
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
            <Typography variant="caption" sx={{ display: "block", textAlign: "right", marginTop: "5px" }}>
              {message.timestamp}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UBMessageChatBody;
