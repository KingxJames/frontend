import React from "react";
import { Paper, Box, Typography } from "@mui/material";

export const UBOwnMessageCard: React.FC = () => {
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
        OwnMessage Card Nulla enim ut pari atur magna. OwnMessa geCard Nulla
        enim ut OwnM es sageCard Nulla enim ut pariatur sit consectetur magna.
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
