import React from "react";
import { Paper, Box, Typography } from "@mui/material";

interface UBOwnMessageCardProps {
  text: string;
}

export const UBOwnMessageCard: React.FC<UBOwnMessageCardProps> = ({ text }) => {
  return (
    <Paper
      sx={{
        backgroundColor: "green",
        display: "flex",
        alignSelf: "flex-end",
        maxWidth: "60%",
        textAlign: "start",
        padding: ".35rem .8rem",
        flexDirection: "column",
        borderRadius: ".625rem",
        position: "relative",
        "&::after": {
          content: '" "',
          border: "20px solid transparent",
          position: "absolute",
          top: 0,
          right: "-1.25rem",
          borderTopRightRadius: ".5rem",
          borderTopColor: "green",
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "1rem",
        }}
      >
        {text}
      </Typography>
      <Typography
        color={"grey"}
        sx={{
          fontSize: ".85rem",
          display: "flex",
          alignSelf: "flex-end",
        }}
      >
        4:59
      </Typography>
    </Paper>
  );
};
export default UBOwnMessageCard;
