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
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchIncidentReportQuery,
  // useDeleteIncidentReportMutation,
  // useUpdateIncidentReportMutation,
} from "./../../../store/services/incidentReportAPI";
// import { useFetchBuildingsQuery } from "../../../store/services/buildingsAPI";
import {
  setIncidentReportState,
  // updateIncidentReport,
  // deleteIncidentReport,
  selectIncidentReports,
  IIncidentFile,
} from "./../../../store/features/incidentReportSlice";
// import {
//   selectBuildings,
//   setBuilding,
// } from "../../../store/features/buildingSlice";
import axios from "axios";
import { buildApiUrl } from "../../../store/config/api";

interface IncidentReportFile {
  name: string;
  path: string;
}

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]); // Store multiple file objects

  // const { data: incidentReportsData, refetch } = useFetchIncidentReportQuery();

  // const [deleteIncidentReports] = useDeleteIncidentReportMutation();
  // const [updateIncidentReports] = useUpdateIncidentReportMutation();
  // const incidentReports = useSelector(selectIncidentReports);
  // const buildings = useSelector(selectBuildings);

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentReport, setNewIncidentReport] = useState({
    id: "",
    action: "",
    caseNumber: "",
    disposition: "",
    incidentStatus: "",
    incidentType: "",
    incidentFiles: [],
    buildingId: "",
    buildingLocation: "",
    report: "",
    uploadedBy: "",
  });

  const [selectedIncidentReport, setSelectedIncidentReport] = useState<{
    id: string;
    action: string;
    caseNumber: string;
    disposition: string;
    incidentStatus: string;
    incidentType: string;
    incidentFiles: IIncidentFile[];
    buildingId: string;
    buildingLocation: string;
    report: string;
    uploadedBy: string;
  } | null>(null);

  // useEffect(() => {
  //   if (incidentReportsData) {
  //     dispatch(setIncidentReport(incidentReportsData.data));
  //   }
  // }, [incidentReportsData, dispatch]);

  // const filteredIncidentReports = Array.isArray(incidentReports)
  //   ? incidentReports.filter(
  //       (incidentReport) =>
  //         incidentReport.report?.toLowerCase().includes(search.toLowerCase()) ||
  //         incidentReport.caseNumber
  //           ?.toLowerCase()
  //           .includes(search.toLowerCase())
  //     )
  //   : [];

  // const handleDelete = async (id: string) => {
  //   if (!id) return;
  //   try {
  //     await deleteIncidentReports(id).unwrap(); // API call
  //     refetch();
  //   } catch (error) {
  //     console.error("Failed to delete incident report:", error);
  //   }
  // };

  const handleExport = () => {
    const csvHeaders = [
      "ID",
      "CaseNumber",
      "Incident Type",
      "Location",
      "Report",
      "Disposition",
      "Action",
      "Incident File",
      "UploadedBy",
    ];

    // const csvRows = incidentReports.map((incidentReport) =>
    //   [
    //     incidentReport.id,
    //     incidentReport.caseNumber,
    //     incidentReport.incidentType,
    //     incidentReport.buildingLocation,
    //     incidentReport.incidentStatus,
    //     incidentReport.report,
    //     incidentReport.disposition,
    //     incidentReport.action,
    //     incidentReport.incidentFiles,
    //     incidentReport.uploadedBy,
    //   ]
    //     .map((field) => `"${String(field).replace(/"/g, '""')}"`)
    //     .join(",")
    // );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeaders.join(","), ...csvRows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidentReports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (incidentReport: {
    id: string;
    action: string;
    caseNumber: string;
    disposition: string;
    incidentStatus: string;
    incidentType: string;
    incidentFiles: IIncidentFile[];
    buildingId: string;
    buildingLocation: string;
    report: string;
    uploadedBy: string;
  }) => {
    if (!incidentReport) return;

    setSelectedIncidentReport({
      ...incidentReport,
    });
    setOpenEdit(true);
  };

  const handleUpdateIncidentReport = async (
    index: number,
    files: (File | IncidentReportFile)[] | null
  ) => {
    if (
      !selectedIncidentReport ||
      !selectedIncidentReport.action ||
      !selectedIncidentReport.caseNumber ||
      !selectedIncidentReport.report ||
      !selectedIncidentReport.disposition ||
      !selectedIncidentReport.incidentStatus ||
      !selectedIncidentReport.incidentFiles ||
      !selectedIncidentReport.incidentType ||
      !selectedIncidentReport.buildingId ||
      !selectedIncidentReport.buildingLocation ||
      !selectedIncidentReport.uploadedBy
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      //API call to update incident report
      const updatedIncidentReport = await updateIncidentReports(
        selectedIncidentReport
      ).unwrap();
      dispatch(updateIncidentReport(updatedIncidentReport));
      refetch();
      setOpenEdit(false);
      setSelectedIncidentReport(null);
      setFiles([]);
    } catch (error) {
      console.error("Error updating incident report:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "caseNumber", headerName: "Case Number", flex: 1 },
    { field: "incidentType", headerName: "Incident Type", flex: 1 },
    { field: "buildingLocation", headerName: "Location", flex: 1 },
    { field: "incidentStatus", headerName: "Incident Status", flex: 1 },
    { field: "report", headerName: "Incident Report", flex: 1 },
    { field: "disposition", headerName: "Disposition", flex: 1 },
    { field: "action", headerName: "Action Taken", flex: 1 },
    { field: "incidentFiles", headerName: "Incident Files", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          action: string;
          caseNumber: string;
          disposition: string;
          incidentStatus: string;
          incidentType: string;
          incidentFiles: IIncidentFile[];
          buildingId: string;
          buildingLocation: string;
          report: string;
          uploadedBy: string;
        };
        return (
          <div>
            <IconButton onClick={() => handleEdit(row)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.id)}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "3%", height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <TextField
          label="Search Incident Reports"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "40%" }}
        />
        <div>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </div>
      </div>

      <DataGrid
        rows={filteredIncidentReports}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
      />
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullScreen
        sx={{ width: "50vw", height: "90vh", margin: "auto" }}
      >
        <DialogTitle>Edit Incident Report</DialogTitle>
        <DialogContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <TextField
                margin="dense"
                label="Case Number"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.caseNumber || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev ? { ...prev, caseNumber: e.target.value } : null
                  )
                }
              />
            </Grid>

            <Grid size={6}>
              <FormControl margin="dense" fullWidth variant="outlined">
                <InputLabel>Incident Type</InputLabel>
                <Select
                  value={newIncidentReport.incidentType}
                  label="Incident Status"
                  onChange={(e) =>
                    setNewIncidentReport({
                      ...newIncidentReport,
                      incidentType: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Near Misses">Near Misses</MenuItem>
                  <MenuItem value="Environmental Incidents">
                    Environmental Incidents
                  </MenuItem>
                  <MenuItem value="Security Incidents">
                    Security Incidents
                  </MenuItem>
                  <MenuItem value="Equipment Malfunctions">
                    Equipment Malfunctions
                  </MenuItem>
                  <MenuItem value="Property Damage">Property Damage</MenuItem>
                  <MenuItem value="Sentinel Events">Sentinel Events</MenuItem>
                  <MenuItem value="Unsafe Acts & Conditions">
                    Equipment Malfunctions
                  </MenuItem>
                  <MenuItem value="Customer/Public Incidents">
                    Equipment Malfunctions
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6}>
              <TextField
                margin="dense"
                label="Disposition"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.disposition || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev ? { ...prev, disposition: e.target.value } : null
                  )
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                margin="dense"
                label="Action"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.action || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev ? { ...prev, action: e.target.value } : null
                  )
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                margin="dense"
                label="Location"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.buildingLocation || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev ? { ...prev, buildingLocation: e.target.value } : null
                  )
                }
              />
            </Grid>

            <Grid size={6}>
              <FormControl margin="dense" fullWidth variant="outlined">
                <InputLabel>Incident Status</InputLabel>
                <Select
                  value={newIncidentReport.incidentStatus}
                  label="Incident Status"
                  onChange={(e) =>
                    setNewIncidentReport({
                      ...newIncidentReport,
                      incidentStatus: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Investigating">Investigating</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
              </Button>

              <Typography sx={{ mt: 2 }}>
                Upload Photos:
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                  {(selectedIncidentReport?.data?.incidentFiles ?? []).map((file, index) => {
                    const incidentPicture = file.incidentPicture; // ✅ string like "app/private/uploads/photos/txjce3YKKVtvYBFGGEFZY.jpeg"


                    // ✅ Build full URL
                    const url = incidentPicture
                      ? buildApiUrl(
                          `publicSafety/uploadIncidentReportPhoto/${incidentPicture
                            .split("/")
                            .pop()}`
                        )
                      : "";

                    console.log("--->url", url);

                    return (
                      <img
                        key={index}
                        src={url}
                        alt="incident report"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    );
                  })}
                </Box>
              </Typography>
            </Grid>

            <TextField
              autoFocus
              multiline
              rows={10}
              margin="dense"
              label="Incident Report"
              fullWidth
              variant="outlined"
              value={selectedIncidentReport?.report || ""}
              onChange={(e) =>
                setSelectedIncidentReport((prev) =>
                  prev ? { ...prev, report: e.target.value } : null
                )
              }
              sx={{
                width: "100%",
              }}
            />
          </Grid>

          <Typography>
            Uploaded By: {selectedIncidentReport?.uploadedBy || ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleUpdateIncidentReport(
                0,
                selectedIncidentReport?.incidentFiles ?? null
              )
            }
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IncidentReportTable;
