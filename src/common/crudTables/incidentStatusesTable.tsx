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
  useFetchIncidentStatusesQuery,
  useCreateIncidentStatusMutation,
  useDeleteIncidentStatusMutation,
  useUpdateIncidentStatusMutation,
} from "./../../../store/services/incidentStatusAPI";
import {
  setIncidentStatuses,
  updateIncidentStatuses,
  addIncidentStatuses,
  deleteIncidentStatuses,
  selectIncidentStatuses,
} from "./../../../store/features/incidentStatusSlice";

export const IncidentStatusesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: incidentStatusData, refetch } = useFetchIncidentStatusesQuery();
  const [createIncidentStatus] = useCreateIncidentStatusMutation();
  const [deleteIncidentStatus] = useDeleteIncidentStatusMutation();
  const [updateIncidentStatus] = useUpdateIncidentStatusMutation();
  const incidentStatuses = useSelector(selectIncidentStatuses);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentStatus, setNewIncidentStatus] = useState({ statuses: "" });
  const [selectedIncidentStatus, setSelectedIncidentStatus] = useState<{
    id: number;
    statuses: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (incidentStatusData) {
      dispatch(setIncidentStatuses(incidentStatusData)); // Store roles in Redux
    }
  }, [incidentStatusData, dispatch]);

  // Filter roles based on search query
  const filteredIncidentStatues = incidentStatuses.statuses
    ? incidentStatuses.statuses.filter((incidentStatus) =>
        incidentStatus.statuses?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const incidentStatusToDelete = incidentStatuses.statuses.find(
        (incidentStatus) => incidentStatus.id === id
      );
      if (incidentStatusToDelete) {
        await deleteIncidentStatus(
          incidentStatusToDelete.id.toString()
        ).unwrap(); // Call the delete mutation
        dispatch(deleteIncidentStatuses(incidentStatusToDelete.id)); // Update Redux store
        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting incidentStatus:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Statuses"]
        .concat(
          incidentStatuses.statuses.map(
            (incidentStatus) =>
              `${incidentStatus.id},${incidentStatus.statuses}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidentStatus.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddIncidentStatus = async () => {
    try {
      const response = await createIncidentStatus({
        statuses: newIncidentStatus.statuses,
      }).unwrap();

      if (response) {
        await refetch();
        dispatch(addIncidentStatuses(response)); // Update Redux store with the newly created role
        setNewIncidentStatus({ statuses: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding Incident Status:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (incidentStatus: { id: number; statuses: string }) => {
    if (!incidentStatus) return;
    setSelectedIncidentStatus(incidentStatus); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateIncidentStatus = async () => {
    if (!selectedIncidentStatus || !selectedIncidentStatus.statuses.trim()) {
      alert("Both Statuses fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedIncidentStatus = await updateIncidentStatus({
        id: selectedIncidentStatus.id,
        statuses: selectedIncidentStatus.statuses,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateIncidentStatuses(updatedIncidentStatus));
      refetch(); // Force re-fetch to get the latest data

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedIncidentStatus(null);
    } catch (error) {
      console.error("Error updating incident Statuses:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "statuses", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          statuses: string;
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
          label="Search Incident Statuses"
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
            Add Incident Statuses
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
        rows={filteredIncidentStatues}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Incident Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Incident Status"
            fullWidth
            variant="outlined"
            value={newIncidentStatus.statuses}
            onChange={(e) =>
              setNewIncidentStatus({
                ...newIncidentStatus,
                statuses: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddIncidentStatus} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Incident Statuses</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Incident Statuses"
            fullWidth
            variant="outlined"
            value={selectedIncidentStatus?.statuses || ""}
            onChange={(e) =>
              setSelectedIncidentStatus((prev) =>
                prev
                  ? { ...prev, statuses: e.target.value }
                  : { id: 0, statuses: e.target.value }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateIncidentStatus} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IncidentStatusesTable;
