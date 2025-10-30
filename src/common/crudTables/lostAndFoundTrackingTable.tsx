import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchLostAndFoundTrackingQuery,
  useGenerateLostAndFoundTrackingPdfMutation,
} from "../../../store/services/lostAndFoundTrackingAPI";
import { setLostAndFoundTrackingState } from "../../../store/features/lostAndFoundTrackingSlice";

export const LostAndFoundTrackingTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: lostAndFoundTrackingData } = useFetchLostAndFoundTrackingQuery(
    {}
  );
  const [generateLostAndFoundTrackingPdf] =
    useGenerateLostAndFoundTrackingPdfMutation();

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedLostAndFoundTracking, setSelectedLostAndFoundTracking] =
    useState<{
      id: "";
      facilityName: "";
      time: "";
      todaysDate: "";
      serialNumber: "";
      locationFound: "";
      roomNo: "";
      foundBy: "";
      itemDescription: "";
      supervisorWhoReceivedItem: "";
      dateReturnedToOwner: "";
      timeReturnedToOwner: "";
      owner: "";
      ownerDOB: "";
      ownerAddress: "";
      ownerIDNumber: "";
      ownerTelephone: "";
      remarks: "";
      returnedToOwnerSignature: "";
      ownerAcknowledgementSignature: "";
      uploadedBy: "";
      formSubmitted: false;
    } | null>(null);

  useEffect(() => {
    if (lostAndFoundTrackingData) {
      dispatch(setLostAndFoundTrackingState(lostAndFoundTrackingData?.data));
    }
  }, [lostAndFoundTrackingData, dispatch]);

  console.log(lostAndFoundTrackingData);

  const filteredLostAndFoundTracking = (
    lostAndFoundTrackingData?.data || []
  ).filter((report) => report.id?.toLowerCase().includes(search.toLowerCase()));

  //handle download report pdf
  const handleDownloadReportPDF = async (id: string) => {
    try {
      const response = await generateLostAndFoundTrackingPdf(id);
      console.log("sdfgsdf", response);
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lost_and_found_tracking_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  const handlePreview = (lostAndFoundTracking: any) => {
    setSelectedLostAndFoundTracking(lostAndFoundTracking); // store the report to preview
    setOpenPreview(true); // open the dialog
  };

  const columns: GridColDef[] = [
    { field: "facilityName", headerName: "Facility Name", flex: 1 },
    { field: "todaysDate", headerName: "Today's Date", flex: 1 },
    { field: "itemDescription", headerName: "Item Description", flex: 1 },
    { field: "locationFound", headerName: "Location Found", flex: 1 },
    { field: "foundBy", headerName: "Found By", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 1 },
    { field: "ownerTelephone", headerName: "Owner Telephone", flex: 1 },
    { field: "dateReturnedToOwner", headerName: "Date Returned", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    {
      field: "ownerAcknowledgementSignature",
      headerName: "Owner Acknowledgement Signature",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          facilityName: string;
          time: string;
          todaysDate: string;
          serialNumber: string;
          locationFound: string;
          roomNo: string;
          foundBy: string;
          supervisorWhoReceivedItem: string;
          itemDescription: string;
          dateReturnedToOwner: string;
          timeReturnedToOwner: string;
          owner: string;
          ownerDOB: string;
          ownerAddress: string;
          ownerIDNumber: string;
          ownerTelephone: string;
          remarks: string;
          returnedToOwnerSignature: string;
          ownerAcknowledgementSignature: string;
          uploadedBy: string;
          formSubmitted: boolean;
        };
        return (
          <Box>
            <IconButton onClick={() => handlePreview(row)} color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDownloadReportPDF(row.id)}
              color="secondary"
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: "3%", height: "80vh", width: "100%" }}>
      <DataGrid
        rows={filteredLostAndFoundTracking}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        disableRowSelectionOnClick
      />
      {/* preview for incident report */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            mb: 2,
            color: "#5E4B8B",
            fontWeight: "bold",
            borderBottom: "2px solid #C5A645",
            pb: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            width: "90%",
            margin: "auto",
          }}
        >
          Lost and Found Tracking Preview
        </DialogTitle>
        <DialogContent>
          {selectedLostAndFoundTracking && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Facility Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Facility Name"
                    fullWidth
                    value={selectedLostAndFoundTracking.facilityName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    fullWidth
                    value={selectedLostAndFoundTracking.time}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Today'sDate"
                    fullWidth
                    value={selectedLostAndFoundTracking.todaysDate}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Serial Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Serial Number"
                    fullWidth
                    value={selectedLostAndFoundTracking.serialNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Location Found */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location Found"
                    fullWidth
                    value={selectedLostAndFoundTracking.locationFound}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Room No */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Room No"
                    fullWidth
                    value={selectedLostAndFoundTracking.roomNo}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Found By */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Found By"
                    fullWidth
                    value={selectedLostAndFoundTracking.foundBy}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Supervisor Who Received Item */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Supervisor Who Received Item"
                    fullWidth
                    value={
                      selectedLostAndFoundTracking.supervisorWhoReceivedItem
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* item description */}
                <Grid item xs={12}>
                  <TextField
                    label="Item Description"
                    multiline
                    rows={4}
                    fullWidth
                    value={selectedLostAndFoundTracking.itemDescription}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Date Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Returned to Owner"
                    fullWidth
                    value={selectedLostAndFoundTracking.dateReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time Returned to Owner"
                    fullWidth
                    value={selectedLostAndFoundTracking.timeReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner"
                    fullWidth
                    value={selectedLostAndFoundTracking.owner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner DOB */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner DOB"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerDOB}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Address */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Address"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerAddress}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner ID Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner ID Number"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerIDNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Telephone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Telephone"
                    fullWidth
                    value={selectedLostAndFoundTracking.ownerTelephone}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Remarks */}
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    label="Remarks"
                    fullWidth
                    value={selectedLostAndFoundTracking.remarks}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Returned to Owner Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Returned to Owner Signature"
                    fullWidth
                    value={
                      selectedLostAndFoundTracking.returnedToOwnerSignature
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Acknowledgement Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Acknowledgement Signature"
                    fullWidth
                    value={
                      selectedLostAndFoundTracking.ownerAcknowledgementSignature
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenPreview(false)}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LostAndFoundTrackingTable;
