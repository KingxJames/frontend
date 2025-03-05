import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button || // Ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      sx={{
        minWidth: "auto",
        mx: 1,
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "bold",
        backgroundColor: props.selected
          ? `rgba(104, 47, 151, 0.48)` // Apply when selected
          : `rgba(138, 138, 138, 0.23)`,
        color: props.selected ? "black" : "inherit", // Ensure black text when selected
        "&.Mui-selected": {
          color: "black", // Override default MUI selected color
        },
        "&:hover": {
          backgroundColor: `rgba(104, 47, 151, 0.48)`,
          color: "#fff",
        },
        "&:focus": {
          backgroundColor: `rgba(104, 47, 151, 0.48)`,
          color: "#fff",
        },
        textDecoration: "none", // Removes underline on hover & focus
      }}
      {...props}
    />
  );
}

export default function UBTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };

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
      <Tabs
        value={value}
        onChange={handleChange}
        role="navigation"
        sx={{ "& .MuiTabs-indicator": { display: "none" } }} // Removes underline
      >
        <LinkTab label="All" href="/All" selected={value === 0} />
        <LinkTab label="Anonymous" href="/Anonymous" selected={value === 1} />
        <LinkTab label="Emergencies" href="/Emergencies" selected={value === 2} />
      </Tabs>
    </Box>
  );
}
