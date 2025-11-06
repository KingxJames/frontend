import React, { useEffect, useState } from "react";
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
  Box,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch } from "react-redux";
import {
  useFetchImpoundedReportQuery,
  useGenerateImpoundedReportPdfMutation,
} from "../../../store/services/impoundedReportAPI";
import { setImpoundedReportState } from "../../../store/features/impoundedReportSlice";

export const ImpoundedReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: impoundedReportData } = useFetchImpoundedReportQuery({});
  const [generateImpoundedReportPdf] = useGenerateImpoundedReportPdfMutation();

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  const [selectedImpoundedReport, setSelectedImpoundedReport] = useState<{
    id: string;
    name: string;
    studentID: string;
    phoneNumber: string;
    address: string;
    todayDate: string;
    brand: string;
    model: string;
    color: string;
    style: string;
    serialNumber: string;
    purchaseDate: string;
    purchasePrice: string;
    locationOfBikeStolen: string;
    whatTimeBikeStolen: string;
    bicycleRack: string;
    whenWasBikeWasStolen: string;
    signature: string;
    dateOfSignature: string;
    dateReturnedToOwner: string;
    ownerName: string;
    ownerAddress: string;
    ownerDOB: string;
    ownerIDNumber: string;
    ownerTelephone: string;
    remarks: string;
    ownerSignature: string;
    signaturePSD: string;
    nameOfFinder: string;
    locationFound: string;
    trackingBrand: string;
    trackingModel: string;
    trackingColor: string;
    trackingStyle: string;
    trackingSerialNumber: string;
    supervisorWhoreceivedItems: string;
    trackingFormRemarks: string;
    dateReturnedToOwner2: string;
    ownerName2: string;
    ownerAddress2: string;
    ownerDOB2: string;
    ownerIDNumber2: string;
    ownerTelephone2: string;
    remarks2: string;
    ownerSignature2: string;
    signaturePSD2: string;
    uploadedBy: string;
    formSubmitted: boolean;
  } | null>(null);

  useEffect(() => {
    if (impoundedReportData) {
      dispatch(setImpoundedReportState(impoundedReportData?.data));
    }
  }, [impoundedReportData, dispatch]);

  const filteredImpoundedReports = (impoundedReportData?.data || []).filter(
    (report) => report.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadReportPDF = async (id: string) => {
    try {
      const response = await generateImpoundedReportPdf(id);
      console.log("sdfgsdf", response);
      const blob = response?.data;
      if (!blob) {
        console.error("No PDF data received for report", id);
        return;
      }
      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `impoundedReport_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  const handlePreview = (impoundedReport: any) => {
    setSelectedImpoundedReport(impoundedReport); // store the report to preview
    setOpenPreview(true); // open the dialog
  };

  useEffect(() => {
    if (impoundedReportData) {
      dispatch(setImpoundedReportState(impoundedReportData?.data));
    }
  }, [impoundedReportData, dispatch]);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "studentID", headerName: "Student ID", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "todayDate", headerName: "Today's Date", flex: 1 },
    { field: "serialNumber", headerName: "Serial Number", flex: 1 },
    {
      field: "locationOfBikeStolen",
      headerName: "Location of Bike Stolen",
      flex: 1,
    },
    {
      field: "whatTimeBikeStolen",
      headerName: "What Time Bike Stolen",
      flex: 1,
    },
    { field: "bicycleRack", headerName: "Bicycle Rack", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          date: string;
          time: string;
          campus: string;
          report: string;
          uploadedBy: string;
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
        rows={filteredImpoundedReports}
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
          Bicycle Lost / Impounded Report Tracking Form Preview
        </DialogTitle>
        <DialogContent>
          {selectedImpoundedReport && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={selectedImpoundedReport.name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Student ID */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Student ID"
                    fullWidth
                    value={selectedImpoundedReport.studentID}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Phone Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={selectedImpoundedReport.phoneNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Address */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Address"
                    fullWidth
                    value={selectedImpoundedReport.address}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Today's Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Today's Date"
                    fullWidth
                    value={selectedImpoundedReport.todayDate}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    mb: 4,
                    width: "100%",
                    color: "#5E4B8B",
                    fontWeight: "bold",
                    borderBottom: "2px solid #C5A645",
                    pb: 1,
                  }}
                >
                  Bicycle Information Form
                </Typography>
                {/* Brand */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Brand"
                    fullWidth
                    value={selectedImpoundedReport.brand}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Model */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Model"
                    fullWidth
                    value={selectedImpoundedReport.model}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Color */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Color"
                    fullWidth
                    value={selectedImpoundedReport.color}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Style */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Style"
                    fullWidth
                    value={selectedImpoundedReport.style}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Serial Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Serial Number"
                    fullWidth
                    value={selectedImpoundedReport.serialNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Purchase Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Purchase Date"
                    fullWidth
                    value={selectedImpoundedReport.purchaseDate}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Purchase Price */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Purchase Price"
                    fullWidth
                    value={selectedImpoundedReport.purchasePrice}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Location of Bike Stolen */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location of Bike Stolen"
                    fullWidth
                    value={selectedImpoundedReport.locationOfBikeStolen}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* What Time Bike Stolen */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="What Time Bike Stolen"
                    fullWidth
                    value={selectedImpoundedReport.whatTimeBikeStolen}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Bicycle Rack */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Bicycle Rack"
                    fullWidth
                    value={selectedImpoundedReport.bicycleRack}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* When Was Bike Was Stolen */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="When Was Bike Was Stolen"
                    fullWidth
                    value={selectedImpoundedReport.whenWasBikeWasStolen}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Signature"
                    fullWidth
                    value={selectedImpoundedReport.signature}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Date of Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date of Signature"
                    fullWidth
                    value={selectedImpoundedReport.dateOfSignature}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    mb: 4,
                    width: "100%",
                    color: "#5E4B8B",
                    fontWeight: "bold",
                    borderBottom: "2px solid #C5A645",
                    pb: 1,
                  }}
                >
                  Disposition Of Property
                </Typography>

                {/* Date Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Returned to Owner"
                    fullWidth
                    value={selectedImpoundedReport.dateReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Name"
                    fullWidth
                    value={selectedImpoundedReport.ownerName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Address */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Address"
                    fullWidth
                    value={selectedImpoundedReport.ownerAddress}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner DOB */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner DOB"
                    fullWidth
                    value={selectedImpoundedReport.ownerDOB}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner ID Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner ID Number"
                    fullWidth
                    value={selectedImpoundedReport.ownerIDNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Telephone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Telephone"
                    fullWidth
                    value={selectedImpoundedReport.ownerTelephone}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Remarks */}
                <Grid item xs={12}>
                  <TextField
                    label="Remarks"
                    multiline
                    rows={4}
                    fullWidth
                    value={selectedImpoundedReport.remarks}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Signature"
                    fullWidth
                    value={selectedImpoundedReport.ownerSignature}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Signature PSD */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Signature PSD"
                    fullWidth
                    value={selectedImpoundedReport.signaturePSD}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Name of Finder */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name of Finder"
                    fullWidth
                    value={selectedImpoundedReport.nameOfFinder}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    mb: 4,
                    width: "100%",
                    color: "#5E4B8B",
                    fontWeight: "bold",
                    borderBottom: "2px solid #C5A645",
                    pb: 1,
                  }}
                >
                  Impound Report Tracking Form
                </Typography>

                {/* Location Found */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location Found"
                    fullWidth
                    value={selectedImpoundedReport.locationFound}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Tracking Brand */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Brand"
                    fullWidth
                    value={selectedImpoundedReport.trackingBrand}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Tracking Model */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Model"
                    fullWidth
                    value={selectedImpoundedReport.trackingModel}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Tracking Color */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Color"
                    fullWidth
                    value={selectedImpoundedReport.trackingColor}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Tracking Style */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Style"
                    fullWidth
                    value={selectedImpoundedReport.trackingStyle}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Tracking Serial Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Serial Number"
                    fullWidth
                    value={selectedImpoundedReport.trackingSerialNumber}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Supervisor Who Received Items */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Supervisor Who Received Items"
                    fullWidth
                    value={selectedImpoundedReport.supervisorWhoreceivedItems}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Tracking Form Remarks */}
                <Grid item xs={12}>
                  <TextField
                    label="Remarks"
                    multiline
                    rows={4}
                    fullWidth
                    value={selectedImpoundedReport.trackingFormRemarks}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    mb: 4,
                    width: "100%",
                    color: "#5E4B8B",
                    fontWeight: "bold",
                    borderBottom: "2px solid #C5A645",
                    pb: 1,
                  }}
                >
                  Disposition Of Property
                </Typography>

                {/* Date Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Returned to Owner"
                    fullWidth
                    value={selectedImpoundedReport.dateReturnedToOwner2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Name2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Name"
                    fullWidth
                    value={selectedImpoundedReport.ownerName2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Address2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Address"
                    fullWidth
                    value={selectedImpoundedReport.ownerAddress2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner DOB2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner DOB"
                    fullWidth
                    value={selectedImpoundedReport.ownerDOB2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner ID Number2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner ID Number"
                    fullWidth
                    value={selectedImpoundedReport.ownerIDNumber2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Telephone2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Telephone"
                    fullWidth
                    value={selectedImpoundedReport.ownerTelephone2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Remarks2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Remarks"
                    fullWidth
                    value={selectedImpoundedReport.remarks2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Signature2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Signature"
                    fullWidth
                    value={selectedImpoundedReport.ownerSignature2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Signature PSD2 */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Signature PSD"
                    fullWidth
                    value={selectedImpoundedReport.signaturePSD2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Uploaded By */}
                <Grid item xs={12}>
                  <TextField
                    label="Uploaded By"
                    fullWidth
                    value={selectedImpoundedReport.uploadedBy}
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

export default ImpoundedReportTable;
