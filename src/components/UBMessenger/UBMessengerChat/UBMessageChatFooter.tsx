import React, { useState } from "react";
import { Box, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface UBMessengerChatFooterProps {
  onSendMessage: (text: string) => void;
}

export const UBMessengerChatFooter: React.FC<UBMessengerChatFooterProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "8vh",
        borderTop: "1px solid #f1f1f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(146, 146, 146, 0.12)",
        boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
        padding: " 1rem",
        boxSizing: "border-box",
      }}
    >
      <Input
        type="text"
        placeholder="Type a message..."
        disableUnderline
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()} // Send on Enter key press
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "12px",
          marginRight: "1rem",
        }}
      />
      <SendIcon sx={{ cursor: "pointer" }} onClick={handleSend} />
    </Box>
  );
};

export default UBMessengerChatFooter;
