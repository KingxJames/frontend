import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";
import UBWhatsAppDetail from "../UBWhatsAppDetail/UBWhatsappDetail";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";
import { useSelector } from "react-redux";
import { selectSharedImagesByChatId } from "../../../../store/features/UBWhatsappSlice/messageSlice";

interface SharedImagesMap {
  [chatName: string]: Array<{ src: string; alt: string }>;
}

export const UBWhatsappWeb: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatCardType | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [sharedImagesMap, setSharedImagesMap] = useState<SharedImagesMap>({});
  const [showMedia, setShowMedia] = useState(false);

  const sharedImages = useSelector(selectSharedImagesByChatId(selectedChat?.id || ""));


  // Close detail panel and any sub-panels
  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
    setShowMedia(false);
  };

  // Handle escape key to close panels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (showDetailPanel || showMedia)) {
        handleCloseDetailPanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDetailPanel, showMedia]);

  // Calculate panel widths responsively
  const getRightPanelWidth = () => {
    if (showDetailPanel || showMedia) return "50%";
    return "70%";
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      sx={{
        overflow: "hidden",
      }}
    >
      {/* Left Panel - Always visible */}
      <Box
        width={{ xs: "100%", md: "30%" }}
        sx={{
          backgroundColor: "rgba(224, 218, 218, 0.1)",
          display: {
            xs: showDetailPanel || showMedia ? "none" : "block",
            md: "block",
          },
        }}
      >
        <LeftPanel
          onSelectChat={(chat) => {
            setSelectedChat(chat);
            setShowDetailPanel(false);
            setShowMedia(false);
          }}
        />
      </Box>

      {/* Divider */}
      <Box
        sx={{
          backgroundColor: "rgba(224, 218, 218, 0.1)",
          border: ".05px solid rgba(134, 134, 134, 0.49)",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      />

      {/* Right Panel - Dynamic width */}
      <Box
        width={{
          xs: showDetailPanel || showMedia ? "0%" : "100%",
          md: getRightPanelWidth(),
        }}
        sx={{
          backgroundColor: "rgba(224, 218, 218, 0.1)",
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <RightPanel
          selectedChat={
            selectedChat
              ? {
                  id: selectedChat.id,
                  name: selectedChat.name,
                  lastText: selectedChat.lastText,
                }
              : null
          }
          setShowDetailPanel={setShowDetailPanel}
          setSharedImagesMap={setSharedImagesMap} // Add this line
        />
      </Box>

      {/* Detail Panel */}
      {showDetailPanel && selectedChat && (
        <Box
          sx={{
            transition: "transform 0.3s ease",
            position: {
              xs: "absolute",
              md: "relative",
            },
            right: 0,
            height: "100%",
            zIndex: showMedia ? 99 : 100, // Lower z-index when media panel is open
          }}
        >
          <UBWhatsAppDetail
            name={selectedChat.name}
            role={selectedChat.role}
            onClose={handleCloseDetailPanel}
            images={sharedImages}
            onMediaClick={() => setShowMedia(true)}
          />

         
        </Box>
      )}
    </Box>
  );
};

export default UBWhatsappWeb;
