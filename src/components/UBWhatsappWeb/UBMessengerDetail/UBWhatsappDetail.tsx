import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

interface UBWhatsappDetailProps {
  onClose: () => void;
  name: string;
  role: string;
}

export const UBWhatsappDetail: React.FC<UBWhatsappDetailProps> = ({
  onClose,
  name,
  role,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        width: "25vw",
        height: "100vh",
        backgroundColor: "rgba(187, 187, 187, 0.18)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "2%",
          backgroundColor: "#fff",
        }}
      >
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
        <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
          Contact Info
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centers the Avatar and text horizontally
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Avatar
          alt="User Avatar"
          src={"/static/images/avatar/1.jpg"}
          sx={{ width: 200, height: 200 }}
        />
        <Typography sx={{ mt: 2 }}>{name}sdfgdf</Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "30%",
          marginTop: "2%",
          padding: "2%",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{}}>Media, Links, Docs</Typography>
        <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
      </Box>

      <Box
        onClick={() => console.log("Delete chat clicked")}
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
          position: "fixed",
          bottom: 0,
          width: "100%",
          border: "1px solid #ddd",
        }}
      >
        <Typography
          sx={{ fontSize: "20px", color: "red", border: "1px solid red" }}
        >
          <DeleteIcon />
          Delete Chat
        </Typography>
      </Box>
    </Box>
  );
};

export default UBWhatsappDetail;
