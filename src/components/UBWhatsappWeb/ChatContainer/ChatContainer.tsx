import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UBOwnMessageCard from "../../../common/UBChatCard/UBOwnMessageCard";
import UBReplyCard from "../../../common/UBChatCard/UBReplyCard";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";

interface ChatContainerProps {
  selectedChat: ChatCardType;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  selectedChat,
}) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  useEffect(() => {
    if (selectedChat) {
      // Add the last message from the selected chat
      setMessages([
        { sender: "you", text: `Hey ${selectedChat.name}, how are you?` },
        { sender: selectedChat.name, text: selectedChat.lastText },
      ]);
    }
  }, [selectedChat]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1% 6%",
        gap: ".5rem",
        overflowY: "auto",
        backgroundColor: "white",
      }}
    >
      {messages.map((message, index) =>
        message.sender === "you" ? (
          <UBOwnMessageCard key={index} text={message.text} />
        ) : (
          <UBReplyCard
            key={index}
            text={message.text}
            sender={message.sender}
          />
        )
      )}
    </Box>
  );
};

export default ChatContainer;
