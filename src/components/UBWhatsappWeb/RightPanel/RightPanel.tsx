import React, { useState } from "react";
import {
  Box,
  IconButton,
  Input,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import UBCustomMenuButton from "../../../common/UBCustomMenuButton/UBCustomMenuButton";
import { rightPanelMenuItems } from "../../../common/utils/constant";
import UB_Logo from "../../../images/UB_Logo.png";

interface RightPanelProps {
  selectedChat: { name: string; lastText: string } | null;
  setShowDetailPanel: (value: boolean) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  selectedChat,
  setShowDetailPanel,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState<{
    [key: string]: { sender: string; text: string }[];
  }>({});
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSendMessage = () => {
    if (!textValue.trim() || !selectedChat) return;

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat.name]: [
        ...(prevMessages[selectedChat.name] || []),
        { sender: "you", text: textValue },
      ],
    }));

    setTextValue("");
  };

  const filteredMessages = selectedChat
    ? (messages[selectedChat.name] || []).filter((msg) =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      {/* Top Bar */}
      <UBCustomAppBar>
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            onClick={() => setShowDetailPanel(true)}
            sx={{ cursor: "pointer" }}
          >
            <Avatar />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              pl="10px"
            >
              {selectedChat ? (
                <>
                  <Typography variant="body1" sx={{ color: "rgb(59, 59, 59)" }}>
                    {selectedChat.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgb(59, 59, 59)" }}
                  >
                    online
                  </Typography>
                </>
              ) : (
                <Typography variant="h6"></Typography>
              )}
            </Box>
          </Box>
          <Box display="flex">
            <IconButton onClick={() => setShowSearchBar(!showSearchBar)}>
              <SearchIcon sx={{ color: "rgba(59, 59, 59, 0.39)" }} />
            </IconButton>
            <UBCustomMenuButton menuItems={rightPanelMenuItems} />
          </Box>
        </Box>
      </UBCustomAppBar>

      {/* Search Bar */}
      {showSearchBar && (
        <Box padding="8px" display="flex" sx={{ background: "#f3f3f3" }}>
          <Input
            fullWidth
            disableUnderline
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              background: "white",
              height: "35px",
              borderRadius: "6px",
              padding: "0px 10px",
            }}
          />
        </Box>
      )}

      {/* Chat Container */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      >
        {selectedChat ? (
          <>
            <Box
              display="flex"
              justifyContent="flex-start"
              width="100%"
              padding="4rem 0 0 5rem"
            >
              <Paper
                sx={{
                  background: "rgb(223, 223, 223)",
                  display: "flex",
                  maxWidth: "75%",
                  textAlign: "start",
                  padding: ".5rem .8rem",
                  flexDirection: "column",
                  borderRadius: ".625rem",
                  position: "relative",
                  wordBreak: "break-word",
                  "&::after": {
                    content: '" "',
                    border: "20px solid transparent",
                    position: "absolute",
                    top: 0,
                    left: "-1.25rem",
                    borderTopLeftRadius: ".5rem",
                    borderTopColor: "rgb(223, 223, 223)",
                  },
                }}
              >
                <Typography variant="body2" color="text.primary">
                  {selectedChat.lastText}
                </Typography>
              </Paper>
            </Box>

            {/* The message that I sent */}
            {filteredMessages.length > 0 && (
              <Box display="flex" flexDirection="column" padding="1rem">
                {filteredMessages.map((msg, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="flex-end"
                    width="auto"
                    padding="2.5% 5.5%"
                  >
                    <Paper
                      sx={{
                        backgroundColor: "rgb(142, 80, 155)",
                        display: "flex",
                        alignSelf: "flex-end",
                        maxWidth: "60%",
                        textAlign: "start",
                        padding: ".5rem .8rem",
                        flexDirection: "column",
                        borderRadius: ".625rem",
                        position: "relative",
                        "&::after": {
                          content: '" "',
                          border: "20px solid transparent",
                          position: "absolute",
                          top: 0,
                          right: "-1.25rem",
                          borderTopRightRadius: ".5rem",
                          borderTopColor: "rgb(142, 80, 155)",
                        },
                      }}
                    >
                      <Typography variant="body2" color="white">
                        {msg.text}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{ height: "100%", backgroundColor: "rgba(182, 182, 182, 0.53)" }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20%",
              }}
            >
              Select a chat to start messaging
              <img src={UB_Logo} alt="UB Logo" />
            </Typography>
          </Box>
        )}
      </Box>

      {/* Message Input */}
      <Box
        height="62px"
        alignItems="center"
        display="flex"
        sx={{ background: "rgba(161, 161, 161, 0.1)", padding: "0px 15px" }}
      >
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <MoodIcon />
        </IconButton>
        <Box flex={1} pl="5px" pr="5px">
          <Input
            fullWidth
            disableUnderline
            placeholder="Type a message"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSendMessage();
            }}
            sx={{
              background: "rgb(223, 223, 223)",
              height: "42px",
              borderRadius: "6px",
              padding: "0px 10px",
            }}
          />
        </Box>
        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <EmojiPicker
          height="45%"
          width="100%"
          previewConfig={{ showPreview: false }}
          onEmojiClick={(emojiData: EmojiClickData) =>
            setTextValue((prev) => prev + emojiData.emoji)
          }
        />
      )}
    </Box>
  );
};

export default RightPanel;
