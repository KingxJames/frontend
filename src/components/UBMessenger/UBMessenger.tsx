import React, { useState } from "react";
import { Box } from "@mui/material";
import UBMessengerChat from "./UBMessengerChat/UBMessengerChat";
import UBMessengerList from "./UBMessengerList/UBMessengerList";
import UBMessengerDetail from "../UBWhatsappWeb/UBMessengerDetail/UBWhatsappDetail";

export const UBMessenger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to false so it's closed initially

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <UBMessengerList />
      <UBMessengerChat onOpenDetail={() => setIsOpen(true)} />{" "}
      {/* Pass function */}
      {isOpen && (
        <UBMessengerDetail
          onClose={() => setIsOpen(false)}
          name="John Doe"
          role="Admin"
        />
      )}
    </Box>
  );
};

export default UBMessenger;