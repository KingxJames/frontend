import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

interface UBMessengerDetailProps {
  onClose: () => void;
  name: string;
  role: string;
}

export const UBMessengerDetail: React.FC<UBMessengerDetailProps> = ({
  onClose,
  name,
  role,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        width: "100%",
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
        <CloseIcon onClick={onClose} />
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
        sx={{
          position: "fixed",
          bottom: 0,
          textAlign: "center",
          width: "100%",
          height: "5%",
          marginTop: "3%",
          backgroundColor: "#fff",
          padding: "2%",
        }}
      >
        <Typography sx={{ fontSize: "20px", color: "red" }}>
          <DeleteIcon />
          Delete Chat
        </Typography>
      </Box>
    </Box>
  );
};

export default UBMessengerDetail;
