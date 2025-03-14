import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface ChatContainerProps {
  messages: { sender: string; text: string }[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      overflow="auto"
      padding="10px"
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent={msg.sender === "you" ? "flex-end" : "flex-start"}
          marginBottom="8px"
        >
          <Paper
            sx={{
              background: msg.sender === "you" ? "#DCF8C6" : "#EAEAEA",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "75%",
              wordBreak: "break-word",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatContainer;
