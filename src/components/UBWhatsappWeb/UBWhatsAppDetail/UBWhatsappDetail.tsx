import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface UBWhatsappDetailProps {
  onClose: () => void;
  onMediaClick: () => void;
  name: string;
  role: string;
  avatarUrl?: string;
  images: Array<{ src: string; alt: string }>; // Made non-optional
}

export const UBWhatsappDetail: React.FC<UBWhatsappDetailProps> = ({
  onClose,
  onMediaClick,
  name,
  role,
  avatarUrl = "/static/images/avatar/1.jpg",
  images,
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

      {/* Media, Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
        }}
        onClick={onMediaClick} // Handle click event
      >
        <Typography>Media</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: "10px",
          border: "1px solid #ddd",
          width: "100%",
          height: "auto",
          maxHeight: "50%",
          overflow: "auto",
          backgroundColor: "#fff",
          padding: "12px 16px",
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ddd",
                width: "30%",
                height: "100px",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              color: "gray",
              padding: "20px 0",
            }}
          >
            No media shared yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UBWhatsappDetail;
