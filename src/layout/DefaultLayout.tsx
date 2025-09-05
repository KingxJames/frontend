import React, { useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import UBHeader from "../components/UBHeader/UBHeader";
import { UBSidebar } from "../components/UBSidebar/UBSidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define routes where UBHeader should be hidden
  const hiddenHeaderRoutes = [
    "/messages",
    "/forms/incidentReportForm/:caseNumber",
  ];
  const hiddenSidebarRoutes = ["/forms/incidentReportForm/:caseNumber"];

  // Check if current route is in the hidden list
  const hideHeader =
    hiddenHeaderRoutes.some((route) =>
      location.pathname.startsWith("/forms/incidentReportForm/")
    ) || hiddenHeaderRoutes.includes(location.pathname);

  const hideSidebar =
    hiddenSidebarRoutes.some((route) =>
      location.pathname.startsWith("/forms/incidentReportForm/")
    ) || hiddenSidebarRoutes.includes(location.pathname);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== UBSidebar Start ===== --> */}
        {!hideSidebar && (
          <UBSidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {/* <!-- ===== UBSidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Conditionally render UBHeader */}
          {!hideHeader && (
            <UBHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="">{children}</div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
