import React from "react";
import { Box, Typography, Avatar, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface UBWhatsappDetailProps {
  onClose: () => void;
  name: string;
  role: string;
  avatarUrl?: string; // Allow dynamic avatar
}

export const UBWhatsappDetail: React.FC<UBWhatsappDetailProps> = ({
  onClose,
  name,
  role,
  avatarUrl = "/static/images/avatar/1.jpg", // Default avatar
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        width: "25vw",
        height: "100vh",
        backgroundColor: "rgba(187, 187, 187, 0.18)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "12px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <IconButton onClick={onClose} sx={{ cursor: "pointer" }}>
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          Contact Info
        </Typography>
      </Box>

      {/* Avatar & Name */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Avatar alt={name} src={avatarUrl} sx={{ width: 120, height: 120 }} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </Box>

      {/* Media, Links, Docs Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          cursor: "pointer", // Indicate it's clickable
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
        }}
      >
        <Typography>Media, Links, Docs</Typography>
        <ArrowForwardIosIcon sx={{ fontSize: "16px", color: "gray" }} />
      </Box>
      <Box
        sx={{
          border: "1px solid #ddd",
          width: "100%",
          height: "20%",
          backgroundColor: "#fff",
          padding: "12px 16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            border: "1px solid #ddd",
            width: "30%",
            height: "50%",
          }}
        />
      </Box>
    </Box>
  );
};

export default UBWhatsappDetail;
