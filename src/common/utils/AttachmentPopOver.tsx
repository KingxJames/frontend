import React, { useState, useRef } from "react";
import { Avatar, Box, IconButton, Popover } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface AttachmentPopOverProps {
  onFileSelect: (files: File[]) => void;  // Updated to accept array of files
  multiple?: boolean;
}

export const AttachmentPopOver: React.FC<AttachmentPopOverProps> = ({
  onFileSelect,
  multiple = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (type: "document" | "gallery") => {
    if (type === "document" && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === "gallery" && imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Convert FileList to array and pass all selected files
      const files = Array.from(event.target.files);
      onFileSelect(files);
    }
    // Reset the input to allow selecting the same files again
    if (event.target) {
      event.target.value = '';
    }
  };

  const globalIconStyle2 = {
    height: "2rem",
    width: "2rem",
  };

  const options = [
    {
      id: "document",
      backgroundColor: "purple",
      icon: <InsertDriveFileIcon sx={{ ...globalIconStyle2 }} />,
      onClick: () => handleFileUpload("document"),
    },
    {
      id: "gallery",
      backgroundColor: "pink",
      icon: <InsertPhotoIcon sx={{ ...globalIconStyle2 }} />,
      onClick: () => handleFileUpload("gallery"),
    },
  ];

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
          {options.map((item) => (
            <Avatar
              key={item.id}
              sx={{
                background: item.backgroundColor,
                height: "3.8rem",
                width: "3.8rem",
                cursor: "pointer",
              }}
              onClick={item.onClick}
            >
              {item.icon}
            </Avatar>
          ))}
        </Box>
      </Popover>

      {/* Hidden input fields for file uploads */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple}  // Added multiple attribute
      />
      <input
        type="file"
        accept="image/*,video/*"  // Added video support
        ref={imageInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple}  // Added multiple attribute
      />
    </Box>
  );
};

export default AttachmentPopOver;