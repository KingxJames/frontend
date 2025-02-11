import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchIncidentReportQuery,
  useCreateIncidentReportMutation,
  useDeleteIncidentReportMutation,
  useUpdateIncidentReportMutation,
} from "./../../../store/services/incidentReportAPI";

import {
  setIncidentReports,
  updateIncidentReports,
  addIncidentReports,
  deleteIncidentReports,
  selectIncidentReports,
} from "./../../../store/features/incidentReportSlice";

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: incidentReportsData } = useFetchIncidentReportQuery();
  const [createIncidentReport] = useCreateIncidentReportMutation();
  const [deleteIncidentReport] = useDeleteIncidentReportMutation();
  const [updateIncidentReport] = useUpdateIncidentReportMutation();
  const incidentReports = useSelector(selectIncidentReports);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentReport, setNewIncidentReport] = useState({
    report: "",
    disposition: "",
    caseNumber: "",
    action: "",
    location: "",
    uploadedBy: "",
    frequency: "",
    incidentReoccured: "",
    incidentFileId: 0,
    incidentStatusId: 0,
    userId: 0,
    campusId: 0,
    buildingId: 0,
    incidentTypeId: 0,
  });

  const [selectedIncidentReport, setSelectedIncidentReport] = useState<{
    id: number;
    report: string;
    disposition: string;
    caseNumber: string;
    action: string;
    location: string;
    uploadedBy: string;
    frequency: string;
    incidentReoccured: string;
    incidentFileId: number;
    incidentStatusId: number;
    userId: number;
    campusId: number;
    buildingId: number;
    incidentTypeId: number;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (incidentReportsData) {
      dispatch(setIncidentReports(incidentReportsData)); // Store roles in Redux
    }
  }, [incidentReportsData, dispatch]);

  // Filter roles based on search query
  const filteredIncidentReports = incidentReports.incidentReports
    ? incidentReports.incidentReports.filter((incidentReport) =>
        incidentReport.report?.toLowerCase().includes(search.toLowerCase())
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

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "ID,report,disposition,caseNumber,action,location,uploadedBy,frequency,incidentReoccured,incidentFileId,incidentStatusId,userId,campusId,buildingId,incidentTypeId",
      ]
        .concat(
          incidentReports.incidentReports.map(
            (incidentReport) =>
              `${incidentReport.id}, 
            ${incidentReport.report}, 
            ${incidentReport.disposition}, 
            ${incidentReport.caseNumber}, 
            ${incidentReport.action}, 
            ${incidentReport.location}, 
            ${incidentReport.uploadedBy}, 
            ${incidentReport.frequency}, 
            ${incidentReport.incidentReoccured}, 
            ${incidentReport.incidentFileId}, 
            ${incidentReport.incidentStatusId}, 
            ${incidentReport.userId}, 
            ${incidentReport.campusId}, 
            ${incidentReport.buildingId}, 
            ${incidentReport.incidentTypeId}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidentReports.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleAddIncidentReport = async () => {
    try {
      const response = await createIncidentReport({
        report: newIncidentReport.report,
        disposition: newIncidentReport.disposition,
        caseNumber: newIncidentReport.caseNumber,
        action: newIncidentReport.action,
        location: newIncidentReport.location,
        uploadedBy: newIncidentReport.uploadedBy,
        frequency: newIncidentReport.frequency,
        incidentReoccured: newIncidentReport.incidentReoccured,
        incidentFileId: newIncidentReport.incidentFileId,
        incidentStatusId: newIncidentReport.incidentStatusId,
        userId: newIncidentReport.userId,
        campusId: newIncidentReport.campusId,
        buildingId: newIncidentReport.buildingId,
        incidentTypeId: newIncidentReport.incidentTypeId,
      }).unwrap();

      if (response) {
        dispatch(addIncidentReports(response)); // Update Redux store with the newly created role
        setNewIncidentReport({
          report: "",
          disposition: "",
          caseNumber: "",
          action: "",
          location: "",
          uploadedBy: "",
          frequency: "",
          incidentReoccured: "",
          incidentFileId: 0,
          incidentStatusId: 0,
          userId: 0,
          campusId: 0,
          buildingId: 0,
          incidentTypeId: 0,
        });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding incident Reports:", error);
    }
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
    frequency: string;
    incidentReoccured: string;
    incidentFileId: number;
    incidentStatusId: number;
    userId: number;
    campusId: number;
    buildingId: number;
    incidentTypeId: number;
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
      !selectedIncidentReport.frequency.trim() ||
      !selectedIncidentReport.incidentReoccured.trim() ||
      !selectedIncidentReport.incidentFileId ||
      !selectedIncidentReport.incidentStatusId ||
      !selectedIncidentReport.userId ||
      !selectedIncidentReport.campusId ||
      !selectedIncidentReport.buildingId ||
      !selectedIncidentReport.incidentTypeId
    ) {
      alert("Both fields are required.");
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

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedIncidentReport(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "report", headerName: "Incident Report", flex: 1 },
    { field: "disposition", headerName: "Disposition", flex: 1 },
    { field: "caseNumber", headerName: "Case Number", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    { field: "frequency", headerName: "Frequency", flex: 1 },
    { field: "incidentReoccured", headerName: "Incident Reoccured", flex: 1 },
    { field: "incidentFileId", headerName: "Incident File ID", flex: 1 },
    { field: "incidentStatusId", headerName: "Incident Status ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "campusId", headerName: "Campus ID", flex: 1 },
    { field: "buildingId", headerName: "Building ID", flex: 1 },
    { field: "incidentTypeId", headerName: "Incident Type ID", flex: 1 },
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
          frequency: string;
          incidentReoccured: string;
          incidentFileId: number;
          incidentStatusId: number;
          userId: number;
          campusId: number;
          buildingId: number;
          incidentTypeId: number;
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
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
            sx={{ marginRight: 2 }} // Adds spacing to the right
          >
            Add Incident Report
          </Button>
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
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Incident Report</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Incident Report"
            fullWidth
            variant="outlined"
            value={newIncidentReport.report}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                report: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Disposition"
            fullWidth
            variant="outlined"
            value={newIncidentReport.disposition}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                disposition: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Case Number"
            fullWidth
            variant="outlined"
            value={newIncidentReport.caseNumber}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                caseNumber: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Action"
            fullWidth
            variant="outlined"
            value={newIncidentReport.action}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                action: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            value={newIncidentReport.location}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                location: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Uploaded By"
            fullWidth
            variant="outlined"
            value={newIncidentReport.uploadedBy}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                uploadedBy: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Frequency"
            fullWidth
            variant="outlined"
            value={newIncidentReport.frequency}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                frequency: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Incident Reoccured"
            fullWidth
            variant="outlined"
            value={newIncidentReport.incidentReoccured}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                incidentReoccured: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Incident File ID"
            fullWidth
            variant="outlined"
            value={newIncidentReport.incidentFileId}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                incidentFileId: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Incident Status ID"
            fullWidth
            variant="outlined"
            value={newIncidentReport.incidentStatusId}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                incidentStatusId: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            value={newIncidentReport.userId}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                userId: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Campus ID"
            fullWidth
            variant="outlined"
            value={newIncidentReport.campusId}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                campusId: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Building ID"
            fullWidth
            variant="outlined"
            value={newIncidentReport.buildingId}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                buildingId: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Incident Type ID"
            fullWidth
            variant="outlined"
            value={newIncidentReport.incidentTypeId}
            onChange={(e) =>
              setNewIncidentReport({
                ...newIncidentReport,
                incidentTypeId: parseInt(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddIncidentReport} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Incident Report</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Report"
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
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
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
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
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
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
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
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
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
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
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
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Frequency"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.frequency || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, frequency: e.target.value }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: e.target.value,
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: e.target.value,
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Incident Reoccured"
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
                      caseNumber: e.target.value,
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: e.target.value,
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Incident File ID"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.incidentFileId || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, incidentFileId: parseInt(e.target.value) }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: e.target.value,
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: parseInt(e.target.value),
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Incident Status ID"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.incidentStatusId || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, incidentStatusId: parseInt(e.target.value) }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: "",
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: parseInt(e.target.value),
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.userId || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, userId: parseInt(e.target.value) }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: "",
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: parseInt(e.target.value),
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Campus ID"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.campusId || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, campusId: parseInt(e.target.value) }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: "",
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: parseInt(e.target.value),
                      buildingId: 0,
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Building ID"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.buildingId || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, buildingId: parseInt(e.target.value) }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: e.target.value,
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: parseInt(e.target.value),
                      incidentTypeId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Incident Type ID"
            fullWidth
            variant="outlined"
            value={selectedIncidentReport?.incidentTypeId || ""}
            onChange={(e) =>
              setSelectedIncidentReport((prev) =>
                prev
                  ? { ...prev, incidentTypeId: parseInt(e.target.value) }
                  : {
                      id: 0,
                      report: "",
                      disposition: "",
                      caseNumber: "",
                      action: "",
                      location: "",
                      uploadedBy: "",
                      frequency: "",
                      incidentReoccured: "",
                      incidentFileId: 0,
                      incidentStatusId: 0,
                      userId: 0,
                      campusId: 0,
                      buildingId: 0,
                      incidentTypeId: parseInt(e.target.value),
                    }
              )
            }
          />
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
