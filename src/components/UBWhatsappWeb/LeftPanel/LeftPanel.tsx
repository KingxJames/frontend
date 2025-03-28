import React, { useState } from "react";
import { Box, IconButton, Avatar, Input, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import UBCustomMenuButton from "../../../common/UBCustomMenuButton/UBCustomMenuButton";
import { UBChatCard } from "../../../common/UBChatCard/UBChatCard";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";
import { rightPanelMenuItems } from "../../../common/utils/constant";

interface LeftPanelProps {
  onSelectChat: (chat: ChatCardType) => void;
}

const localChats: ChatCardType[] = [
  {
    name: "Balram",
    lastText: "Hey there testing WhatsApp",
    lastSeen: "4:21 PM",
    selected: false,
    category: "all",
    role: "admin",
    avatarUrl: "https://via.placeholder.com/120", // Sample avatar URL
  },
  {
    name: "Dev Stack",
    lastText: "This is an emergency message",
    lastSeen: "8:51 PM",
    selected: false,
    category: "emergency",
    role: "Super Admin",
    avatarUrl: "https://via.placeholder.com/120",
  },
  {
    name: "John Doe",
    lastText: "This is an anonymous message",
    lastSeen: "7:30 PM",
    selected: false,
    category: "anonymous",
    role: "Staff",
    avatarUrl: "https://via.placeholder.com/120",
  },
];

export const LeftPanel: React.FC<LeftPanelProps> = ({ onSelectChat }) => {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Handle tab change
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Handle chat selection
  const handleChatSelect = (chat: ChatCardType) => {
    setSelectedChat(chat.name);
    onSelectChat(chat);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter chats based on the selected tab and search query
  const filteredChats = localChats
    .filter((chat) => {
      if (value === 0) return true;
      if (value === 1) return chat.category === "emergency";
      if (value === 2) return chat.category === "anonymous";
      return false;
    })
    .filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    ); // Search filtering

  return (
    <Box height="100%" width="100%" overflow="hidden">
      <UBCustomAppBar>
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Avatar />
        </Box>
      </UBCustomAppBar>

      {/* Search Bar */}
      <Box
        sx={{ background: "rgba(224, 218, 218, 0.1)", padding: "12px" }}
        display="flex"
      >
        <Box
          display="flex"
          sx={{
            background: "rgba(151, 151, 151, 0.2)",
            borderRadius: "8px",
            padding: "0px 8px",
            flex: 1,
            alignItems: "center",
          }}
        >
          <IconButton>
            <SearchIcon
              sx={{
                color: "rgba(51, 51, 51, 0.1)",
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
          <Input
            fullWidth
            disableUnderline
            placeholder="Search or start a new chat"
            sx={{
              height: "35px",
              color: "rgba(0, 0, 0, 0.52)",
              padding: "0px 13px",
              fontSize: "14px",
            }}
            value={searchQuery}
            onChange={handleSearchChange} // Handle input change
          />
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="chat categories"
        sx={{ background: "rgba(224, 218, 218, 0.1)" }}
      >
        <Tab label="All" value={0} />
        <Tab label="Emergency" value={1} />
        <Tab label="Anonymous" value={2} />
      </Tabs>

      {/* Chat List */}
      <Box
        overflow="auto"
        height="90%"
        sx={{ background: "rgba(224, 218, 218, 0.1)" }}
      >
        {filteredChats.length > 0 ? (
          filteredChats.map((item) => (
            <Box
              key={item.name}
              onClick={() => handleChatSelect(item)}
              sx={{
                backgroundColor:
                  item.category === "emergency"
                    ? "rgba(255, 0, 0, 0.2)" // Red background for emergency messages
                    : item.category === "anonymous"
                    ? "rgba(89, 175, 197, 0.2)" // Blue background for anonymous messages
                    : selectedChat === item.name
                    ? "rgba(224, 218, 218, 0.75)"
                    : "transparent",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
            >
              <UBChatCard item={item} />
            </Box>
          ))
        ) : (
          <Box textAlign="center" padding="20px">
            No messages found.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LeftPanel;
