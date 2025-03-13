import React, { useState } from "react";
import { Box } from "@mui/material";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";
import UBMessengerDetail from "../UBMessengerDetail/UBWhatsappDetail";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";

export const UBWhatsappWeb: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatCardType | null>(null);

  return (
    <Box display="flex" flexDirection="row" height={"100vh"}>
      <Box width="30%" sx={{ backgroundColor: "rgba(224, 218, 218, 0.1)" }}>
        <LeftPanel onSelectChat={setSelectedChat} />
      </Box>
      <Box
        sx={{
          backgroundColor: "rgba(224, 218, 218, 0.1)",
          border: ".05px solid rgba(134, 134, 134, 0.49)",
        }}
      />

      <Box width="70%" sx={{ backgroundColor: "rgba(224, 218, 218, 0.1)" }}>
        <RightPanel selectedChat={selectedChat} />
      </Box>

      {/* <Box><UBMessengerDetail onClose={() => setSelectedChat(null)} name={selectedChat?.name || ""} role={selectedChat?.category || ""}/></Box> */}
    </Box>
  );
};

export default UBWhatsappWeb;
