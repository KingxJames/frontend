import React, { useState } from "react";
import { Box, Icon, Input, IconButton, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoodIcon from "@mui/icons-material/Mood";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import UBCustomMenuButton from "../../../common/UBCustomMenuButton/UBCustomMenuButton";
import { rightPanelMenuItems } from "../../../common/utils/constant";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import ChatContainer from "../ChatContainer/ChatContainer";

export const RightPanel: React.FC = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [textValue, setTextValue] = useState("");

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
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
              <Typography variant="body1" sx={{ color: "white" }}>
                James
              </Typography>
              <Typography variant="caption" sx={{ color: "white" }}>
                online
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            <IconButton onClick={() => {}}>
              <SearchIcon sx={{ color: "white" }}></SearchIcon>
            </IconButton>{" "}
            <UBCustomMenuButton menuItems={rightPanelMenuItems} />
          </Box>
        </Box>
      </UBCustomAppBar>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        position="relative"
        sx={{ backgroundColor: "green" }} // Chat background
      >
        <Box
          height="100%"
          width="100%"
          component="div"
          sx={{
            backgroundColor: "white",
          }}
        >
          <ChatContainer />
        </Box>
      </Box>

      <Box
        height="62px"
        alignItems="center"
        display="flex"
        zIndex="1000"
        sx={{
          background: "#1f2c33",
          padding: "0px 15px",
        }}
      >
        <IconButton
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
          }}
        >
          <MoodIcon />
        </IconButton>
        <AttachFileIcon />
        <Box flex={1} pl="5px" pr="5px">
          <Input
            fullWidth
            disableUnderline
            placeholder="Type a message"
            value={textValue}
            onChange={(event: any) => {
              setTextValue(event.target.value);
            }}
            sx={{
              background: "#2b3943",
              height: "42px",
              borderRadius: "6px",
              color: "white",
              padding: "0px 10px",
            }}
          />
        </Box>
        <IconButton onClick={() => {}}>
          <MicIcon />
        </IconButton>
      </Box>
      {showEmojiPicker && (
        <EmojiPicker
          height="45%"
          width="100%"
          previewConfig={{
            showPreview: false,
          }}
          onEmojiClick={(emojiData: EmojiClickData) => {
            setTextValue(textValue + emojiData.emoji);
          }}
        />
      )}
    </Box>
  );
};

export default RightPanel;
