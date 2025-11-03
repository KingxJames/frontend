import React, { useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import UBHeader from "../components/UBHeader/UBHeader";
import { UBSidebar } from "../components/UBSidebar/UBSidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define base routes where header/sidebar should be hidden
  const hiddenHeaderRoutes = [
    "/messages",
    "/forms/incidentReportForm/",
    "/forms/endOfShiftReportPatrol/",
    "/forms/endOfShiftReportSupervisor/",
    "/forms/lostAndFoundTracking/",
    "/forms/lostPropertyReportForm/",
  ];

  const hiddenSidebarRoutes = ["/forms/incidentReportForm/"];

  // Helper: check if current path starts with any of these routes
  const checkHide = (routes: string[]) =>
    routes.some((route) => location.pathname.startsWith(route));

  const hideHeader = checkHide(hiddenHeaderRoutes);
  const hideSidebar = checkHide(hiddenSidebarRoutes);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {!hideSidebar && (
          <UBSidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/* Content */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header */}
          {!hideHeader && (
            <UBHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          {/* Main */}
          <main>
            <div>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
