import React from "react";
import UBFormCard from "../../components/UBForms/UBFormCard/UBFormCard";
import { Box, Typography } from "@mui/material";
import warning from "../../images/incident/warning.png";
import { useNavigate } from "react-router-dom";
import {
  useInitializeIncidentReportMutation,
  useCreateIncidentReportMutation,
  useGetUnsubmittedIncidentReportQuery,
} from "../../../store/services/incidentReportAPI";
import { create } from "@mui/material/styles/createTransitions";

export const FormNames: React.FC = () => {
  const navigate = useNavigate();
  const [initializeIncidentReport] = useInitializeIncidentReportMutation();
  const { data: unsubmittedIncidentReports, refetch } =
    useGetUnsubmittedIncidentReportQuery({});
  const [createIncidentReport] = useCreateIncidentReportMutation();

  // const handleClick = async () => {
  //   try {
  //     const response = await initializeIncidentReport({}).unwrap();

  //     // Navigate with ID if form needs to load data
  //     navigate(`incidentReportForm/${response.caseNumber}`);
  //   } catch (error) {
  //     console.error("Failed to initialize incident report:", error);
  //   }
  // };

  const handleClick = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetch();

      if (data?.success && data.data) {
        // ✅ Found an unsubmitted form → navigate to it
        navigate(`incidentReportForm/${data.data.caseNumber}`);
      } else {
        // 🆕 No unsubmitted form → initialize new
        const response = await initializeIncidentReport({}).unwrap();
        navigate(`incidentReportForm/${response.caseNumber}`);
      }
    } catch (error) {
      console.error("Failed to handle incident report form:", error);
    }
  };

  const handleClickShiftReport = (title: string) => {
    if (title === "End of Shift Report Patrol") {
      navigate("/endOfShiftReportPatrol");
      return;
    } else if (title === "End of Shift Report Supervisor") {
      navigate("/endOfShiftReportSupervisor");
      return;
    } else {
      navigate("/forms");
      console.log("No form found");
    }
  };

  return (
    <Box
      sx={{
        // padding: "3%",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        height: "92.5vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <UBFormCard
          title="Incident Report Form"
          image={warning}
          onClick={handleClick}
        />

        <UBFormCard
          title="End of Shift Report Patrol"
          image={warning}
          onClick={() => handleClickShiftReport("End of Shift Report Patrol")}
        />

        <UBFormCard
          title="End of Shift Report Supervisor"
          image={warning}
          onClick={() =>
            handleClickShiftReport("End of Shift Report Supervisor")
          }
        />
      </Box>
    </Box>
  );
};

export default FormNames;
