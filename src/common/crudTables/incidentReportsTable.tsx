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
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchIncidentReportQuery,
  useCreateIncidentReportMutation,
  useDeleteIncidentReportMutation,
  useUpdateIncidentReportMutation,
} from "../../../store/services/incidentReportAPI";
// import { useFetchBuildingsQuery } from "../../../store/services/buildingsAPI";
import {
  setIncidentReportState,
  // updateIncidentReport,
  // deleteIncidentReport,
  selectIncidentReports,
  IIncidentReport,
  IIncidentFile,
} from "../../../store/features/incidentReportSlice";
import { set } from "react-hook-form";

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]); // Store multiple file objects
  const incidentReports = useSelector(selectIncidentReports);
  const { data: incidentReportData, isLoading } = useFetchIncidentReportQuery(
    {}
  );
  const [deleteIncidentReports] = useDeleteIncidentReportMutation();

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [newIncidentReport, setNewIncidentReport] = useState({
    id: "",
    action: "",
    description: "",
    caseNumber: "",
    incidentReportStatus: "",
    incidentType: "",
    incidentFiles: [],
    buildingName: "",
    campus: "",
    uploadedBy: "",
    date: "",
    time: "",
    reportedBy: "",
    contact: "",
    witnesses: "",
  });

  const [selectedIncidentReport, setSelectedIncidentReport] = useState<{
    id: string;
    action: string;
    description: string;
    caseNumber: string;
    incidentReportStatus: string;
    incidentType: string;
    incidentFiles: IIncidentFile[];
    buildingName: string;
    campus: string;
    uploadedBy: string;
    date: string;
    time: string | null;
    reportedBy: string;
    contact: string;
    witnesses: string;
  } | null>(null);

  useEffect(() => {
    if (incidentReportData) {
      dispatch(setIncidentReportState(incidentReportData?.data));
    }
  }, [incidentReportData, dispatch]);

  console.log(incidentReportData);

  // console.log(dispatch(setIncidentReportState(incidentReportData?.data)));

  // const filteredIncidentReports = Array.isArray(incidentReports)
  //   ? incidentReports.filter(
  //       (incidentReport) =>
  //         incidentReport.report?.toLowerCase().includes(search.toLowerCase()) ||
  //         incidentReport.caseNumber
  //           ?.toLowerCase()
  //           .includes(search.toLowerCase())
  //     )
  //   : [];

  const filteredIncidentReports = (incidentReportData?.data || []).filter(
    (report) =>
      report.description?.toLowerCase().includes(search.toLowerCase()) ||
      report.caseNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePreview = (incidentReport: IIncidentReport) => {
    setSelectedIncidentReport(incidentReport); // store the report to preview
    setOpenPreview(true); // open the dialog
  };

  const handleDownload = (incidentReport: IIncidentReport) => {
    console.log(incidentReport);
  };

  const columns: GridColDef[] = [
    { field: "caseNumber", headerName: "Case Number", flex: 1 },
    { field: "incidentType", headerName: "Incident Type", flex: 1 },
    // { field: "buildingName", headerName: "Building Name", flex: 1 },
    // { field: "campus", headerName: "Campus", flex: 1 },
    { field: "incidentReportStatus", headerName: "Incident Status", flex: 1 },
    { field: "description", headerName: "Incident Report", flex: 1 },
    { field: "action", headerName: "Action Taken", flex: 1 },
    // { field: "incidentFiles", headerName: "Incident Files", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    // { field: "date", headerName: "Date", flex: 1 },
    // { field: "time", headerName: "Time", flex: 1 },
    { field: "reportedBy", headerName: "Reported By", flex: 1 },
    // { field: "contact", headerName: "Contact", flex: 1 },
    // { field: "witnesses", headerName: "Witnesses", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          action: string;
          description: string;
          caseNumber: string;
          incidentReportStatus: string;
          incidentType: string;
          incidentFiles: IIncidentFile[];
          buildingName: string;
          campus: string;
          uploadedBy: string;
          date: string;
          time: string | null;
          reportedBy: string;
          contact: string;
          witnesses: string;
        };
        return (
          <Box>
            <IconButton onClick={() => handlePreview(row)} color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton onClick={() => handleDownload(row)} color="secondary">
              <DownloadIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: "3%", height: "100%", width: "100%" }}>
      <DataGrid
        rows={filteredIncidentReports}
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
          Incident Report Preview - {selectedIncidentReport?.caseNumber ?? ""}
        </DialogTitle>
        <DialogContent>
          {selectedIncidentReport && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    fullWidth
                    value={selectedIncidentReport.date}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    fullWidth
                    value={selectedIncidentReport.time ?? ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Building Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Building Name"
                    fullWidth
                    value={selectedIncidentReport.buildingName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Campus */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Campus"
                    fullWidth
                    value={selectedIncidentReport.campus}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Incident Type */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Incident Type"
                    fullWidth
                    value={selectedIncidentReport.incidentType}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Status"
                    fullWidth
                    value={selectedIncidentReport.incidentReportStatus}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    label="Description of Incident"
                    fullWidth
                    multiline
                    rows={4}
                    value={selectedIncidentReport.description}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* upload files - Fix this*/}
                {/* <Grid item xs={12}>
                  <TextField
                    label="Uploaded Files"
                    fullWidth
                    multiline
                    rows={3}
                    value={selectedIncidentReport.incidentFiles?.length ?? 0}
                    InputProps={{ readOnly: true }}
                  />
                </Grid> */}

                <Box sx={{ width: "100%", pl: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      mb: 1,
                      fontWeight: "bold",
                      color: "#5E4B8B",
                      borderBottom: "2px solid #C5A645",
                      width: "100%",
                      pb: 1,
                    }}
                  >
                    Incident Files
                  </Typography>
                  <Grid container spacing={2} sx={{ p: "2%" }}>
                    {selectedIncidentReport.incidentFiles?.map(
                      (file: IIncidentFile, index: number) => (
                        <Grid item xs={12} md={6} key={index}>
                          <TextField
                            label={`Incident File ${index + 1}`}
                            fullWidth
                            value={file.incidentPicture}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>

                {/* Action Taken */}
                <Grid item xs={12}>
                  <TextField
                    label="Action Taken"
                    fullWidth
                    multiline
                    rows={3}
                    value={selectedIncidentReport.action}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Box sx={{ width: "100%", pl: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      mb: 1,
                      fontWeight: "bold",
                      color: "#5E4B8B",
                      borderBottom: "2px solid #C5A645",
                      width: "100%",
                      pb: 1,
                    }}
                  >
                    People Involved
                  </Typography>
                </Box>

                {/* Reported By */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Reported By"
                    fullWidth
                    value={selectedIncidentReport.reportedBy}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Contact */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contact"
                    fullWidth
                    value={selectedIncidentReport.contact}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Witnesses */}
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Witnesses"
                    fullWidth
                    value={selectedIncidentReport.witnesses}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Uploaded By */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Uploaded By"
                    fullWidth
                    value={selectedIncidentReport.uploadedBy}
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
