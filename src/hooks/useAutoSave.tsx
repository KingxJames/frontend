import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateEndOfShiftReportPatrolMutation } from "../../store/services/endOfShiftReportPatrolAPI";
import { useUpdateEndOfShiftReportSupervisorMutation } from "../../store/services/endOfShiftReportSupervisorAPI";
import { useUpdateLostAndFoundTrackingMutation } from "../../store/services/lostAndFoundTrackingAPI";
import { selectEndOfShiftReportPatrol } from "../../store/features/endOfShiftReportPatrolSlice";
import { selectEndOfShiftReportSupervisor } from "../../store/features/endOfShiftReportSupervisorSlice";
import { selectLostAndFoundTracking } from "../../store/features/lostAndFoundTrackingSlice";
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

//--------------------------------------------------------------------------------

export const useAutosaveEndOfReportSupervisor = () => {
  const endOfShiftReportSupervisor = useSelector(
    selectEndOfShiftReportSupervisor
  );
  const [updateEndOfShiftReportSupervisor] =
    useUpdateEndOfShiftReportSupervisorMutation();

  useEffect(() => {
    if (!endOfShiftReportSupervisor.id) return; // Only save if ID exists

    const debouncedSave = debounce(async (data) => {
      try {
        await updateEndOfShiftReportSupervisor({
          ...data,
          id: data.id,
        }).unwrap();
        console.log("✅ Autosaved successfully");
      } catch (error) {
        console.error("❌ Autosave failed:", error);
      }
    }, 800); // wait 800ms after typing stops

    debouncedSave(endOfShiftReportSupervisor);

    return () => debouncedSave.cancel(); // cleanup
  }, [endOfShiftReportSupervisor, updateEndOfShiftReportSupervisor]);
};

//--------------------------------------------------------------------------------

export const useAutosaveLostAndFoundTracking = () => {
  const lostAndFoundTracking = useSelector(selectLostAndFoundTracking);
  const [updateLostAndFoundTracking] = useUpdateLostAndFoundTrackingMutation();

  useEffect(() => {
    if (!lostAndFoundTracking.id) return; // Only save if ID exists

    const debouncedSave = debounce(async (data) => {
      try {
        await updateLostAndFoundTracking({
          ...data,
          id: data.id,
        }).unwrap();
        console.log("✅ Autosaved successfully");
      } catch (error) {
        console.error("❌ Autosave failed:", error);
      }
    }, 800); // wait 800ms after typing stops

    debouncedSave(lostAndFoundTracking);

    return () => debouncedSave.cancel(); // cleanup
  }, [lostAndFoundTracking, updateLostAndFoundTracking]);
};
