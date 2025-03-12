import React from "react";
import { Box, IconButton, Avatar, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import UBCustomMenuButton from "../../../common/UBCustomMenuButton/UBCustomMenuButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import { rightPanelMenuItems } from "../../../common/utils/constant";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";
import { UBChatCard } from "../../../common/UBChatCard/UBChatCard";

interface LeftPanelProps {
  onSelectChat: (chat: ChatCardType) => void;
}

const localChats: ChatCardType[] = [
  {
    name: "Balram",
    lastText: "Hey there testing WhatsApp",
    lastSeen: "4:21 PM",
    selected: true,
  },
  {
    name: "Dev Stack",
    lastText: "DevStack testing WhatsApp",
    lastSeen: "8:51 PM",
    selected: false,
  },
];

export const LeftPanel: React.FC<LeftPanelProps> = ({ onSelectChat }) => {
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
          <Box display="flex">
            <Avatar />
          </Box>
          <Box display="flex">
            <IconButton sx={{ paddingRight: "8px" }}>
              <ChatIcon sx={{ color: "white" }} />
            </IconButton>
            <UBCustomMenuButton menuItems={rightPanelMenuItems} />
          </Box>
        </Box>
      </UBCustomAppBar>

      <Box sx={{ background: "#101b20", padding: "12px" }} display="flex">
        <Box
          display="flex"
          sx={{
            background: "#1f2c33",
            borderRadius: "8px",
            padding: "0px 8px",
            flex: 1,
            alignItems: "center",
          }}
        >
          <IconButton>
            <SearchIcon
              sx={{ color: "#8696a1", height: "20px", width: "20px" }}
            />
          </IconButton>
          <Input
            fullWidth
            disableUnderline
            placeholder="Search or start a new chat"
            sx={{
              height: "35px",
              color: "white",
              padding: "0px 13px",
              fontSize: "14px",
            }}
          />
        </Box>
        <IconButton>
          <FilterListIcon
            sx={{ color: "#8696a1", height: "20px", width: "20px" }}
          />
        </IconButton>
      </Box>

      <Box overflow="auto" height="90%" sx={{ background: "#101b20" }}>
        {localChats.map((item) => (
          <div key={item.name} onClick={() => onSelectChat(item)}>
            <UBChatCard item={item} />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default LeftPanel;
