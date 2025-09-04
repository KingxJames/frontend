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
  // useUpdateIncidentReportMutation,
} from "./../../../store/services/incidentReportAPI";
import { useFetchBuildingsQuery } from "../../../store/services/buildingsAPI";

import {
  setIncidentReport,
  updateIncidentReport,
  deleteIncidentReport,
  selectIncidentReports,
  IIncidentFile,
} from "./../../../store/features/incidentReportSlice";
import {
  selectBuildings,
  setBuilding,
} from "../../../store/features/buildingSlice";

interface IncidentReportFile {
  name: string;
  path: string;
}

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]); // Store multiple file objects

  const { data: incidentReportsData, refetch } = useFetchIncidentReportQuery();

  const [deleteIncidentReports] = useDeleteIncidentReportMutation();
  // const [updateIncidentReports] = useUpdateIncidentReportMutation();
  const incidentReports = useSelector(selectIncidentReports);
  const buildings = useSelector(selectBuildings);

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

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

  useEffect(() => {
    if (incidentReportsData) {
      dispatch(setIncidentReport(incidentReportsData.data));
    }
  }, [incidentReportsData, dispatch]);

  const filteredIncidentReports = Array.isArray(incidentReports)
    ? incidentReports.filter(
        (incidentReport) =>
          incidentReport.report?.toLowerCase().includes(search.toLowerCase()) ||
          incidentReport.caseNumber
            ?.toLowerCase()
            .includes(search.toLowerCase())
      )
    : [];

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await deleteIncidentReports(id).unwrap(); // API call
      refetch();
    } catch (error) {
      console.error("Failed to delete incident report:", error);
    }
  };

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

    const csvRows = incidentReports.map((incidentReport) =>
      [
        incidentReport.id,
        incidentReport.caseNumber,
        incidentReport.incidentType,
        incidentReport.buildingLocation,
        incidentReport.incidentStatus,
        incidentReport.report,
        incidentReport.disposition,
        incidentReport.action,
        incidentReport.incidentFiles,
        incidentReport.uploadedBy,
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

  // const handleEdit = (incidentReport: {
  //   id: string;
  //   action: string;
  //   caseNumber: string;
  //   disposition: string;
  //   incidentStatus: string;
  //   incidentType: string;
  //   incidentFiles: IIncidentFile[];
  //   buildingId: number;
  //   buildingLocation: string;
  //   report: string;
  //   uploadedBy: string;
  // }) => {
  //   if (!incidentReport) return;

  //   // Convert existing file paths to File objects or URLs for preview
  //   const existingFiles = incidentReport.incidentFiles
  //     ? incidentReport.incidentFiles.split(", ").map((filePath) => ({
  //         name: filePath.split("/").pop() || "", // Extract filename
  //         path: filePath, // Full path from database
  //       }))
  //     : [];

  //   setSelectedIncidentReport({
  //     ...incidentReport,
  //     incidentFiles: existingFiles, // Initialize with existing files
  //   });
  //   setOpenEdit(true);
  // };

  // const handleUpdateIncidentReport = async (
  //   index: number,
  //   files: (File | IncidentReportFile)[] | null
  // ) => {
  //   if (
  //     !selectedIncidentReport ||
  //     !selectedIncidentReport.action ||
  //     !selectedIncidentReport.caseNumber ||
  //     !selectedIncidentReport.report ||
  //     !selectedIncidentReport.disposition ||
  //     !selectedIncidentReport.incidentStatus ||
  //     !selectedIncidentReport.incidentFiles ||
  //     !selectedIncidentReport.incidentType ||
  //     !selectedIncidentReport.buildingId ||
  //     !selectedIncidentReport.buildingLocation ||
  //     !selectedIncidentReport.uploadedBy
  //   ) {
  //     alert("All fields are required.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();

  //     // Append non-file fields to FormData
  //     formData.append("id", selectedIncidentReport.id.toString());
  //     formData.append("report", selectedIncidentReport.report);
  //     formData.append("disposition", selectedIncidentReport.disposition);
  //     formData.append("caseNumber", selectedIncidentReport.caseNumber);
  //     formData.append("action", selectedIncidentReport.action);
  //     formData.append("location", selectedIncidentReport.buildingLocation);
  //     formData.append("uploadedBy", selectedIncidentReport.uploadedBy);

  //     // Append files if they exist
  //     if (files && files.length > 0) {
  //       files.forEach((file) => {
  //         if (file instanceof File) {
  //           formData.append("incidentFiles[]", file);
  //         }
  //       });
  //     }

  //     const updatedIncidentReportPayload = {
  //       id: selectedIncidentReport.id,
  //       action: selectedIncidentReport.action,
  //       caseNumber: selectedIncidentReport.caseNumber,
  //       disposition: selectedIncidentReport.disposition,
  //       incidentStatus: selectedIncidentReport.incidentStatus,
  //       incidentType: selectedIncidentReport.incidentType,
  //       buildingId: selectedIncidentReport.buildingId,
  //       buildingLocation: selectedIncidentReport.buildingLocation,
  //       report: selectedIncidentReport.report,
  //       uploadedBy: selectedIncidentReport.uploadedBy,
  //       incidentFiles:
  //         files && files.length > 0
  //           ? files
  //               .map((file) => (file instanceof File ? file.name : file.path))
  //               .join(", ")
  //           : "",
  //     };

  //     const updatedIncidentReport = await updateIncidentReports(
  //       updatedIncidentReportPayload
  //     ).unwrap();

  //     dispatch(updateIncidentReport(updatedIncidentReport));
  //     refetch();

  //     setOpenEdit(false);
  //     setSelectedIncidentReport(null);
  //     setFiles([]);
  //   } catch (error) {
  //     console.error("Error updating incident report:", error);
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   if (e.target.files) {
  //     console.log(e.target.files);
  //     const fileList = Array.from(e.target.files); // Convert FileList to an array
  //     setSelectedIncidentReport((prev) => {
  //       const existingFiles = prev?.incidentFiles || [];
  //       return prev
  //         ? {
  //             ...prev,
  //             incidentFiles: [...existingFiles, ...fileList], // Combine existing and new files
  //           }
  //         : {
  //             id: 0,
  //             report: "",
  //             disposition: "",
  //             caseNumber: "",
  //             action: "",
  //             location: "",
  //             uploadedBy: "",
  //             frequency: 0,
  //             incidentFiles: fileList, // Initialize incidentFiles
  //             path: "",
  //             incidentReoccured: "",
  //             incidentStatusId: 0,
  //             statuses: "",
  //             userId: 0,
  //             campusId: 0,
  //             buildingId: 0,
  //             incidentTypeId: 0,
  //             type: "",
  //           };
  //     });
  //   }
  // };

  const columns: GridColDef[] = [
    { field: "caseNumber", headerName: "Case Number", flex: 1 },
    { field: "incidentType", headerName: "Incident Type", flex: 1 },
    // {
    //   field: "buildingId",
    //   headerName: "Building",
    //   flex: 1,
    //   valueGetter: (params) => {
    //     // Get the building name from the buildingMap using buildingId
    //     console.log(params.row.buildingId);
    //     return buildingMap[params.row.buildingId] || "Unknown Building";
    //   },
    // },
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
            <IconButton
              // onClick={() => handleEdit(row)}
              color="primary"
            >
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
                          id: "",
                          action: "",
                          caseNumber: e.target.value,
                          disposition: "",
                          incidentStatus: "",
                          incidentType: "",
                          incidentFiles: [],
                          buildingId: "",
                          buildingLocation: "",
                          report: "",
                          uploadedBy: "",
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
                          id: "",
                          action: "",
                          caseNumber: "",
                          disposition: e.target.value,
                          incidentStatus: "",
                          incidentType: "",
                          incidentFiles: [],
                          buildingId: "",
                          buildingLocation: "",
                          report: "",
                          uploadedBy: "",
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
                          id: "",
                          action: e.target.value,
                          caseNumber: "",
                          disposition: "",
                          incidentStatus: "",
                          incidentType: "",
                          incidentFiles: [],
                          buildingId: "",
                          buildingLocation: "",
                          report: "",
                          uploadedBy: "",
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
                value={selectedIncidentReport?.buildingLocation || ""}
                onChange={(e) =>
                  setSelectedIncidentReport((prev) =>
                    prev
                      ? { ...prev, location: e.target.value }
                      : {
                          id: "",
                          action: "",
                          caseNumber: "",
                          disposition: "",
                          incidentStatus: "",
                          incidentType: "",
                          incidentFiles: [],
                          buildingId: "",
                          buildingLocation: e.target.value,
                          report: "",
                          uploadedBy: "",
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
                          uploadedBy: e.target.value,
                        }
                  )
                }
              />
            </Grid>

            {/* <Grid size={6}>
              <FormControl margin="dense" fullWidth variant="outlined">
                <InputLabel>Incident Status</InputLabel>
                <Select
                  value={selectedIncidentReport?.incidentStatus || ""}
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
            </Grid> */}

            {/* <FormControl margin="dense" fullWidth variant="outlined">
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
            </FormControl> */}
            {/* <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>Incident Pictures</Typography>
              <input type="file" multiple onChange={handleChange} /> */}

            {/* Display existing files */}
            {/* {selectedIncidentReport?.incidentFiles?.map((file, index) => (
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
            </Box> */}

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
                        id: "",
                        action: "",
                        caseNumber: "",
                        disposition: "",
                        incidentStatus: "",
                        incidentType: "",
                        incidentFiles: [],
                        buildingId: "",
                        buildingLocation: "",
                        report: e.target.value,
                        uploadedBy: "",
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
            // onClick={() =>
            //   handleUpdateIncidentReport(
            //     0,
            //     selectedIncidentReport?.incidentFiles ?? null
            //   )
            // }
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
