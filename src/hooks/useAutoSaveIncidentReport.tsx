// src/hooks/useAutosaveIncidentReport.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateIncidentReportMutation } from "../../store/services/incidentReportAPI";
import { selectIncidentReports } from "../../store/features/incidentReportSlice";
import { debounce } from "lodash";

export const useAutosaveIncidentReport = () => {
  const incidentReports = useSelector(selectIncidentReports);
  const [updateIncidentReport] = useUpdateIncidentReportMutation();

  useEffect(() => {
    if (!incidentReports.id) return; // Only save if ID exists

    const debouncedSave = debounce(async (data) => {
      try {
        await updateIncidentReport({
          ...data,
          id: data.id,
        }).unwrap();
        console.log("✅ Autosaved successfully");
      } catch (error) {
        console.error("❌ Autosave failed:", error);
      }
    }, 800); // wait 800ms after typing stops

    debouncedSave(incidentReports);

    return () => debouncedSave.cancel(); // cleanup
  }, [incidentReports, updateIncidentReport]);
};
