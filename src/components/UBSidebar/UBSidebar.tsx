import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenuState } from "../../../store/features/menuSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
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
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0
     ${open ? "translate-x-0" : "-translate-x-full"} }
       bg-[#6C3777] dark:bg-black`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-2.5">
        <NavLink to="/">{<img src={UBLogoWhite} alt="UBLogo" />}</NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!open)}
          aria-controls="sidebar"
          aria-expanded={open}
          className="block lg:hidden"
        ></button>
      </div>
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
              primary={item.name}
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
