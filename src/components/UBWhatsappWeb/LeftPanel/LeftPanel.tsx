import React from "react";
import { Box, IconButton, Avatar, Input, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import { UBChatCard } from "../../../common/UBChatCard/UBChatCard";
import { ChatCardType } from "../../../common/utils/LeftPanel.types.ts"; // Ensure this path is correct
import {
  setActiveTab,
  setSearchQuery,
  selectChat,
  selectFilteredChats,
  selectSelectedChat,
} from "../../../../store/features/UBWhatsappSlice/leftPanelSlice";
import { RootState } from "../../../../store/store"; // Adjust the path based on your project structure

interface LeftPanelProps {
  onSelectChat: (chat: ChatCardType) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ onSelectChat }) => {
  const dispatch = useDispatch();
  const filteredChats = useSelector(selectFilteredChats);
  const selectedChat = useSelector(selectSelectedChat);

  // Handle tab change
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setActiveTab(newValue));
  };

  // Handle chat selection
  const handleChatSelect = (chat: ChatCardType) => {
    dispatch(selectChat(chat.name));
    onSelectChat(chat);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <Box height="100%" width="100%" overflow="hidden">
      {/* Search Bar */}
      <Box
        sx={{ background: "rgba(224, 218, 218, 0.1)", padding: "12px", marginTop: "10px" }}
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
            onChange={handleSearchChange} // Handle input change
          />
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={useSelector((state: RootState) => state.leftPanel.activeTab)}
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
