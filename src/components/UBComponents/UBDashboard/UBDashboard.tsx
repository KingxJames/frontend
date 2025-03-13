import React from "react";
import UBCardDataStats from "../../../common/UBCardDataStats/UBCardDataStats.tsx";
import UBVisitorsAnalyticsChart from "../../../common/UBVisitorsAnalyticsChart/UBVisitorsAnalyticsChart";
// import UBChats from "../../../common/UBChats/UBChats";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  useFetchUsersTotalQuery,
  useFetchReportTotalQuery,
  useFetchIncidentFilesTotalQuery,
  useFetchMessageTotalQuery,
} from "../../../../store/services/dashboardAPI";
import { useSelector } from "react-redux";
import { selectDashboard } from "../../../../store/features/dashboardSlice";
import { Box } from "@mui/material";
import UBChatList from "../../../common/UBChatList/UBChatList.tsx";

export const UBDashboard: React.FC = () => {
  // Fetch the totals using hooks
  const { data: usersTotalData } = useFetchUsersTotalQuery();
  const { data: reportTotalData } = useFetchReportTotalQuery();
  const { data: incidentFilesTotalData } = useFetchIncidentFilesTotalQuery();
  const { data: messageTotalData } = useFetchMessageTotalQuery();

  const dashboardData = useSelector(selectDashboard);
  const stats = [
    {
      title: "Total Users",
      total: usersTotalData?.total || dashboardData.total.usersTotal || 0,
      icon: <RemoveRedEyeIcon />,
    },
    {
      title: "Total Incident Reports",
      total: reportTotalData?.total || dashboardData.total.reportTotal || 0,
      icon: <AssessmentIcon />,
    },
    {
      title: "Total incident Files",
      total:
        incidentFilesTotalData?.total ||
        dashboardData.total.incidentFilesTotal ||
        0,
      icon: <AssessmentIcon />,
    },
    {
      title: "Total Messages Sent",
      total: messageTotalData?.total || dashboardData.total.messageTotal || 0,
      icon: <MarkEmailReadIcon />,
    },
  ];

  return (
    <Box sx={{ p: "2%" }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {stats.map((stat, index) => (
          <UBCardDataStats key={index} title={stat.title} total={stat.total}>
            {stat.icon}
          </UBCardDataStats>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-7">
          <UBVisitorsAnalyticsChart />
        </div>
        <div
          className="col-span-12 md:col-span-5 rounded-sm border border-stroke bg-white pt-3.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          style={{
            border: "2px solid rgba(255, 196, 3, 0.5)",
            borderRadius: "20px",
          }}
        >
          <h1 style={{ fontSize: "30px", padding: "2% 0 2% 4%" }}>Chat</h1>
          {/* chat list here */}
          <UBChatList />
        </div>
      </div>
    </Box>
  );
};

export default UBDashboard;
