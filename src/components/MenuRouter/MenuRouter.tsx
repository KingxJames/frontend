import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMenu, selectMenuState } from "../../../store/features/menuSlice";

interface MenuRouterProps {
  children?: React.ReactNode;
}

export const MenuRouter: React.FC<MenuRouterProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = useSelector(selectMenuState);
  const [isMenuLoaded, setIsMenuLoaded] = useState(false);

  useEffect(() => {
    // Wait for menu to be loaded (not empty array)
    if (menu && menu.length > 0 && !isMenuLoaded) {
      setIsMenuLoaded(true);
    }
  }, [menu, isMenuLoaded]);

  useEffect(() => {
    // Only proceed with navigation logic if menu is loaded
    if (!isMenuLoaded) {
      return;
    }

    // Check if current route is accessible to user
    const isCurrentRouteAccessible = () => {
      // Public routes are always accessible
      if (location.pathname === "/login" || location.pathname === "/404") {
        return true;
      }
      console.log("path", location.pathname, "menu", menu);
      // Check if current route is in user's menu
      return menu.some(
        (menuItem: IMenu) =>
          menuItem.path === location.pathname && menuItem.is_active
      );
    };

    // If user is on a route they don't have access to, redirect to first available menu
    if (!isCurrentRouteAccessible()) {
      // Check if the route exists in user's available menus
      const userMenuPaths = menu.map((menuItem: IMenu) => menuItem.path);
      const isRouteValid = userMenuPaths.includes(location.pathname);
      console.log(
        "isRouteValid",
        location.pathname,
        "userMenuPaths",
        userMenuPaths
      );

      if (isRouteValid) {
        // Route exists but user doesn't have access, redirect to first available menu
        if (menu.length > 0) {
          const firstAvailableMenu = menu.find(
            (menuItem: IMenu) => menuItem.is_active
          );
          if (firstAvailableMenu) {
            navigate(firstAvailableMenu.path, { replace: true });
          } else {
            navigate("/Dashboard", { replace: true });
          }
        } else {
          navigate("/Dashboard", { replace: true });
        }
      } else {
        // Route doesn't exist, redirect to 404
        navigate("/404", { replace: true });
      }
    }
  }, [menu, location.pathname, navigate, isMenuLoaded]);

  return <>{children}</>;
};

export default MenuRouter;
