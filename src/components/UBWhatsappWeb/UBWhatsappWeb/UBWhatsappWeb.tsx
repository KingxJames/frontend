import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";
import UBWhatsAppDetail from "../UBWhatsAppDetail/UBWhatsappDetail";
import { ChatCardType } from "../../../common/utils/LeftPanel.types";
import UBMedia from "../UBWhatsAppDetail/UBMedia/UBMedia";

interface SharedImagesMap {
  [chatName: string]: Array<{ src: string; alt: string }>;
}

export const UBWhatsappWeb: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatCardType | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [sharedImagesMap, setSharedImagesMap] = useState<SharedImagesMap>({});
  const [showMediaLinksAndDocs, setShowMediaLinksAndDocs] = useState(false);
  const [showMedia, setShowMedia] = useState(false);

  // Listen for image updates from RightPanel
  useEffect(() => {
    const handleSharedImagesUpdate = (event: CustomEvent) => {
      const { chatName, images } = event.detail;
      setSharedImagesMap((prev) => ({
        ...prev,
        [chatName]: images,
      }));
    };

    window.addEventListener(
      "sharedImagesUpdated",
      handleSharedImagesUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "sharedImagesUpdated",
        handleSharedImagesUpdate as EventListener
      );
    };
  }, []);

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
        width={
          showMediaLinksAndDocs
            ? "50%" // Shrink when media panel is open
            : showDetailPanel
            ? "50%" // Shrink when detail panel is open
            : "70%"
        }
        sx={{ backgroundColor: "rgba(224, 218, 218, 0.1)" }}
      >
        <RightPanel
          selectedChat={selectedChat}
          setShowDetailPanel={setShowDetailPanel}
        />
      </Box>

      {showMedia && selectedChat && !showMediaLinksAndDocs ? (
        <UBMedia
          onBack={() => setShowMedia(false)}
          documents={[]} // Pass actual documents when available
          links={[]} // Pass actual links when available
        />
      ) : (
        selectedChat && (
          <UBWhatsAppDetail
            name={selectedChat.name}
            role={selectedChat.role}
            onClose={() => setShowDetailPanel(false)}
            images={[]} 
            onMediaClick={() => setShowMedia(true)}
          />
        )
      )}
    </Box>
  );
};

export default UBWhatsappWeb;
