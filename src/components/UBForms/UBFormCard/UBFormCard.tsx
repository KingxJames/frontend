import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface UBFormCardProps {
  title: string;
  image: string;
}

export const UBFormCard: React.FC<UBFormCardProps> = ({ title, image }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "left",
        padding: "3%",
      }}
    >
      <Card
        sx={{
          width: 220,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 140,
            objectFit: "contain",
            padding: 2,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: "16px !important",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UBFormCard;
