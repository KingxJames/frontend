import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface LinkTabProps {
  label: string;
  path: string;
  selected?: boolean;
}

function LinkTab({ label, path, selected }: LinkTabProps) {
  const navigate = useNavigate();

  return (
    <Tab
      label={label}
      onClick={() => navigate(path)}
      sx={{
        minWidth: "auto",
        mx: 1,
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "bold",
        backgroundColor: selected
          ? `rgba(104, 47, 151, 0.48)` // Apply when selected
          : `rgba(138, 138, 138, 0.23)`,
        color: selected ? "black" : "inherit", // Ensure black text when selected
        "&.Mui-selected": {
          color: "black", // Override default MUI selected color
        },
        "&:hover, &:focus": {
          backgroundColor: `rgba(104, 47, 151, 0.48)`,
          color: "#fff",
        },
        textDecoration: "none", // Removes underline on hover & focus
      }}
    />
  );
}

export default function UBTabs() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: 2,
        paddingLeft: 1,
        display: "flex",
        justifyContent: "left", // Align tabs to the left
      }}
    >
      <Tabs value={currentPath} sx={{ "& .MuiTabs-indicator": { display: "none" } }}>
        <LinkTab label="All" path="/All" selected={currentPath === "/All"} />
        <LinkTab label="Anonymous" path="/Anonymous" selected={currentPath === "/Anonymous"} />
        <LinkTab label="Emergencies" path="/Emergencies" selected={currentPath === "/Emergencies"} />
      </Tabs>
    </Box>
  );
}
