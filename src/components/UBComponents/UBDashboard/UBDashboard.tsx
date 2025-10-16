import React from "react";
import { Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

import UBCardDataStats from "../../../common/UBCardDataStats/UBCardDataStats.tsx";
import UBVisitorsAnalyticsChart from "../../../common/UBVisitorsAnalyticsChart/UBVisitorsAnalyticsChart";
// import UBChats from "../../../common/UBChats/UBChats";
import UBChatList from "../../../common/UBChatList/UBChatList.tsx";

import {
  useFetchUsersTotalQuery,
  useFetchReportTotalQuery,
} from "../../../../store/services/dashboardAPI";
import { useIncidentReportTotalQuery } from "../../../../store/services/incidentReportAPI";
import { useSelector } from "react-redux";
import { selectDashboard } from "../../../../store/features/dashboardSlice";

export const UBDashboard: React.FC = () => {
  // Fetch data using RTK Query hooks
  const { data: usersTotalData } = useFetchUsersTotalQuery();
  const { data: incidentReportTotalData } = useIncidentReportTotalQuery();

  // Select fallback dashboard data from Redux
  const dashboardData = useSelector(selectDashboard);

  // Define dashboard cards
  const stats = [
    {
      title: "Total Users",
      total: usersTotalData?.total ?? dashboardData.total.usersTotal ?? 0,
      icon: <RemoveRedEyeIcon />,
    },
    {
      title: "Total Incident Reports",
      total: incidentReportTotalData?.data?.total ?? 0,
      icon: <AssessmentIcon />,
    },
   
    //will add total anonymous chats here
    //total emergency chats here
  ];

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
        {stats.map((stat, index) => (
          <UBCardDataStats key={index} title={stat.title} total={stat.total}>
            {stat.icon}
          </UBCardDataStats>
        ))}
      </div>
    </Box>
  );
};

export default UBDashboard;
