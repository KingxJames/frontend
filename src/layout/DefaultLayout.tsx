import React, { useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import UBHeader from "../components/UBHeader/UBHeader";
import { UBSidebar } from "../components/UBSidebar/UBSidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define routes where UBHeader should be hidden
  const hiddenHeaderRoutes = ["/Messages"];

  // Check if current route is in the hidden list
  const hideHeader = hiddenHeaderRoutes.includes(location.pathname);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== UBSidebar Start ===== --> */}
        <UBSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
