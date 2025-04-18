import React, { useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import UBCustomAppBar from "../../../common/UBCustomAppBar/UBCustomAppBar";
import UB_Logo from "../../../images/UB_Logo.png";
import AttachmentPopOver from "../../../common/utils/AttachmentPopOver";
import {
  addMessage,
  addFilePreviews,
  removeFilePreview,
  clearFilePreviews,
  setSearchQuery,
  toggleSearchBar,
  setCurrentMessageText,
  toggleEmojiPicker,
  addEmoji,
  selectFilteredMessages,
  selectFilePreviews,
  selectCurrentMessageText,
  selectShowSearchBar,
  selectShowEmojiPicker,
  selectSearchQuery,
} from "../../../../store/features/UBWhatsappSlice/messageSlice";

interface RightPanelProps {
  selectedChat: { id: string; name: string; lastText: string } | null;
  setShowDetailPanel: (value: boolean) => void;
  setSharedImagesMap: React.Dispatch<
    React.SetStateAction<Record<string, Array<{ src: string; alt: string }>>>
  >;
}

const useRef = React.useRef;

export const RightPanel: React.FC<RightPanelProps> = ({
  selectedChat,
  setShowDetailPanel,
  setSharedImagesMap,
}) => {
  const dispatch = useDispatch();
  const filteredMessages = useSelector(
    selectFilteredMessages(selectedChat?.id || "")
  );
  const filePreviews = useSelector(selectFilePreviews);
  const textValue = useSelector(selectCurrentMessageText);
  const showSearchBar = useSelector(selectShowSearchBar);
  const showEmojiPicker = useSelector(selectShowEmojiPicker);
  const searchQuery = useSelector(selectSearchQuery);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Then update your useEffect like this:
  useEffect(() => {
    if (!selectedChat) return;

    // Only update if we actually have image messages
    const hasImageMessages = filteredMessages.some(
      (msg) =>
        msg.files &&
        msg.files.some(
          (file) =>
            file.url.startsWith("blob") ||
            file.url.match(/\.(jpeg|jpg|png|gif|mp4|mov|avi)$/i)
        )
    );

    if (hasImageMessages) {
      const imageMessages = filteredMessages
        .filter(
          (msg) =>
            msg.files &&
            msg.files.some(
              (file) =>
                file.url.startsWith("blob") ||
                file.url.match(/\.(jpeg|jpg|png|gif|mp4|mov|avi)$/i)
            )
        )
        .flatMap((msg) =>
          (msg.files || [])
            .filter(
              (file) =>
                file.url.startsWith("blob") ||
                file.url.match(/\.(jpeg|jpg|png|gif|mp4|mov|avi)$/i)
            )
            .map((file) => ({
              src: file.url,
              alt: `Media shared by ${msg.sender}`,
            }))
        );

      setSharedImagesMap((prev) => {
        // Only update if the images actually changed
        const currentImages = prev[selectedChat.id] || [];
        if (JSON.stringify(currentImages) !== JSON.stringify(imageMessages)) {
          return {
            ...prev,
            [selectedChat.id]: imageMessages,
          };
        }
        return prev;
      });
    }
  }, [filteredMessages, selectedChat, setSharedImagesMap]);

  // Update your handleSendMessage function to this:
  const handleSendMessage = () => {
    if ((!textValue.trim() && filePreviews.length === 0) || !selectedChat)
      return;

    dispatch(
      addMessage({
        chatId: selectedChat.id,
        sender: "you",
        text: textValue,
        files: filePreviews.length > 0 ? [...filePreviews] : null,
      })
    );

    // Reset input
    dispatch(setCurrentMessageText(""));
    dispatch(clearFilePreviews());
  };

  // In RightPanel.tsx
  const handleFileSelect = (files: File[]) => {
    const newFilePreviews = files.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        id: `${file.name}-${Date.now()}`,
        url,
        name: file.name,
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : "file",
      };
    });

    dispatch(addFilePreviews(newFilePreviews));
  };

  const handleRemoveFilePreview = (id: string) => {
    const fileToRemove = filePreviews.find((file) => file.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    dispatch(removeFilePreview(id));
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      filePreviews.forEach((file) => {
        URL.revokeObjectURL(file.url);
      });
    };
  }, [filePreviews]);

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  // Function to handle showing details panel
  const handleShowDetailPanel = () => {
    setShowDetailPanel(true);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    dispatch(addEmoji(emojiData.emoji));
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
              <IconButton onClick={() => dispatch(toggleSearchBar())}>
                <SearchIcon sx={{ color: "rgba(59, 59, 59, 0.39)" }} />
              </IconButton>
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
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
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
              {/* Initial message */}
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
                      key={msg.id}
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
                        {msg.text && (
                          <Typography
                            variant="body2"
                            color={
                              msg.sender === "you" ? "white" : "text.primary"
                            }
                          >
                            {msg.text}
                          </Typography>
                        )}

                        {/* If the message contains a file */}
                        {/* Display multiple files */}
                        {msg.files && msg.files.length > 0 && (
                          <Box
                            display="flex"
                            flexDirection="column"
                            mt={1}
                            gap={1}
                          >
                            {msg.files.map((file, fileIndex) => (
                              <Box key={fileIndex}>
                                {file.type === "image" ? (
                                  <img
                                    src={file.url}
                                    alt={`Image ${fileIndex + 1}`}
                                    width="100px"
                                    height="100px"
                                    style={{
                                      borderRadius: "6px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : file.type === "video" ? (
                                  <video
                                    controls
                                    width="200px"
                                    height="auto"
                                    style={{
                                      borderRadius: "6px",
                                      objectFit: "cover",
                                    }}
                                  >
                                    <source
                                      src={file.url}
                                      type={`video/${file.url
                                        .split(".")
                                        .pop()}`}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    sx={{ wordBreak: "break-word" }}
                                  >
                                    {file.name}
                                  </Typography>
                                )}

                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{ mt: 1 }}
                                  component="a"
                                  href={file.url}
                                  download={file.name}
                                >
                                  Download
                                </Button>
                              </Box>
                            ))}
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

          <div ref={messagesEndRef} />
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
          {filePreviews.length > 0 && (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              p={1}
              borderRadius="6px"
              bgcolor="rgba(0, 0, 0, 0.1)"
              mb={1}
              maxHeight="150px"
              overflow="auto"
            >
              {filePreviews.map((file) => (
                <Box
                  key={file.id}
                  position="relative"
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  {file.type === "image" ? (
                    <img
                      src={file.url}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : file.type === "video" ? (
                    <video
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <source
                        src={file.url}
                        type={`video/${file.url.split(".").pop()}`}
                      />
                    </video>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      height="100%"
                      bgcolor="white"
                    >
                      <Typography variant="caption" textAlign="center">
                        {file.name}
                      </Typography>
                    </Box>
                  )}
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    onClick={() => removeFilePreview(file.id)}
                  >
                    ×
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      padding: "0 4px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Input & Actions Section */}
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => dispatch(toggleEmojiPicker())}>
              <MoodIcon />
            </IconButton>

            <AttachmentPopOver
              onFileSelect={handleFileSelect}
              multiple // Enable multiple file selection
            />

            <Box flex={1} pl="10px">
              <Input
                fullWidth
                disableUnderline
                placeholder="Type a message"
                value={textValue}
                onChange={(event) =>
                  dispatch(setCurrentMessageText(event.target.value))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                sx={{
                  background: "rgb(223, 223, 223)",
                  height: "42px",
                  borderRadius: "6px",
                  padding: "0px 10px",
                }}
              />
            </Box>

            <IconButton
              onClick={handleSendMessage}
              disabled={!textValue.trim() && filePreviews.length === 0}
            >
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
            onEmojiClick={handleEmojiClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default RightPanel;
