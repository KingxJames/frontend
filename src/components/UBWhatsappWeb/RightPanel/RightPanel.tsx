import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Input,
  Typography,
  Avatar,
  Button,
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
import AttachmentPopOver from "../../../common/utils/AttachmentPopOver";
import UBWhatsappDetail from "../../UBWhatsappWeb/UBWhatsAppDetail/UBWhatsappDetail";

interface RightPanelProps {
  selectedChat: { name: string; lastText: string } | null;
  setShowDetailPanel: (value: boolean) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  selectedChat,
  setShowDetailPanel,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState<{
    [key: string]: { sender: string; text: string; file: string | null }[];
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDetailPanel, setShowDetailPanelState] = useState(false);
  const [sharedImages, setSharedImages] = useState<
    Array<{ src: string; alt: string }>
  >([]);

  // Update shared images when messages change
  // useEffect(() => {
  //   if (selectedChat) {
  //     const chatMessages = messages[selectedChat.name] || [];
  //     const imageMessages = chatMessages
  //       .filter(
  //         (msg) =>
  //           msg.file &&
  //           (msg.file.startsWith("blob") ||
  //             msg.file.match(/\.(jpeg|jpg|png|gif)$/i))
  //       )
  //       .map((msg) => ({
  //         src: msg.file as string,
  //         alt: `Image shared by ${msg.sender}`,
  //       }));

  //     setSharedImages(imageMessages);

  //     // Make this data available to parent component through a custom event
  //     window.dispatchEvent(
  //       new CustomEvent("sharedImagesUpdated", {
  //         detail: { chatName: selectedChat.name, images: imageMessages },
  //       })
  //     );
  //   }
  // }, [messages, selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      const chatMessages = messages[selectedChat.name] || [];
      const imageMessages = chatMessages
        .filter(
          (msg) =>
            msg.file &&
            (msg.file.startsWith("blob") ||
              msg.file.match(/\.(jpeg|jpg|png|gif)$/i))
        )
        .map((msg) => ({
          src: msg.file as string,
          alt: `Image shared by ${msg.sender}`,
        }));

      setSharedImages(imageMessages);
    }
  }, [messages, selectedChat]);

  const handleSendMessage = () => {
    if ((!textValue.trim() && !filePreview) || !selectedChat) return;

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat.name]: [
        ...(prevMessages[selectedChat.name] || []),
        { sender: "you", text: textValue, file: filePreview },
      ],
    }));

    setTextValue("");
    setFilePreview(null);
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(file.name);
    }
  };

  const filteredMessages = selectedChat
    ? (messages[selectedChat.name] || []).filter((msg) =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Function to handle showing details panel
  const handleShowDetailPanel = () => {
    setShowDetailPanelState(true);
    setShowDetailPanel(true);
  };

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="row">
      <Box flex={1} display="flex" flexDirection="column">
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
              onClick={handleShowDetailPanel}
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
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(59, 59, 59)" }}
                    >
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

        {/* Chat Container with Scroll */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            overflow: "hidden", // Hide overflow on the container
            position: "relative", // For proper child element positioning
          }}
        >
          {selectedChat ? (
            <Box
              sx={{
                height: "100%",
                overflowY: "auto", // Enable vertical scrolling
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                width="100%"
                padding="3rem 0 0 4rem"
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

              {/* Messages */}
              {filteredMessages.length > 0 && (
                <Box display="flex" flexDirection="column">
                  {filteredMessages.map((msg, index) => (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent={
                        msg.sender === "you" ? "flex-end" : "flex-start"
                      }
                      width="auto"
                      padding=".5%"
                      marginRight={msg.sender === "you" ? "6.5%" : "0"}
                    >
                      <Paper
                        sx={{
                          backgroundColor:
                            msg.sender === "you"
                              ? "rgb(142, 80, 155)"
                              : "rgb(223, 223, 223)",
                          display: "flex",
                          alignSelf: "flex-end",
                          maxWidth: "60%",
                          textAlign: "start",
                          padding: ".5rem .8rem",
                          flexDirection: "column",
                          borderRadius: ".625rem",
                          position: "relative",
                          wordBreak: "break-word",
                          "&::after": {
                            content: '""',
                            border: "20px solid transparent",
                            position: "absolute",
                            top: 0,
                            right: msg.sender === "you" ? "-1.25rem" : "unset",
                            left: msg.sender === "you" ? "unset" : "-1.25rem",
                            borderTopRightRadius:
                              msg.sender === "you" ? ".5rem" : "unset",
                            borderTopLeftRadius:
                              msg.sender === "you" ? "unset" : ".5rem",
                            borderTopColor:
                              msg.sender === "you"
                                ? "rgb(142, 80, 155)"
                                : "rgb(223, 223, 223)",
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          color={
                            msg.sender === "you" ? "white" : "text.primary"
                          }
                        >
                          {msg.text}
                        </Typography>

                        {/* If the message contains a file */}
                        {msg.file && (
                          <Box display="flex" flexDirection="column" mt={1}>
                            {/* If it's an image, show preview */}
                            {msg.file.startsWith("blob") ||
                            msg.file.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                              <img
                                src={msg.file}
                                alt="Sent file"
                                width="100px"
                                height="100px"
                                style={{
                                  borderRadius: "6px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{ wordBreak: "break-word" }}
                              >
                                {msg.file.split("/").pop()}
                              </Typography>
                            )}

                            {/* Download button */}
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ mt: 1 }}
                              component="a"
                              href={msg.file}
                              download
                            >
                              Download
                            </Button>
                          </Box>
                        )}
                      </Paper>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                backgroundColor: "rgba(182, 182, 182, 0.53)",
              }}
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
          height="auto"
          display="flex"
          flexDirection="column"
          sx={{
            background: "rgba(161, 161, 161, 0.1)",
            padding: "10px 15px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Preview Section */}
          {filePreview && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={1}
              borderRadius="6px"
              bgcolor="rgba(0, 0, 0, 0.1)"
              mb={1}
              width="100%"
              maxWidth="100%"
            >
              {filePreview.startsWith("blob") ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  width="70px"
                  height="70px"
                  style={{ borderRadius: "6px", objectFit: "cover" }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "80%",
                  }}
                >
                  {filePreview}
                </Typography>
              )}
              <IconButton onClick={() => setFilePreview(null)}>❌</IconButton>
            </Box>
          )}

          {/* Input & Actions Section */}
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <MoodIcon />
            </IconButton>

            <AttachmentPopOver onFileSelect={handleFileSelect} />

            <Box flex={1} pl="10px">
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
    </Box>
  );
};

export default RightPanel;
