import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Input,
  Typography,
  Avatar,
  Button,
  Paper,
  CircularProgress,
  Badge,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Mood as MoodIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  selectMessages,
} from "../../../../store/features/UBWhatsappSlice/messageSlice.tsx";
import { RootState } from "../../../../store/store.ts";
import { IMessage } from "../../../../store/features/UBWhatsappSlice/messageSlice.tsx";

interface RightPanelProps {
  selectedChat: {
    id: string;
    name: string;
    profilePic: string;
    lastSeen?: string;
  } | null;
  onBack?: () => void;
  setShowDetailPanel: (value: boolean) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  selectedChat,
  onBack,
  setShowDetailPanel,
}) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filePreviews, setFilePreviews] = useState<
    Array<{
      id: string;
      url: string;
      name: string;
      type: string;
    }>
  >([]);

  // Get messages from Redux store
  const allMessages = useSelector((state: RootState) => selectMessages(state));

  // Filter messages for the selected chat
  const currentChatMessages = selectedChat
    ? allMessages.filter(
        (msg) => msg.messageCategoryId.toString() === selectedChat.id
      )
    : [];

  // Filter messages based on search query
  const filteredMessages = searchQuery
    ? currentChatMessages.filter(
        (msg) =>
          msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentChatMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChatMessages]);

  // Update the handleSendMessage function in RightPanel
  const handleSendMessage = async () => {
    if ((!textValue.trim() && filePreviews.length === 0) || !selectedChat)
      return;

    const newMessage: IMessage = {
      id: Date.now(), // Use timestamp as temporary ID
      profilePic: "", // Add current user's profile pic
      sender: "You", // Replace with actual username
      messageCategoryId: parseInt(selectedChat.id),
      images: filePreviews.map((file) => file.url).join(","),
      message: textValue,
      location: "",
      dateSent: new Date().toISOString(),
      isDeleted: false,
      type: filePreviews.length > 0 ? "media" : "text",
    };

    // Optimistically add to Redux store
    dispatch(addMessage(newMessage));

    // Clear input
    setTextValue("");
    setFilePreviews([]);
    scrollToBottom();
  };

  const handleFileSelect = (files: File[]) => {
    const newPreviews = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "file",
    }));
    setFilePreviews([...filePreviews, ...newPreviews]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setTextValue((prev) => prev + emojiData.emoji);
  };

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        p={2}
        sx={{
          backgroundColor: "#f0f2f5",
          borderBottom: "1px solid #e9edef",
          height: "60px",
        }}
      >
        {onBack && (
          <IconButton onClick={onBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <Box display="flex" alignItems="center" flex={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color="success"
          >
            <Avatar
              src={selectedChat?.profilePic}
              alt={selectedChat?.name}
              sx={{ width: 40, height: 40 }}
            />
          </Badge>

          <Box ml={2}>
            <Typography fontWeight="600">{selectedChat?.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {selectedChat?.lastSeen || "online"}
            </Typography>
          </Box>
        </Box>

        <Box>
          <IconButton onClick={() => setShowDetailPanel(true)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box p={1} sx={{ backgroundColor: "#f0f2f5" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            px: 2,
            py: 1,
          }}
        >
          <SearchIcon fontSize="small" color="action" />
          <Input
            fullWidth
            disableUnderline
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1, fontSize: "14px" }}
          />
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        flex={1}
        overflow="auto"
        p={2}
        sx={{
          backgroundImage:
            "url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png')",
          backgroundRepeat: "repeat",
          backgroundColor: "#e5ddd5",
          backgroundBlendMode: "luminosity",
        }}
      >
        {filteredMessages.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography color="text.secondary">
              {searchQuery ? "No messages found" : "No messages yet"}
            </Typography>
          </Box>
        ) : (
          filteredMessages.map((msg) => (
            <Box
              key={msg.id}
              display="flex"
              justifyContent={msg.sender === "You" ? "flex-end" : "flex-start"}
              mb={2}
            >
              <Box
                maxWidth="75%"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "You" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender !== "You" && (
                  <Typography variant="caption" color="text.secondary" mb={0.5}>
                    {msg.sender}
                  </Typography>
                )}

                <Paper
                  sx={{
                    backgroundColor: msg.sender === "You" ? "#d9fdd3" : "white",
                    padding: "8px 12px",
                    borderRadius:
                      msg.sender === "You"
                        ? "18px 18px 0 18px"
                        : "18px 18px 18px 0",
                    boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                  }}
                >
                  {msg.message && <Typography>{msg.message}</Typography>}

                  {msg.images &&
                    msg.images.split(",").map((img, idx) => (
                      <Box key={idx} mt={1}>
                        <img
                          src={img}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    ))}

                  <Typography
                    variant="caption"
                    display="block"
                    textAlign="right"
                    color="text.secondary"
                    mt={0.5}
                  >
                    {new Date(msg.dateSent).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input Area */}
      <Box
        p={2}
        sx={{
          backgroundColor: "#f0f2f5",
          position: "relative",
        }}
      >
        {showEmojiPicker && (
          <Box
            sx={{
              position: "absolute",
              bottom: "80px",
              left: 0,
              width: "100%",
              zIndex: 10,
            }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width="100%"
              height={350}
            />
          </Box>
        )}

        {filePreviews.length > 0 && (
          <Box
            display="flex"
            gap={1}
            mb={1}
            overflow="auto"
            sx={{
              "& img": {
                borderRadius: "8px",
                objectFit: "cover",
              },
            }}
          >
            {filePreviews.map((file) => (
              <Box key={file.id} position="relative" width={80} height={80}>
                <img src={file.url} alt="Preview" width={80} height={80} />
                <IconButton
                  size="small"
                  onClick={() =>
                    setFilePreviews(
                      filePreviews.filter((f) => f.id !== file.id)
                    )
                  }
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
                >
                  ×
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            px: 2,
            py: 1,
          }}
        >
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <MoodIcon color={showEmojiPicker ? "primary" : "action"} />
          </IconButton>

          <IconButton component="label">
            <AttachFileIcon />
            <input
              type="file"
              hidden
              multiple
              onChange={(e) =>
                e.target.files && handleFileSelect(Array.from(e.target.files))
              }
            />
          </IconButton>

          <Input
            fullWidth
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            multiline
            maxRows={4}
            disableUnderline
            sx={{
              backgroundColor: "transparent",
              fontSize: "15px",
            }}
          />

          <IconButton
            onClick={handleSendMessage}
            disabled={!textValue.trim() && filePreviews.length === 0}
            sx={{
              backgroundColor: "#008069",
              color: "white",
              "&:hover": {
                backgroundColor: "#017561",
              },
              "&:disabled": {
                backgroundColor: "transparent",
                color: "text.secondary",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default RightPanel;
