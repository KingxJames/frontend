import React from "react";
import { Box } from "@mui/material";
import UBOwnMessageCard from "../../../common/UBChatCard/UBOwnMessageCard";
import UBReplyCard from "../../../common/UBChatCard/UBReplyCard";

export const ChatContainer: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "column",
        padding: "1% 6%",
        gap: ".5rem",
        overflow: "auto",
        backgroundColor: "white",
      }}
    >
      {" "}
      <UBOwnMessageCard />
      <UBReplyCard />
      <UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard /><UBOwnMessageCard />
      <UBReplyCard />
    </Box>
  );
};

export default ChatContainer;
