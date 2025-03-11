import React from "react";
import { Paper, Box, Typography } from "@mui/material";

export const UBReplyCard: React.FC = () => {
  return (
    <Paper
      sx={{
        background: "blue",
        display: "flex",
        alignSelf: "flex-start",
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
          left: "-1.25rem",
          borderTopLeftRadius: ".5rem",
          borderTopColor: "black",
        },
      }}
    >
      <Typography
        color={"white"}
        sx={{
          fontSize: "1rem",
        }}
      >
        Card Nulla enim ut pari atur magna. OwnMessa geCard Nulla enim ut OwnM
        es sageCard Nulla enim ut pariatur sit consectetur magna.
      </Typography>
      <Typography
        color={"gray"}
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
export default UBReplyCard;
