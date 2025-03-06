import React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ArticleIcon from "@mui/icons-material/Article";
import SaveIcon from "@mui/icons-material/Save";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ShareIcon from "@mui/icons-material/Share";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const actions = [
  { icon: <ArticleIcon />, name: "Document" },
  { icon: <AddToPhotosIcon />, name: "Photos and Videos" },
  { icon: <CameraAltIcon />, name: "Camera" },
];

export const UBSpeedDial: React.FC = () => {
  return (
    <Box sx={{ width: "5%", height: "32%", transform: "translateZ(0px)" }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: "-1.8rem", right: 100 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default UBSpeedDial;
