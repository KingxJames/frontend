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

  return (
    <Box>
      <UBFormCard
        title="Incident Report Form"
        image={warning}
        onClick={handleClick}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "250px",
          borderTop: "1px solid gray",
          backgroundColor: "white", // keep it visible over content
          textAlign: "left",
          pl: "1%",
        }}
      >
        <Typography>Draft</Typography>
      </Box>
    </Box>
  );
};

export default FormNames;
