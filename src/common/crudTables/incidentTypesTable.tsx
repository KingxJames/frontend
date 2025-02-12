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
  dividerClasses,
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
  setIncidentTypes,
  updateIncidentTypes,
  addIncidentTypes,
  deleteIncidentTypes,
  selectIncidentTypes,
} from "./../../../store/features/incidentTypeSlice";

export const IncidentTypesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: incidentTypesData } = useFetchIncidentTypesQuery();
  const [createIncidentType] = useCreateIncidentTypeMutation();
  const [deleteIncidentType] = useDeleteIncidentTypeMutation();
  const [updateIncidentType] = useUpdateIncidentTypeMutation();
  const incidentTypes = useSelector(selectIncidentTypes);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentType, setNewIncidentType] = useState({
    type: "",
    icon: "",
    message: "",
  });
  const [selectedIncidentType, setSelectedIncidentType] = useState<{
    id: number;
    type: string;
    icon: string;
    message: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (incidentTypesData) {
      dispatch(setIncidentTypes(incidentTypesData)); // Store roles in Redux
    }
  }, [incidentTypesData, dispatch]);

  // Filter roles based on search query
  const filteredIncidentType = incidentTypes.incidentTypes
    ? incidentTypes.incidentTypes.filter((incidentType) =>
        incidentType.type?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const incidentTypeToDelete = incidentTypes.incidentTypes.find(
        (incidentType) => incidentType.id === id
      );
      if (incidentTypeToDelete) {
        await deleteIncidentType(incidentTypeToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteIncidentTypes(incidentTypeToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting incidnet Type:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Type,icon,message"]
        .concat(
          incidentTypes.incidentTypes.map(
            (incidentType) =>
              `${incidentType.id},${incidentType.type},${incidentType.icon}, ${incidentType.message}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidentType.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddIncidentType = async () => {
    try {
      const response = await createIncidentType({
        type: newIncidentType.type,
        icon: newIncidentType.icon,
        message: newIncidentType.message,
      }).unwrap();

      if (response) {
        dispatch(addIncidentTypes(response)); // Update Redux store with the newly created role
        setNewIncidentType({ type: "", icon: "", message: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding Incident type:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (incidentType: {
    id: number;
    type: string;
    icon: string;
    message: string;
  }) => {
    if (!incidentType) return;
    setSelectedIncidentType(incidentType); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateIncidentType = async () => {
    if (
      !selectedIncidentType ||
      !selectedIncidentType.type.trim() ||
      !selectedIncidentType.icon.trim() ||
      !selectedIncidentType.message.trim()
    ) {
      alert(" fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedIncidentType = await updateIncidentType({
        id: selectedIncidentType.id,
        type: selectedIncidentType.type,
        icon: selectedIncidentType.icon,
        message: selectedIncidentType.message,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateIncidentTypes(updatedIncidentType));

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
    { field: "message", headerName: "Message", flex: 3 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          type: string;
          icon: string;
          message: string;
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
          <TextField
            margin="dense"
            label="icon"
            fullWidth
            variant="outlined"
            value={newIncidentType.icon}
            onChange={(e) =>
              setNewIncidentType({ ...newIncidentType, icon: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Message"
            fullWidth
            variant="outlined"
            value={newIncidentType.message}
            onChange={(e) =>
              setNewIncidentType({
                ...newIncidentType,
                message: e.target.value,
              })
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
                prev
                  ? { ...prev, type: e.target.value }
                  : { id: 0, type: e.target.value, icon: "", message: "" }
              )
            }
          />
          <TextField
            margin="dense"
            label="Icon"
            fullWidth
            variant="outlined"
            value={selectedIncidentType?.icon || ""}
            onChange={(e) =>
              setSelectedIncidentType((prev) =>
                prev
                  ? { ...prev, icon: e.target.value }
                  : { id: 0, type: "", icon: e.target.value, message: "" }
              )
            }
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            variant="outlined"
            value={selectedIncidentType?.message || ""}
            onChange={(e) =>
              setSelectedIncidentType((prev) =>
                prev
                  ? { ...prev, message: e.target.value }
                  : { id: 0, type: "", icon: "", message: e.target.value }
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