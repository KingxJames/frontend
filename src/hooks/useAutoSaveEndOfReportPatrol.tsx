import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateEndOfShiftReportPatrolMutation } from "../../store/services/endOfShiftReportPatrolAPI";
import { selectEndOfShiftReportPatrol } from "../../store/features/endOfShiftReportPatrolSlice";
import { debounce } from "lodash";

export const useAutosaveEndOfReportPatrol = () => {
  const endOfShiftReportPatrol = useSelector(selectEndOfShiftReportPatrol);
  const [updateEndOfShiftReportPatrol] =
    useUpdateEndOfShiftReportPatrolMutation();

  useEffect(() => {
    if (!endOfShiftReportPatrol.id) return; // Only save if ID exists

    const debouncedSave = debounce(async (data) => {
      try {
        await updateEndOfShiftReportPatrol({
          ...data,
          id: data.id,
        }).unwrap();
        console.log("✅ Autosaved successfully");
      } catch (error) {
        console.error("❌ Autosave failed:", error);
      }
    }, 800); // wait 800ms after typing stops

    debouncedSave(endOfShiftReportPatrol);

    return () => debouncedSave.cancel(); // cleanup
  }, [endOfShiftReportPatrol, updateEndOfShiftReportPatrol]);
};
