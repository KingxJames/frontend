import React from "react";
import UBFormCard from "../../components/UBForms/UBFormCard/UBFormCard";
import { Box, Typography, Grid } from "@mui/material";
import warning from "../../images/incident/warning.png";
import { useNavigate } from "react-router-dom";
import {
  useInitializeIncidentReportMutation,
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
import {
  useInitializeLostAndFoundTrackingMutation,
  useGetUnsubmittedLostAndFoundTrackingQuery,
} from "../../../store/services/lostAndFoundTrackingAPI";
import {
  useInitializeLostPropertyMutation,
  useGetUnsubmittedLostPropertyQuery,
} from "../../../store/services/lostPropertyAPI";

import {
  useInitializeImpoundedReportMutation,
  useGetUnsubmittedImpoundedReportQuery,
} from "../../../store/services/impoundedReportAPI";

export const FormNames: React.FC = () => {
  const navigate = useNavigate();
  const [initializeIncidentReport] = useInitializeIncidentReportMutation();
  const [initializeEndOfShiftReportPatrol] =
    useInitializeEndOfShiftReportPatrolMutation();
  const [initializeEndOfShiftReportSupervisor] =
    useInitializeEndOfShiftReportSupervisorMutation();
  const [initializeLostAndFoundTracking] =
    useInitializeLostAndFoundTrackingMutation();
  const [initializeLostProperty] = useInitializeLostPropertyMutation();
  const [initializeImpoundedReport] = useInitializeImpoundedReportMutation();

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

  const {
    data: unsubmittedLostAndFoundTrackings,
    refetch: refetchLostAndFoundTrackings,
  } = useGetUnsubmittedLostAndFoundTrackingQuery({});

  const { data: unsubmittedLostProperty, refetch: refetchLostProperty } =
    useGetUnsubmittedLostPropertyQuery({});

  const {
    data: unsubmittedImpoundedReports,
    refetch: refetchImpoundedReports,
  } = useGetUnsubmittedImpoundedReportQuery({});

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

  const handleClickLostAndFoundTracking = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetchLostAndFoundTrackings();

      if (data?.success && data.data) {
        // ✅ Found an unsubmitted form → navigate to it
        navigate(`/forms/lostAndFoundTracking/${data.data.id}`);
        console.log("asd", data.data);
        return;
      } else {
        // 🆕 No unsubmitted form → initialize new
        const response = await initializeLostAndFoundTracking({}).unwrap();
        navigate(`/forms/lostAndFoundTracking/${response.id}`);
        return;
      }
    } catch (error) {
      console.error("Failed to handle incident report form:", error);
    }
  };

  const handleLostPropertyReportForm = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetchLostProperty();

      if (data?.success && data.data) {
        // ✅ Found an unsubmitted form → navigate to it
        navigate(`/forms/lostPropertyReportForm/${data.data.id}`);
        console.log("asd", data.data);
        return;
      } else {
        // 🆕 No unsubmitted form → initialize new
        const response = await initializeLostProperty({}).unwrap();
        navigate(`/forms/lostPropertyReportForm/${response.id}`);
        return;
      }
    } catch (error) {
      console.error("Failed to handle incident report form:", error);
    }
  };

  const handleClickImpoundedReport = async () => {
    try {
      // Always refetch to make sure data is fresh
      const { data } = await refetchImpoundedReports();

      if (data?.success && data.data) {
        // ✅ Found an unsubmitted form → navigate to it
        navigate(`/forms/impoundedReportForm/${data.data.id}`);
        console.log("asd", data.data);
        return;
      } else {
        // 🆕 No unsubmitted form → initialize new
        const response = await initializeImpoundedReport({}).unwrap();
        navigate(`/forms/impoundedReportForm/${response.id}`);
        return;
      }
    } catch (error) {
      console.error("Failed to handle incident report form:", error);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        height: "92.5vh",
        padding: "3%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <UBFormCard
            title="Incident Report Form"
            image={warning}
            onClick={handleClick}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <UBFormCard
            title="End of Shift Report Patrol"
            image={warning}
            onClick={() => handleClickShiftReportPatrol()}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <UBFormCard
            title="End of Shift Report Supervisor"
            image={warning}
            onClick={() => handleClickShiftReportSupervisor()}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <UBFormCard
            title="Lost and Found Tracking Form"
            image={warning}
            onClick={() => handleClickLostAndFoundTracking()}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <UBFormCard
            title="Lost Property Report Form"
            image={warning}
            onClick={() => handleLostPropertyReportForm()}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <UBFormCard
            title="Bicycle Lost / Impounded Report Tracking Form"
            image={warning}
            onClick={() => handleClickImpoundedReport()}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormNames;
