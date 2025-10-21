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
import {
  useInitializeEndOfShiftReportPatrolMutation,
  useGetUnsubmittedEndOfShiftReportPatrolQuery,
} from "../../../store/services/endOfShiftReportPatrolAPI";
import {
  useInitializeEndOfShiftReportSupervisorMutation,
  useGetUnsubmittedEndOfShiftReportSupervisorQuery,
} from "../../../store/services/endOfShiftReportSupervisorAPI";
import { create } from "@mui/material/styles/createTransitions";

export const FormNames: React.FC = () => {
  const navigate = useNavigate();
  const [initializeIncidentReport] = useInitializeIncidentReportMutation();
  const [initializeEndOfShiftReportPatrol] =
    useInitializeEndOfShiftReportPatrolMutation();
  const [initializeEndOfShiftReportSupervisor] =
    useInitializeEndOfShiftReportSupervisorMutation();

  const { data: unsubmittedIncidentReports, refetch: refetchIncidentReports } =
    useGetUnsubmittedIncidentReportQuery({});

  const {
    data: unsubmittedEndOfShiftReportPatrols,
    refetch: refetchPatrolReports,
  } = useGetUnsubmittedEndOfShiftReportPatrolQuery({});

  const {
    data: unsubmittedEndOfShiftReportSupervisors,
    refetch: refetchSupervisorReports,
  } = useGetUnsubmittedEndOfShiftReportSupervisorQuery({});

  const handleClick = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetchIncidentReports();

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

  const handleClickShiftReportPatrol = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetchPatrolReports();

      if (data?.success && data.data) {
        // ✅ Found an unsubmitted form → navigate to it
        navigate(`/forms/endOfShiftReportPatrol/${data.data.id}`);
        console.log("asd", data.data);
        return;
      } else {
        // 🆕 No unsubmitted form → initialize new
        const response = await initializeEndOfShiftReportPatrol({}).unwrap();
        navigate(`/forms/endOfShiftReportPatrol/${response.id}`);
        return;
      }
    } catch (error) {
      console.error("Failed to handle incident report form:", error);
    }
  };

  const handleClickShiftReportSupervisor = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetchSupervisorReports();

      if (data?.success && data.data) {
        // ✅ Found an unsubmitted form → navigate to it
        navigate(`/forms/endOfShiftReportSupervisor/${data.data.id}`);
        console.log("asd", data.data);
        return;
      } else {
        // 🆕 No unsubmitted form → initialize new
        const response = await initializeEndOfShiftReportSupervisor(
          {}
        ).unwrap();
        navigate(`/forms/endOfShiftReportSupervisor/${response.id}`);
        return;
      }
    } catch (error) {
      console.error("Failed to handle incident report form:", error);
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
          onClick={() => handleClickShiftReportPatrol()}
        />

        <UBFormCard
          title="End of Shift Report Supervisor"
          image={warning}
          onClick={() => handleClickShiftReportSupervisor()}
        />
      </Box>
    </Box>
  );
};

export default FormNames;
