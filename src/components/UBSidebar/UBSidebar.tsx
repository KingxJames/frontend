import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenuState } from "../../../store/features/menuSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import UBLogoWhite from "../../images/UBLogoWhite.png";
import { IMenu } from "../../../store/features/menuSlice";

interface UBSidebarProps {
  open?: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export const UBSidebar: React.FC<UBSidebarProps> = ({
  open,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const menuItems = useSelector(selectMenuState);

  const renderIconComponent = (iconString: string) => {
    switch (iconString) {
      case "DashboardIcon":
        return <DashboardIcon />;
      case "MessageIcon":
        return <MessageIcon />;
      case "ReportIcon":
        return <ReportIcon />;
      case "SettingsIcon":
        return <SettingsIcon />;
      case "FormIcon":
        return <FormatAlignJustifyIcon />;
      default:
        return <></>;
    }
  };

  const renderNameComponent = (name: string) => {
    switch (name) {
      case "Dashboard":
        return <Typography>Dashboard</Typography>;
      case "Message":
        return <Typography>Messages</Typography>;
      case "Reports":
        return <Typography>Reports</Typography>;
      case "Settings":
        return <Typography>Settings</Typography>;
      case "Form":
        return <Typography>Forms</Typography>;
      default:
        return <></>;
    }
  };

  // Don't render sidebar if there's only one menu item
  if (menuItems.length <= 1) {
    return null;
  }

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !open ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <Box
      ref={sidebar}
      sx={{
        position: { xs: "absolute", lg: "static" },
        left: 0,
        top: 0,
        zIndex: 9999,
        height: "100vh",
        width: { xs: "25%", lg: "17%" },
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        transition: "width 0.3s ease",
        bgcolor: "#6C3777",
        color: "white",
        transform: {
          xs: open ? "translateX(0)" : "translateX(-100%)", // mobile hides it
          lg: "translateX(0)", // always open on desktop
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "width 0.3s ease",
          bgcolor: "#6C3777",
          color: "white",
          gap: 2,
          px: 6,
          py: 5.5,
        }}
      >
        <NavLink to="/">{<img src={UBLogoWhite} alt="UBLogo" />}</NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!open)}
          aria-controls="sidebar"
          aria-expanded={open}
          className="block lg:hidden"
        ></button>
      </Box>

      <List sx={{ p: 0 }}>
        {menuItems.map((item: IMenu) => (
          <ListItem
            key={item.id}
            component={Link}
            to={item.path}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "white",
              backgroundColor:
                location.pathname === item.path
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : "auto",
                justifyContent: "center",
                color: "inherit",
                gap: 2, // Adds 8px spacing between items
              }}
            >
              {renderIconComponent(item.icon)}
              {renderNameComponent(item.name)}
            </ListItemIcon>
            <ListItemText
              sx={{
                opacity: open ? 1 : 0,
                transition: "opacity 0.2s ease",
                whiteSpace: "nowrap",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UBSidebar;
