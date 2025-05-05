import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Input,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { ChatCardType } from "../../../common/utils/LeftPanel.types.ts";
import { useFetchMessagesQuery } from "../../../../store/services/UBWhatsappAPI/messageAPI.tsx";
import { useFetchUserQuery } from "../../../../store/services/userAPI";
import { setUsers, selectUsers } from "../../../../store/features/userSlice";
import { UBChatCard } from "./../../../common/UBChatCard/UBChatCard.tsx";
import { RootState } from "../../../../store/store.ts";

interface LeftPanelProps {
  onSelectChat: (chat: ChatCardType) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ onSelectChat }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // RTK Query hooks
  const { data: users, isLoading, isError } = useFetchUserQuery();
  const { data: messages } = useFetchMessagesQuery();

  // Update Redux store when users are fetched
  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  // Get users from Redux store
  const allUsers = useSelector((state: RootState) => selectUsers(state).users || []);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle chat selection
  const handleChatSelect = (user: ChatCardType) => {
    setSelectedChat(user.id.toString());
    onSelectChat(user);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter users based on active tab and search query
  const filteredUsers = React.useMemo(() => {
    if (!allUsers) return [];
    
    return allUsers.filter((user: any) => {
      // Filter by tab
      const tabMatch =
        activeTab === 0 || // All
        (activeTab === 1 && user.messageCategoryId === 1) || // Emergency
        (activeTab === 2 && user.messageCategoryId === 2); // Anonymous

      // Filter by search
      const searchMatch =
        searchQuery === "" ||
        (user.name && user.name.toLowerCase().includes(searchQuery)) ||
        (user.username && user.username.toLowerCase().includes(searchQuery));

      return tabMatch && searchMatch;
    });
  }, [allUsers, searchQuery, activeTab]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" padding="20px">
        Error loading users. Please try again later.
      </Box>
    );
  }

  return (
    <Box height="100%" width="100%" overflow="hidden">
      {/* Search Bar */}
      <Box
        sx={{
          background: "rgba(224, 218, 218, 0.1)",
          padding: "12px",
          marginTop: "10px",
        }}
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
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="chat categories"
        sx={{ background: "rgba(224, 218, 218, 0.1)" }}
      >
        <Tab label="All" value={0} />
        <Tab label="Emergency" value={1} />
        <Tab label="Anonymous" value={2} />
      </Tabs>

      {/* User List */}
      <Box
        overflow="auto"
        height="90%"
        sx={{ background: "rgba(224, 218, 218, 0.1)" }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Box
              key={user.id}
              onClick={() =>
                handleChatSelect({
                  id: user.id,
                  profilePic: user.profilePic || "default-profile-pic-url",
                  name: user.name || user.username,
                  lastText: user.lastMessage || "No messages yet",
                  lastSeen: user.lastSeen || "Online",
                  selected: selectedChat === user.id.toString(),
                  messageCategoryId: user.messageCategoryId || 0,
                })
              }
              sx={{
                backgroundColor:
                  user.messageCategoryId === 1 // Emergency
                    ? "rgba(255, 0, 0, 0.2)"
                    : user.messageCategoryId === 2 // Anonymous
                    ? "rgba(89, 175, 197, 0.2)"
                    : selectedChat === user.id.toString()
                    ? "rgba(224, 218, 218, 0.75)"
                    : "transparent",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
            >
              <UBChatCard
                item={{
                  id: user.id,
                  profilePic: user.profilePic || "default-profile-pic-url",
                  name: user.name || user.username,
                  lastText: user.lastMessage || "No messages yet",
                  lastSeen: user.lastSeen || "Online",
                  selected: selectedChat === user.id.toString(),
                  messageCategoryId: user.messageCategoryId || 0,
                }}
              />
            </Box>
          ))
        ) : (
          <Box textAlign="center" padding="20px">
            No users found.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LeftPanel;