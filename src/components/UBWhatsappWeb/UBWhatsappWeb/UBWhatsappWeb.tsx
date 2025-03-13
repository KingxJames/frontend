import React, { useState } from "react";
import { Box } from "@mui/material";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";
import UBMessengerDetail from "../UBMessengerDetail/UBWhatsappDetail";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";

export const UBWhatsappWeb: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatCardType | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  return (
    <Box display="flex" flexDirection="row" height="100vh">
      {/* Left Panel */}
      <Box width="30%" sx={{ backgroundColor: "rgba(224, 218, 218, 0.1)" }}>
        <LeftPanel onSelectChat={setSelectedChat} />
      </Box>

      <Box
        sx={{
          backgroundColor: "rgba(224, 218, 218, 0.1)",
          border: ".05px solid rgba(134, 134, 134, 0.49)",
        }}
      />

      {/* Right Panel with dynamic width */}
      <Box
        width={showDetailPanel ? "50%" : "70%"}
        sx={{ backgroundColor: "rgba(224, 218, 218, 0.1)" }}
      >
        <RightPanel selectedChat={selectedChat} setShowDetailPanel={setShowDetailPanel} />
      </Box>

      {/* Messenger Detail Panel - Only shows when showDetailPanel is true */}
      {showDetailPanel && selectedChat && (
        <Box width="auto" sx={{ backgroundColor: "white", borderLeft: "1px solid #ccc" }}>
          <UBMessengerDetail 
            name={selectedChat.name} 
            role={selectedChat.category} 
            onClose={() => setShowDetailPanel(false)}
          />
        </Box>
      )}
    </Box>
  );
};

export default UBWhatsappWeb;
