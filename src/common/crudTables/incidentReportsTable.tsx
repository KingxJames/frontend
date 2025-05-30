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
import { useFetchIncidentTypesQuery } from "../../../store/services/incidentTypesAPI";
import {
  setIncidentReports,
  updateIncidentReports,
  deleteIncidentReports,
  selectIncidentReports,
} from "./../../../store/features/incidentReportSlice";

interface IncidentReportFile {
  name: string;
  path: string;
}

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]); // Store multiple file objects

  const { data: incidentReportsData, refetch } = useFetchIncidentReportQuery();
  const { data: incidentStatusesData } = useFetchIncidentStatusesQuery();
  const { data: incidentTypesData } = useFetchIncidentTypesQuery();
  const [deleteIncidentReport] = useDeleteIncidentReportMutation();
  const [updateIncidentReport] = useUpdateIncidentReportMutation();
  const incidentReports = useSelector(selectIncidentReports);

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedIncidentReport, setSelectedIncidentReport] = useState<{
    id: number;
    action: string;
    buildingId: number;
    campusId: number;
    caseNumber: string;
    disposition: string;
    frequency: number;
    incidentFiles: (File | IncidentReportFile)[]; // Can be either new Files or existing file objects
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
          incidentTypes:
            incidentTypesData?.find(
              (incidentTypes) =>
                incidentTypes?.id === incidentReport.incidentTypeId
            )?.type || "",
        })
      );
      dispatch(setIncidentReports(mappedIncidentReports));
    }
  }, [incidentReportsData, incidentStatusesData, incidentTypesData, dispatch]);

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
        ).unwrap();
        dispatch(deleteIncidentReports(incidentReportToDelete.id));
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
        incidentReport.type,
      ]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`)
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
    document.body.removeChild(link);
  };

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
    incidentFiles: string; // This should be the file paths from your database
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

    // Convert existing file paths to File objects or URLs for preview
    const existingFiles = incidentReport.incidentFiles
      ? incidentReport.incidentFiles.split(", ").map((filePath) => ({
          name: filePath.split("/").pop() || "", // Extract filename
          path: filePath, // Full path from database
        }))
      : [];

    setSelectedIncidentReport({
      ...incidentReport,
      incidentFiles: existingFiles, // Initialize with existing files
    });
    setOpenEdit(true);
  };

  const handleUpdateIncidentReport = async (
    index: number,
    files: (File | IncidentReportFile)[] | null
  ) => {
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
      !selectedIncidentReport.incidentStatusId ||
      !selectedIncidentReport.userId ||
      !selectedIncidentReport.campusId ||
      !selectedIncidentReport.buildingId ||
      !selectedIncidentReport.incidentTypeId
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();

      // Append non-file fields to FormData
      formData.append("id", selectedIncidentReport.id.toString());
      formData.append("report", selectedIncidentReport.report);
      formData.append("disposition", selectedIncidentReport.disposition);
      formData.append("caseNumber", selectedIncidentReport.caseNumber);
      formData.append("action", selectedIncidentReport.action);
      formData.append("location", selectedIncidentReport.location);
      formData.append("uploadedBy", selectedIncidentReport.uploadedBy);
      formData.append("frequency", selectedIncidentReport.frequency.toString());
      formData.append(
        "incidentReoccured",
        selectedIncidentReport.incidentReoccured
      );
      formData.append(
        "incidentStatusId",
        selectedIncidentReport.incidentStatusId.toString()
      );
      formData.append("userId", selectedIncidentReport.userId.toString());
      formData.append("campusId", selectedIncidentReport.campusId.toString());
      formData.append(
        "buildingId",
        selectedIncidentReport.buildingId.toString()
      );
      formData.append(
        "incidentTypeId",
        selectedIncidentReport.incidentTypeId.toString()
      );

      // Append files if they exist
      if (files && files.length > 0) {
        files.forEach((file) => {
          if (file instanceof File) {
            formData.append("incidentFiles[]", file);
          }
        });
      }

      const updatedIncidentReportPayload = {
        id: selectedIncidentReport.id,
        report: selectedIncidentReport.report,
        disposition: selectedIncidentReport.disposition,
        caseNumber: selectedIncidentReport.caseNumber,
        action: selectedIncidentReport.action,
        location: selectedIncidentReport.location,
        uploadedBy: selectedIncidentReport.uploadedBy,
        frequency: selectedIncidentReport.frequency,
        incidentReoccured: selectedIncidentReport.incidentReoccured,
        incidentStatusId: selectedIncidentReport.incidentStatusId,
        userId: selectedIncidentReport.userId,
        campusId: selectedIncidentReport.campusId,
        buildingId: selectedIncidentReport.buildingId,
        incidentTypeId: selectedIncidentReport.incidentTypeId,
        incidentFiles:
          files && files.length > 0
            ? files
                .map((file) => (file instanceof File ? file.name : file.path))
                .join(", ")
            : "",
      };

      const updatedIncidentReport = await updateIncidentReport(
        updatedIncidentReportPayload
      ).unwrap();

      dispatch(updateIncidentReports(updatedIncidentReport));
      refetch();

      setOpenEdit(false);
      setSelectedIncidentReport(null);
      setFiles([]);
    } catch (error) {
      console.error("Error updating incident report:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      console.log(e.target.files);
      const fileList = Array.from(e.target.files); // Convert FileList to an array
      setSelectedIncidentReport((prev) => {
        const existingFiles = prev?.incidentFiles || [];
        return prev
          ? {
              ...prev,
              incidentFiles: [...existingFiles, ...fileList], // Combine existing and new files
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
              incidentFiles: fileList, // Initialize incidentFiles
              path: "",
              incidentReoccured: "",
              incidentStatusId: 0,
              statuses: "",
              userId: 0,
              campusId: 0,
              buildingId: 0,
              incidentTypeId: 0,
              type: "",
            };
      });
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
          incidentFiles: string;
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
                          incidentFiles: [],
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
                          incidentFiles: [],
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
                          incidentFiles: [],
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
                          incidentFiles: [],
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
                          incidentFiles: [],
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
                          incidentFiles: [],
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
                          incidentFiles: [],
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
                  label="Incident Status"
                  onChange={(e) => {
                    const incidentStatus = incidentStatusesData?.find(
                      (status) => status.id === e.target.value
                    );
                    if (!incidentStatus) return;

                    setSelectedIncidentReport((prev) => ({
                      ...(prev || {
                        id: 0,
                        report: "",
                        disposition: "",
                        caseNumber: "",
                        action: "",
                        location: "",
                        uploadedBy: "",
                        frequency: 0,
                        incidentReoccured: "",
                        incidentFiles: [],
                        path: "",
                        userId: 0,
                        campusId: 0,
                        buildingId: 0,
                        incidentTypeId: 0,
                        type: "",
                      }),
                      incidentStatusId: incidentStatus.id,
                      statuses: incidentStatus.statuses,
                    }));
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
              <InputLabel>Incident Type</InputLabel>
              <Select
                value={selectedIncidentReport?.incidentTypeId || ""}
                label="Incident Type"
                onChange={(e) => {
                  const incidentType = incidentTypesData?.find(
                    (type) => type.id === e.target.value
                  );
                  if (!incidentType) return;

                  setSelectedIncidentReport((prev) => ({
                    ...(prev || {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: "",
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: 0,
                      incidentReoccured: "",
                      incidentFiles: [],
                      path: "",
                      incidentStatusId: 0,
                      statuses: "",
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                      type: "",
                    }),
                    incidentTypeId: incidentType.id,
                    type: incidentType.type,
                  }));
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
              <input type="file" multiple onChange={handleChange} />

              {/* Display existing files */}
              {selectedIncidentReport?.incidentFiles?.map((file, index) => (
                <div
                  key={index}
                  style={{ display: "inline-block", margin: "5px" }}
                >
                  {file instanceof File ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded file ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${file.path}`}
                      alt={`Existing file ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src =
                          "/image-placeholder.png";
                      }}
                    />
                  )}
                  <Typography variant="caption" display="block">
                    {file instanceof File
                      ? file.name
                      : file.name || file.path.split("/").pop()}
                  </Typography>
                </div>
              ))}
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
                        incidentFiles: [],
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
                width: "100%",
              }}
            />
          </Grid>
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
