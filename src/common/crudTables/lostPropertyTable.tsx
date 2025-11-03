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
  useFetchLostPropertyQuery,
  useGenerateLostPropertyPdfMutation,
} from "../../../store/services/lostPropertyAPI";
import { setLostPropertyState } from "../../../store/features/lostPropertySlice";

export const LostPropertyTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: lostPropertyData } = useFetchLostPropertyQuery({});
  const [generateLostPropertyPdf] = useGenerateLostPropertyPdfMutation();

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedLostProperty, setSelectedLostProperty] = useState<{
    id: "";
    complainantName: "";
    complainantAddress: "";
    complainantDOB: "";
    complainantTelephone: "";
    complainantID: "";
    complainantEmail: "";
    dateLost: "";
    timeLost: "";
    complainantAffiliation: "";
    additionalDescription: "";
    owner: "";
    ownerSignature: "";
    dateReported: "";
    dateReturnedToOwner: "";
    timeReturnedToOwner: "";
    ownerName: "";
    ownerAddress: "";
    ownerDOB: "";
    ownerID: "";
    ownerEmail: "";
    ownerTelephone: "";
    remarks: "";
    signatureDPS: "";
    returnedToOwnerSignature: "";
    uploadedBy: "";
    formSubmitted: false;
  } | null>(null);

  useEffect(() => {
    if (lostPropertyData) {
      dispatch(setLostPropertyState(lostPropertyData?.data));
    }
  }, [lostPropertyData, dispatch]);

  console.log(lostPropertyData);

  const filteredLostProperty = (lostPropertyData?.data || []).filter((report) =>
    report.id?.toLowerCase().includes(search.toLowerCase())
  );

  //handle download report pdf
  const handleDownloadReportPDF = async (id: string) => {
    try {
      const blob = await generateLostPropertyPdf(id).unwrap();

      if (!(blob instanceof Blob)) {
        throw new Error("Response is not a Blob");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `lost_property_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  const handlePreview = (lostProperty: any) => {
    setSelectedLostProperty(lostProperty); // store the report to preview
    setOpenPreview(true); // open the dialog
  };

  const columns: GridColDef[] = [
    { field: "complainantName", headerName: "Complainant Name", flex: 1 },
    { field: "complainantAddress", headerName: "Complainant Address", flex: 1 },
    { field: "complainantDOB", headerName: "Complainant DOB", flex: 1 },
    {
      field: "complainantTelephone",
      headerName: "Complainant Telephone",
      flex: 1,
    },
    { field: "complainantID", headerName: "Complainant ID", flex: 1 },
    { field: "complainantEmail", headerName: "Complainant Email", flex: 1 },
    {
      field: "complainantAffiliation",
      headerName: "Comlainant Affiliation",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          complainantName: string;
          complainantAddress: string;
          complainantDOB: string;
          complainantTelephone: string;
          complainantID: string;
          complainantEmail: string;
          dateLost: string;
          timeLost: string;
          complainantAffiliation: string;
          additionalDescription: string;
          owner: string;
          ownerSignature: string;
          dateReported: string;
          dateReturnedToOwner: string;
          timeReturnedToOwner: string;
          ownerName: string;
          ownerAddress: string;
          ownerDOB: string;
          ownerID: string;
          ownerEmail: string;
          ownerTelephone: string;
          remarks: string;
          signatureDPS: string;
          returnedToOwnerSignature: string;
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
        rows={filteredLostProperty}
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
          Lost Property Preview
        </DialogTitle>
        <DialogContent>
          {selectedLostProperty && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Complainant Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Complainant Name"
                    fullWidth
                    value={selectedLostProperty.complainantName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Complainant Address */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Complainant Address"
                    fullWidth
                    value={selectedLostProperty.complainantAddress}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Complainant DOB */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Complainant DOB"
                    fullWidth
                    value={selectedLostProperty.complainantDOB}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Complainant Telephone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Complainant Telephone"
                    fullWidth
                    value={selectedLostProperty.complainantTelephone}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Complainant ID */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Complainant ID"
                    fullWidth
                    value={selectedLostProperty.complainantID}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Complainant Email */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Complainant Email"
                    fullWidth
                    value={selectedLostProperty.complainantEmail}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Date Lost */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Lost"
                    fullWidth
                    value={selectedLostProperty.dateLost}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time Lost */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time Lost"
                    fullWidth
                    value={selectedLostProperty.timeLost}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Comlainant Affiliation */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Comlainant Affiliation"
                    fullWidth
                    value={selectedLostProperty.complainantAffiliation}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Additional Description */}
                <Grid item xs={12}>
                  <TextField
                    label="Additional Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={selectedLostProperty.additionalDescription}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner"
                    fullWidth
                    value={selectedLostProperty.owner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Signature"
                    fullWidth
                    value={selectedLostProperty.ownerSignature}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Date Reportted */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Reportted"
                    fullWidth
                    value={selectedLostProperty.dateReported}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Date Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Returned to Owner"
                    fullWidth
                    value={selectedLostProperty.dateReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time Returned to Owner */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time Returned to Owner"
                    fullWidth
                    value={selectedLostProperty.timeReturnedToOwner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Name"
                    fullWidth
                    value={selectedLostProperty.ownerName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Address */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Address"
                    fullWidth
                    value={selectedLostProperty.ownerAddress}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner DOB */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner DOB"
                    fullWidth
                    value={selectedLostProperty.ownerDOB}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner ID */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner ID"
                    fullWidth
                    value={selectedLostProperty.ownerID}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Email */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Email"
                    fullWidth
                    value={selectedLostProperty.ownerEmail}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Owner Telephone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Owner Telephone"
                    fullWidth
                    value={selectedLostProperty.ownerTelephone}
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
                    value={selectedLostProperty.remarks}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Signature DPS */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Signature DPS"
                    fullWidth
                    value={selectedLostProperty.signatureDPS}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Returned to Owner Signature */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Returned to Owner Signature"
                    fullWidth
                    value={selectedLostProperty.returnedToOwnerSignature}
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

export default LostPropertyTable;
