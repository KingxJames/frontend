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
  useFetchIncidentTypesQuery,
  useCreateIncidentTypeMutation,
  useDeleteIncidentTypeMutation,
  useUpdateIncidentTypeMutation,
} from "./../../../store/services/incidentTypesAPI";
import {
  setIncidentType,
  updateIncidentType,
  selectIncidentTypes,
  IIncidentType,
} from "./../../../store/features/incidentTypeSlice";

export const IncidentTypesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: incidentTypesData, refetch } = useFetchIncidentTypesQuery();
  const [createIncidentTypes] = useCreateIncidentTypeMutation();
  const [deleteIncidentTypes] = useDeleteIncidentTypeMutation();
  const [updateIncidentTypes] = useUpdateIncidentTypeMutation();
  const incidentTypes = useSelector(selectIncidentTypes);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentType, setNewIncidentType] = useState({
    type: "",
  });
  const [selectedIncidentType, setSelectedIncidentType] = useState<{
    id: string;
    type: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (incidentTypesData) {
      dispatch(setIncidentType(incidentTypesData?.data.incidentTypes)); // Store roles in Redux
    }
  }, [incidentTypesData, dispatch]);

  // Filter roles based on search query
  const filteredIncidentType = Array.isArray(incidentTypes)
    ? incidentTypes.filter((incidentType: any) =>
        incidentType.type?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await deleteIncidentTypes(id).unwrap(); // Call the delete mutation
      refetch();
    } catch (error) {
      console.error("Failed to delete incident type:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    if (!incidentTypes || incidentTypes.length === 0) return;

    const csvHeader = "Incident Type";
    const csvRows = incidentTypes.map((incidentType) => `${incidentType.type}`);

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "incidentType.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleAddIncidentType = async () => {
    if (!newIncidentType.type.trim()) {
      alert("The incident type field is required.");
      return;
    }

    try {
      const incidentTypesData: Partial<IIncidentType> = {
        type: newIncidentType.type,
      };

      const response = await createIncidentTypes(incidentTypesData).unwrap();

      if (response) {
        // Option 1: Use refetch for accurate data
        await refetch();

        // Reset Form
        setNewIncidentType({ type: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding Incident Type:", error);
      alert("Failed to add incident type. Please try again.");
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (incidentType: { id: string; type: string }) => {
    setSelectedIncidentType(incidentType); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateIncidentType = async () => {
    if (!selectedIncidentType || !selectedIncidentType.type.trim()) {
      alert(" fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedIncidentTypeResponse = await updateIncidentTypes({
        id: selectedIncidentType.id,
        type: selectedIncidentType.type,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateIncidentType(updatedIncidentTypeResponse));

      // Force re-fetch to get the latest data
      await refetch();

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedIncidentType(null);
    } catch (error) {
      console.error("Error updating Incident Type:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "icon", headerName: "Icon", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
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
          label="Search Incident Types"
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
            Add Incident Types
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
        rows={filteredIncidentType}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Incident Types</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Incident Types"
            fullWidth
            variant="outlined"
            value={newIncidentType.type}
            onChange={(e) =>
              setNewIncidentType({ ...newIncidentType, type: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddIncidentType} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Incident Type</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Incident Type"
            fullWidth
            variant="outlined"
            value={selectedIncidentType?.type || ""}
            onChange={(e) =>
              setSelectedIncidentType((prev) =>
                prev ? { ...prev, type: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateIncidentType} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IncidentTypesTable;
