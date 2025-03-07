import React, { useState } from "react";
import { Box } from "@mui/material";
import { UBMessageChatHeader } from "./UBMessageChatHeader";
import { UBMessageChatBody } from "./UBMessageChatBody";
import { UBMessengerChatFooter } from "./UBMessageChatFooter";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other"; // 'me' for user, 'other' for received messages
  timestamp: string;
}

interface UBMessengerChatProps {
  onOpenDetail: () => void;
}

export const UBMessengerChat: React.FC<UBMessengerChatProps> = ({
  onOpenDetail,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello!", sender: "other", timestamp: "10:00 AM" },
  ]);

  const sendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...messages, newMessage]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <UBMessageChatHeader name="John Doe" onOpen={onOpenDetail} />
      <UBMessageChatBody messages={messages} />
      <UBMessengerChatFooter onSendMessage={sendMessage} />
    </Box>
  );
};

export default UBMessengerChat;
