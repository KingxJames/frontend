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
  Box,
  Typography,
} from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchIncidentReportQuery,
  useDeleteIncidentReportMutation,
  useUpdateIncidentReportMutation,
} from "./../../../store/services/incidentReportAPI";
import { useFetchIncidentStatusesQuery } from "../../../store/services/incidentStatusAPI";
import { useFetchIncidentFilesQuery } from "./../../../store/services/incidentFilesAPI";
import { useFetchIncidentTypesQuery } from "../../../store/services/incidentTypesAPI";
import {
  setIncidentReports,
  updateIncidentReports,
  deleteIncidentReports,
  selectIncidentReports,
} from "./../../../store/features/incidentReportSlice";
import { selectIncidentStatuses } from "./../../../store/features/incidentStatusSlice";
import { selectIncidentFiles } from "./../../../store/features/incidentFileSlice";
import { selectIncidentTypes } from "./../../../store/features/incidentTypeSlice";

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<string | undefined>(undefined);

  const { data: incidentReportsData, refetch } = useFetchIncidentReportQuery();
  const { data: incidentStatusesData } = useFetchIncidentStatusesQuery();
  const { data: incidentFilesData } = useFetchIncidentFilesQuery();
  const { data: incidentTypesData } = useFetchIncidentTypesQuery();
  const [deleteIncidentReport] = useDeleteIncidentReportMutation();
  const [updateIncidentReport] = useUpdateIncidentReportMutation();
  const incidentReports = useSelector(selectIncidentReports);
  const incidentStatuses = useSelector(selectIncidentStatuses);
  const incidentFiles = useSelector(selectIncidentFiles);
  const incidentTypes = useSelector(selectIncidentTypes);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentReport, setNewIncidentReport] = useState({
    action: "",
    buildingId: 0,
    campusId: 0,
    caseNumber: "",
    disposition: "",
    frequency: 0,
    incidentFileId: 0,
    path: "",
    incidentReoccured: new Date().toLocaleDateString("en-CA"), // This will give you the date in YYYY-MM-DD format
    incidentStatusId: 0,
    statuses: "",
    incidentTypeId: 0,
    type: "",
    location: "",
    report: "",
    uploadedBy: "",
    userId: 0,
  });

  const [selectedIncidentReport, setSelectedIncidentReport] = useState<{
    id: number;
    action: string;
    buildingId: number;
    campusId: number;
    caseNumber: string;
    disposition: string;
    frequency: number;
    incidentFileId: number;
    path: string;
    incidentReoccured: string;
    incidentStatusId: number;
    statuses: string;
    incidentTypeId: number;
    type: string;
    location: string;
    report: string;
    uploadedBy: string;
    userId: number;
  } | null>(null);

  useEffect(() => {
    if (incidentReportsData) {
      const mappedIncidentReports = incidentReportsData.map(
        (incidentReport) => ({
          ...incidentReport,
          incidentStatuses:
            incidentStatusesData?.find(
              (statuses) => statuses?.id === incidentReport.incidentStatusId
            )?.statuses || "",
          incidentFiles:
            incidentFilesData?.find(
              (incidentFiles) =>
                incidentFiles?.id === incidentReport.incidentFileId
            )?.path || "",
          incidentTypes:
            incidentTypesData?.find(
              (incidentTypes) =>
                incidentTypes?.id === incidentReport.incidentTypeId
            )?.type || "",
        })
      );
      dispatch(setIncidentReports(mappedIncidentReports)); // Store roles in Redux
    }
  }, [
    incidentReportsData,
    incidentFilesData,
    incidentStatusesData,
    incidentTypesData,
    dispatch,
  ]);

  // Filter roles based on search query
  const filteredIncidentReports = incidentReports.incidentReports
    ? incidentReports.incidentReports.filter(
        (incidentReport) =>
          incidentReport.report?.toLowerCase().includes(search.toLowerCase()) ||
          incidentReport.caseNumber
            ?.toLowerCase()
            .includes(search.toLowerCase())
      )
    : [];

  const handleDelete = async (id: number) => {
    try {
      const incidentReportToDelete = incidentReports.incidentReports.find(
        (incidentReport) => incidentReport.id === id
      );
      if (incidentReportToDelete) {
        await deleteIncidentReport(
          incidentReportToDelete.id.toString()
        ).unwrap(); // Call the delete mutation
        dispatch(deleteIncidentReports(incidentReportToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting Incident Reports:", error);
    }
  };

  const handleExport = () => {
    const csvHeaders = [
      "ID",
      "CaseNumber",
      "Report",
      "Disposition",
      "Action",
      "Location",
      "UploadedBy",
      "Frequency",
      "Incident Occured",
      "Incident Status",
      "Incident File",
      "Incident Type",
    ];

    const csvRows = incidentReports.incidentReports.map((incidentReport) =>
      [
        incidentReport.id,
        incidentReport.caseNumber,
        incidentReport.report,
        incidentReport.disposition,
        incidentReport.action,
        incidentReport.location,
        incidentReport.uploadedBy,
        incidentReport.frequency,
        incidentReport.incidentReoccured,
        incidentReport.statuses,
        incidentReport.path,
        incidentReport.type,
      ]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`) // Ensure proper CSV formatting
        .join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeaders.join(","), ...csvRows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidentReports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup
  };

  // Handle edit incidentReport - open dialog
  const handleEdit = (incidentReport: {
    id: number;
    report: string;
    disposition: string;
    caseNumber: string;
    action: string;
    location: string;
    uploadedBy: string;
    frequency: number;
    incidentReoccured: string;
    incidentFileId: number;
    path: string;
    incidentStatusId: number;
    statuses: string;
    userId: number;
    campusId: number;
    buildingId: number;
    incidentTypeId: number;
    type: string;
  }) => {
    if (!incidentReport) return;
    setSelectedIncidentReport(incidentReport); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateIncidentReport = async () => {
    if (
      !selectedIncidentReport ||
      !selectedIncidentReport.report.trim() ||
      !selectedIncidentReport.disposition.trim() ||
      !selectedIncidentReport.caseNumber.trim() ||
      !selectedIncidentReport.action.trim() ||
      !selectedIncidentReport.location.trim() ||
      !selectedIncidentReport.uploadedBy.trim() ||
      !selectedIncidentReport.frequency ||
      !selectedIncidentReport.incidentReoccured.trim() ||
      !selectedIncidentReport.incidentFileId ||
      !selectedIncidentReport.incidentStatusId ||
      !selectedIncidentReport.userId ||
      !selectedIncidentReport.campusId ||
      !selectedIncidentReport.buildingId ||
      !selectedIncidentReport.incidentTypeId
    ) {
      alert("fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedIncidentReport = await updateIncidentReport({
        id: selectedIncidentReport.id,
        report: selectedIncidentReport.report,
        disposition: selectedIncidentReport.disposition,
        caseNumber: selectedIncidentReport.caseNumber,
        action: selectedIncidentReport.action,
        location: selectedIncidentReport.location,
        uploadedBy: selectedIncidentReport.uploadedBy,
        frequency: selectedIncidentReport.frequency,
        incidentReoccured: selectedIncidentReport.incidentReoccured,
        incidentFileId: selectedIncidentReport.incidentFileId,
        incidentStatusId: selectedIncidentReport.incidentStatusId,
        userId: selectedIncidentReport.userId,
        campusId: selectedIncidentReport.campusId,
        buildingId: selectedIncidentReport.buildingId,
        incidentTypeId: selectedIncidentReport.incidentTypeId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateIncidentReports(updatedIncidentReport));
      refetch();

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedIncidentReport(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleChange = (e: FileChangeEvent): void => {
    console.log(e.target.files);
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const columns: GridColDef[] = [
    { field: "caseNumber", headerName: "Case Number", flex: 1 },
    { field: "report", headerName: "Incident Report", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "incidentReoccured", headerName: "Incident Occured", flex: 1 },
    { field: "incidentStatuses", headerName: "Incident Statuses", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          report: string;
          disposition: string;
          caseNumber: string;
          action: string;
          location: string;
          uploadedBy: string;
          frequency: number;
          incidentReoccured: string;
          incidentFileId: number;
          path: string;
          incidentStatusId: number;
          statuses: string;
          userId: number;
          campusId: number;
          buildingId: number;
          incidentTypeId: number;
          type: string;
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
      {/* Filter and Actions */}
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

      {/* Data Grid */}
      <DataGrid
        rows={filteredIncidentReports}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
      />
      {/* Edit Role Dialog */}
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
                    prev
                      ? { ...prev, caseNumber: e.target.value }
                      : {
                          id: 0,
                          report: "",
                          disposition: "",
                          caseNumber: e.target.value,
                          action: "",
                          location: "",
                          uploadedBy: "",
                          frequency: 0,
                          incidentReoccured: "",
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
                  )
                }
              />
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
                    prev
                      ? { ...prev, disposition: e.target.value }
                      : {
                          id: 0,
                          report: "",
                          disposition: e.target.value,
                          caseNumber: "",
                          action: "",
                          location: "",
                          uploadedBy: "",
                          frequency: 0,
                          incidentReoccured: "",
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
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
                    prev
                      ? { ...prev, action: e.target.value }
                      : {
                          id: 0,
                          report: "",
                          disposition: "",
                          caseNumber: "",
                          action: e.target.value,
                          location: "",
                          uploadedBy: "",
                          frequency: 0,
                          incidentReoccured: "",
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
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
                value={selectedIncidentReport?.location || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev
                      ? { ...prev, location: e.target.value }
                      : {
                          id: 0,
                          report: "",
                          disposition: "",
                          caseNumber: "",
                          action: "",
                          location: e.target.value,
                          uploadedBy: "",
                          frequency: 0,
                          incidentReoccured: "",
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
                  )
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                margin="dense"
                label="Uploaded By"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.uploadedBy || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev
                      ? { ...prev, uploadedBy: e.target.value }
                      : {
                          id: 0,
                          report: "",
                          disposition: "",
                          caseNumber: "",
                          action: "",
                          location: "",
                          uploadedBy: e.target.value,
                          frequency: 0,
                          incidentReoccured: "",
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
                  )
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                margin="dense"
                label="Frequency"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.frequency || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev
                      ? { ...prev, frequency: Number(e.target.value) }
                      : {
                          id: 0,
                          report: "",
                          disposition: "",
                          caseNumber: "",
                          action: "",
                          location: "",
                          uploadedBy: "",
                          frequency: Number(e.target.value),
                          incidentReoccured: "",
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
                  )
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                margin="dense"
                label="Incident Occured"
                fullWidth
                variant="outlined"
                value={selectedIncidentReport?.incidentReoccured || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev
                      ? { ...prev, incidentReoccured: e.target.value }
                      : {
                          id: 0,
                          report: "",
                          disposition: "",
                          caseNumber: "",
                          action: "",
                          location: "",
                          uploadedBy: "",
                          frequency: 0,
                          incidentReoccured: e.target.value,
                          incidentFileId: 0,
                          path: "",
                          incidentStatusId: 0,
                          statuses: "",
                          userId: 0,
                          campusId: 0,
                          buildingId: 0,
                          incidentTypeId: 0,
                          type: "",
                        }
                  )
                }
              />
            </Grid>
            <Grid size={6}>
              <FormControl margin="dense" fullWidth variant="outlined">
                <InputLabel>Incident Status</InputLabel>
                <Select
                  value={selectedIncidentReport?.incidentStatusId || ""}
                  onChange={(e) => {
                    const incidentStatus = incidentStatusesData?.find(
                      (c) => c.id === e.target.value
                    );
                    if (incidentStatus) {
                      setSelectedIncidentReport((prev) =>
                        prev
                          ? {
                              ...prev,
                              incidentStatusId: incidentStatus.id,
                              statuses: incidentStatus.statuses,
                            }
                          : {
                              id: 0,
                              report: "",
                              disposition: "",
                              caseNumber: "",
                              action: "",
                              location: "",
                              uploadedBy: "",
                              frequency: 0,
                              incidentReoccured: "",
                              incidentFileId: 0,
                              path: "",
                              incidentStatusId: incidentStatus.id,
                              statuses: incidentStatus.statuses,
                              userId: 0,
                              campusId: 0,
                              buildingId: 0,
                              incidentTypeId: 0,
                              type: "",
                            }
                      );
                    }
                  }}
                >
                  {incidentStatusesData?.map((incidentStatus) => (
                    <MenuItem key={incidentStatus.id} value={incidentStatus.id}>
                      {incidentStatus.statuses}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <FormControl margin="dense" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">
                Incident Type
              </InputLabel>
              <Select
                value={selectedIncidentReport?.incidentTypeId || ""}
                onChange={(e) => {
                  const incidentType = incidentTypesData?.find(
                    (c) => c.id === e.target.value
                  );
                  if (incidentType) {
                    setSelectedIncidentReport((prev) =>
                      prev
                        ? {
                            ...prev,
                            incidentTypeId: incidentType.id,
                            type: incidentType.type,
                          }
                        : {
                            id: 0,
                            report: "",
                            disposition: "",
                            caseNumber: "",
                            action: "",
                            location: "",
                            uploadedBy: "",
                            frequency: 0,
                            incidentReoccured: "",
                            incidentFileId: 0,
                            path: "",
                            incidentStatusId: 0,
                            statuses: "",
                            userId: 0,
                            campusId: 0,
                            buildingId: 0,
                            incidentTypeId: incidentType.id,
                            type: incidentType.type,
                          }
                    );
                  }
                }}
              >
                {incidentTypesData?.map((incidentType) => (
                  <MenuItem key={incidentType.id} value={incidentType.id}>
                    {incidentType.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Incident Pictures</Typography>
                <input type="file" onChange={handleChange} />
                <img src={file} />
              </Box>

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
                  prev
                    ? { ...prev, report: e.target.value }
                    : {
                        id: 0,
                        report: e.target.value,
                        disposition: "",
                        caseNumber: "",
                        action: "",
                        location: "",
                        uploadedBy: "",
                        frequency: 0,
                        incidentReoccured: "",
                        incidentFileId: 0,
                        path: "",
                        incidentStatusId: 0,
                        statuses: "",
                        userId: 0,
                        campusId: 0,
                        buildingId: 0,
                        incidentTypeId: 0,
                        type: "",
                      }
                )
              }
              sx={{
                width: "100%", // Adjust width as needed
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateIncidentReport} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IncidentReportTable;
