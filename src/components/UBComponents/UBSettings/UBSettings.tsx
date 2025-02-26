import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { UBButton } from "../../../common/Button/Button";

export const UBSettings: React.FC = () => {
  const navigate = useNavigate();
  // const name = useSelector(selectName);
  // const email = useSelector(selectEmail);

  const handleShowTable = (text: string) => {
    const routes: Record<string, string> = {
      Buildings: "/buildings",
      "Incident Reports": "/incidentReports",
      Users: "/users",
    };

    if (routes[text]) {
      navigate(routes[text]);
    }
  };
  return (
    <div style={{ padding: "3%" }}>
      <Grid container spacing={3}>
        {["Buildings", "Incident Reports", "Users"].map((text, index) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{ display: "flex", justifyContent: "left" }}
          >
            <UBButton text={text} onClick={() => handleShowTable(text)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UBSettings;
