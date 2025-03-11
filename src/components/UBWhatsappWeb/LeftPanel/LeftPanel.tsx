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


const localChats: ChatCardType[] = [
  {
    name: "Balram",
    lastText: "Hey there testing whatsapp",
    lastSeen: "4:21 PM",
    selected: true,
  },
  {
    name: "Dev Stack",
    lastText: "DevStack testing whatsapp",
    lastSeen: "8:51 PM",
    selected: false,
  },
  {
    name: "Test 1",
    lastText: "Testing okk how test test 123",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Test 2",
    lastText: "Testing Yes",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Test 3",
    lastText: "Ok Tested",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Test 4",
    lastText: "Yes",
    lastSeen: "8:51 PM",
    selected: false,
  },
  {
    name: "HDFC",
    lastText: "Take a lone",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Test 2",
    lastText: "Testing okk how test test 123",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Balram Rathore",
    lastText: "Hey there testing whatsapp",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Dev Stack",
    lastText: "DevStack testing whatsapp",
    lastSeen: "8:51 PM",
    selected: false,
  },
  {
    name: "Test 1",
    lastText: "Testing okk how test test 123",
    lastSeen: "4:21 PM",
    selected: false,
  },
  {
    name: "Test 2",
    lastText: "Testing okk how test test 123",
    lastSeen: "4:21 PM",
    selected: false,
  },
];

export const LeftPanel: React.FC = () => {
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
            <SearchIcon sx={{ color: "#8696a1", height: "20px", width: "20px" }} />
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
          <FilterListIcon sx={{ color: "#8696a1", height: "20px", width: "20px" }} />
        </IconButton>
      </Box>

      <Box
        overflow="auto"
        height="90%"
        sx={{
          background: "#101b20",
        }}
      >
        {localChats.map((item: ChatCardType) => {
          return <UBChatCard item={item} />;
        })}
        <Box pt="50px" />
      </Box>
    </Box>
  );
};

export default LeftPanel;
