import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { UBButton } from "../../../common/Button/Button";

export const UBSettings: React.FC = () => {
  const navigate = useNavigate();
  // const name = useSelector(selectName);
  // const email = useSelector(selectEmail);

  const handleShowTable = (text: string) => {
    const routes: Record<string, string> = {
      Buildings: "/buildings",
      Users: "/users",
      Campuses: "/campuses",
      "Incident Type": "/incidentTypes",
    };

    if (routes[text]) {
      navigate(routes[text]);
    }
  };
  return (
    <Box
      sx={{
        padding: "3%",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        height: "92.5vh",
      }}
    >
      <Grid container spacing={3}>
        {["Buildings", "Users", "Campuses", "Incident Type"].map(
          (text, index) => (
            <Grid
              item
              xs={4}
              key={index}
              sx={{ display: "flex", justifyContent: "left" }}
            >
              <UBButton text={text} onClick={() => handleShowTable(text)} />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default UBSettings;
