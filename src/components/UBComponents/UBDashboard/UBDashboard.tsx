import React from "react";
import UBCardDataStats from "../../../common/UBCardDataStats/UBCardDataStats";
import UBVisitorsAnalyticsChart from "../../../common/UBVisitorsAnalyticsChart/UBVisitorsAnalyticsChart";
import UBChats from "../../../common/UBChats/UBChats";
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
      total: incidentFilesTotalData?.total || dashboardData.total.incidentFilesTotal || 0,
      icon: <AssessmentIcon />,
    },
    {
      title: "Total Messages Sent",
      total: messageTotalData?.total || dashboardData.total.messageTotal || 0,
      icon: <MarkEmailReadIcon />,
    },
  ];

  console.log(reportTotalData)
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {stats.map((stat, index) => (
          <UBCardDataStats key={index} title={stat.title} total={stat.total}>
            {stat.icon}
          </UBCardDataStats>
        ))}
      </div>

      {/* Display total users count directly */}
      {/* <div className="mt-4">
        <h2>Total Users from API: {dashboardData.total.usersTotal}</h2>
      </div> */}

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-7">
          <UBVisitorsAnalyticsChart />
        </div>
        <div className="col-span-12 md:col-span-5">
          <UBChats />
        </div>
      </div>
    </>
  );
};
