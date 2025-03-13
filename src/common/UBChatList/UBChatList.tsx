import React, { useState } from "react";
import { Box } from "@mui/material";
import { UBChatCard } from "../../common/UBChatCard/UBChatCard";
import { ChatCardType } from "../../common/utils/LeftPanel.types";

interface LeftPanelProps {
  onSelectChat: (chat: ChatCardType) => void;
}

const localChats: ChatCardType[] = [
  {
    name: "James Doe",
    lastText: "This is an anonymous message",
    lastSeen: "7:30 PM",
    selected: false,
    category: "anonymous",
  },
  {
    name: "Balram",
    lastText: "Hey there testing WhatsApp",
    lastSeen: "4:21 PM",
    selected: false,
    category: "all",
  },
  {
    name: "Dev Stack",
    lastText: "This is an emergency message",
    lastSeen: "8:51 PM",
    selected: false,
    category: "emergency",
  },
  {
    name: "John",
    lastText: "This is an anonymous message",
    lastSeen: "7:30 PM",
    selected: false,
    category: "anonymous",
  },
  {
    name: "david",
    lastText: "This is an anonymous message",
    lastSeen: "7:30 PM",
    selected: false,
    category: "anonymous",
  },
  {
    name: "Jon Doe",
    lastText: "This is an anonymous message",
    lastSeen: "7:30 PM",
    selected: false,
    category: "anonymous",
  },
  {
    name: "James Doe",
    lastText: "This is an anonymous message",
    lastSeen: "7:30 PM",
    selected: false,
    category: "anonymous",
  },
];

export const UBChatList: React.FC = () => {
  const [value, setValue] = useState(0);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Filter chats based on the selected tab
  const filteredChats = localChats
    .filter((chat) => {
      if (value === 0) return true;
      if (value === 1) return chat.category === "emergency";
      if (value === 2) return chat.category === "anonymous";
      return false;
    })
    .slice(0, 6); // Always show only the first 6 messages

  // Handle chat selection
  const handleChatSelect = (chat: ChatCardType) => {
    setSelectedChat(chat.name);
  };

  return (
    <Box
      overflow="hidden" // Ensures no scrolling
      height="90%"
      sx={{ background: "rgba(224, 218, 218, 0.1)" }}
    >
      {filteredChats.length > 0 ? (
        filteredChats.map((item) => (
          <Box key={item.name}>
            <UBChatCard item={item} />
          </Box>
        ))
      ) : (
        <Box textAlign="center" padding="20px">
          No messages found.
        </Box>
      )}
    </Box>
  );
};

export default UBChatList;
