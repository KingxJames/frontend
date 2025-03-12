import React, { useState } from "react";
import { Box } from "@mui/material";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";

export const UBWhatsappWeb: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatCardType | null>(null);

  return (
    <Box display="flex" flexDirection="row" height={"100vh"}>
      <Box width="30%" sx={{ backgroundColor: "red" }}>
        <LeftPanel onSelectChat={setSelectedChat} />
      </Box>
      <Box sx={{ backgroundColor: "green", border: ".05px solid white" }} />

      <Box width="70%" sx={{ backgroundColor: "yellow" }}>
        <RightPanel selectedChat={selectedChat} />
      </Box>
    </Box>
  );
};

export default UBWhatsappWeb;
