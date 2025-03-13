import React, { useState } from "react";
import { Box, IconButton, Input, Typography, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoodIcon from "@mui/icons-material/Mood";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import UBCustomMenuButton from "../../../common/UBCustomMenuButton/UBCustomMenuButton";
import { rightPanelMenuItems } from "../../../common/utils/constant";
import AttachmentPopOver from "../../../common/utils/AttachmentPopOver";

import ChatContainer from "../ChatContainer/ChatContainer";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";
import UB_Logo from "../../../images/UB_Logo.png";
import UBWhatsappDetail from "../UBMessengerDetail/UBWhatsappDetail";

interface RightPanelProps {
  selectedChat: ChatCardType | null;
}

export const RightPanel: React.FC<RightPanelProps> = ({ selectedChat }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  // Function to send a message
  const handleSendMessage = () => {
    if (!textValue.trim()) return; // Prevent sending empty messages

    const newMessage = { sender: "you", text: textValue };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTextValue(""); // Clear input after sending
  };

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      {/* Top Bar */}
      <UBCustomAppBar>
        <Box
          width="100%"
          height={"100%"}
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display="flex">
            <Avatar />
            <Box
              display="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
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
            <IconButton>
              <SearchIcon sx={{ color: "rgba(59, 59, 59, 0.39)" }} />
            </IconButton>
            <UBCustomMenuButton menuItems={rightPanelMenuItems} />
          </Box>
        </Box>
      </UBCustomAppBar>

      {/* Chat Container */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        position="relative"
        sx={{ backgroundColor: "rgba(190, 190, 190, 0.53)" }}
      >
        <Box height="100%" width="100%">
          {selectedChat ? (
            <ChatContainer selectedChat={selectedChat} messages={messages} />
          ) : (
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
          )}
        </Box>
      </Box>

      {/* Message Input */}
      <Box
        height="62px"
        alignItems="center"
        display="flex"
        zIndex="1000"
        sx={{
          background: "rgba(161, 161, 161, 0.1)",
          padding: "0px 15px",
        }}
      >
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <MoodIcon />
        </IconButton>
        <AttachmentPopOver />
        <Box flex={1} pl="5px" pr="5px">
          <Input
            fullWidth
            disableUnderline
            placeholder="Type a message"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSendMessage(); // Send on Enter
            }}
            sx={{
              background: "rgb(223, 223, 223)",
              height: "42px",
              borderRadius: "6px",
              color: "rgb(41, 41, 41)",
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

       {/* Show Detail Panel */}
       {showDetailPanel && (
        <UBWhatsappDetail
          onClose={() => {
            setShowDetailPanel(false);
            setShowEmojiPicker(false); // Close emoji picker when closing the panel
          }}
          name="John Doe"
          role="Admin"
        />
      )}
    </Box>
  );
};

export default RightPanel;
