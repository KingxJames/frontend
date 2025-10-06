import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
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
    console.log(incidentReport);
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
        fullScreen
      >
        <DialogTitle>Preview Incident Report</DialogTitle>
        <DialogContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={6}>
              <Typography variant="h6">Case Number</Typography>
              <Typography variant="h6">{incidentReports.caseNumber}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
