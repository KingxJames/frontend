import React, { useState, useRef } from "react";
import { Avatar, Box, IconButton, Popover } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

interface AttachmentPopOverProps {
  onFileSelect: (files: File[]) => void;
  multiple?: boolean;
}

export const AttachmentPopOver: React.FC<AttachmentPopOverProps> = ({
  onFileSelect,
  multiple = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Convert FileList to array and filter only image files
      const files = Array.from(event.target.files).filter(file => 
        file.type.startsWith("image/")
      );
      
      if (files.length > 0) {
        onFileSelect(files);
      }
    }
    // Reset the input to allow selecting the same files again
    if (event.target) {
      event.target.value = '';
    }
  };

  const globalIconStyle = {
    height: "2rem",
    width: "2rem",
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <AttachFileIcon
          sx={{
            color: "#8696a1",
            height: "28px",
            width: "28px",
            transform: "rotateY(0deg) rotate(45deg)",
          }}
        />
      </IconButton>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            background: "transparent",
            paddingBottom: "1rem",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        elevation={0}
      >
        <Box display="flex" flexDirection="column" gap="1.2rem">
          <Avatar
            sx={{
              background: "#008069", // WhatsApp green color
              height: "3.8rem",
              width: "3.8rem",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <InsertPhotoIcon sx={{ ...globalIconStyle }} />
          </Avatar>
        </Box>
      </Popover>

      {/* Hidden input field for image upload only */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple}
      />
    </Box>
  );
};

export default AttachmentPopOver;