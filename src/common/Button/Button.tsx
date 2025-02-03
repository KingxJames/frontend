import React from "react";
import { Button } from "@mui/material";

interface UBButtonProps {
  text: string;
  onClick: () => void;
}

export const UBButton: React.FC<UBButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "rgb(108, 55, 119)",
        color: "#fff",
        width: "70%",
        height: "100%",
        borderRadius: "5px",
        "&:hover": {
          backgroundColor: "rgb(100, 55, 119)",
          boxShadow: "3px 3px 5px 0px rgba(94, 94, 94, 0.75)",
        },
        padding: "3%",
      }}
    >
      {text}
    </Button>
  );
};

export default UBButton;
