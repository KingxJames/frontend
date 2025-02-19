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
  useFetchAccessRightsQuery,
  useCreateAccessRightMutation,
  useDeleteAccessRightMutation,
  useUpdateAccessRightMutation,
} from "./../../../store/services/accessRightAPI";
import {
  setAccessRights,
  updateAccessRights,
  addAccessRights,
  deleteAccessRights,
  selectAccessRights,
} from "./../../../store/features/accessRightSlice";

export const AccessRightsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: accessRightData, refetch } = useFetchAccessRightsQuery(); //refetch updates the data in the table after a mutation is triggered.
  const [createAccessRight] = useCreateAccessRightMutation();
  const [deleteAccessRight] = useDeleteAccessRightMutation();
  const [updateAccessRight] = useUpdateAccessRightMutation();
  const accessRights = useSelector(selectAccessRights);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newAccessRight, setNewAccessRight] = useState({
    description: "",
    roleId: 0,
  });
  const [selectedAccessRight, setSelectedAccessRight] = useState<{
    id: number;
    description: string;
    roleId: number;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (accessRightData) {
      dispatch(setAccessRights(accessRightData)); // Store roles in Redux
    }
  }, [accessRightData, dispatch]);

  // Filter roles based on search query
  const filteredAccessRights = accessRights.accessRights
    ? accessRights.accessRights.filter((accessRight) =>
        accessRight.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const accessRightToDelete = accessRights.accessRights.find(
        (accessRight) => accessRight.id === id
      );
      if (accessRightToDelete) {
        await deleteAccessRight(accessRightToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteAccessRights(accessRightToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Description,Role ID"]
        .concat(
          accessRights.accessRights.map(
            (accessRight) =>
              `${accessRight.id},${accessRight.description}, ${accessRight.roleId}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "accessRight.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddAccessRight = async () => {
    try {
      const response = await createAccessRight({
        description: newAccessRight.description,
        roleId: newAccessRight.roleId,
      }).unwrap();

      if (response) {
        await refetch(); // Force re-fetch to get the latest data
        dispatch(addAccessRights(response)); // Update Redux store with the newly created role
        setNewAccessRight({ description: "", roleId: 0 });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding accessRight:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (accessRight: {
    id: number;
    description: string;
    roleId: number;
  }) => {
    if (!accessRight) {
      console.error("Invalid accessRight object received:", accessRight);
      return;
    }
    setSelectedAccessRight(accessRight); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateAccessRight = async () => {
    if (
      !selectedAccessRight ||
      !selectedAccessRight.description.trim() ||
      !selectedAccessRight.roleId
    ) {
      alert("Both RoleId and Description fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedAccessRight = await updateAccessRight({
        id: selectedAccessRight.id,
        description: selectedAccessRight.description,
        roleId: selectedAccessRight.roleId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateAccessRights(updatedAccessRight));
      refetch(); // Force re-fetch to get the latest data

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedAccessRight(null);
    } catch (error) {
      console.error("Error updating Access Right:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "roleId", headerName: "Role ID", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          description: string;
          roleId: number;
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
          label="Search Access Right"
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
            Add Access Right
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
        rows={filteredAccessRights}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Access Right</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Access Right "
            fullWidth
            variant="outlined"
            value={newAccessRight.description}
            onChange={(e) =>
              setNewAccessRight({
                ...newAccessRight,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Role ID"
            fullWidth
            variant="outlined"
            value={newAccessRight.roleId}
            onChange={(e) =>
              setNewAccessRight({
                ...newAccessRight,
                roleId: Number(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddAccessRight} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Access Right</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Access Right"
            fullWidth
            variant="outlined"
            value={selectedAccessRight?.description || ""}
            onChange={(e) =>
              setSelectedAccessRight((prev) =>
                prev
                  ? { ...prev, description: e.target.value }
                  : { id: 0, description: e.target.value, roleId: 0 }
              )
            }
          />
          <TextField
            margin="dense"
            label="Role ID"
            fullWidth
            variant="outlined"
            value={selectedAccessRight?.roleId || 0}
            onChange={(e) =>
              setSelectedAccessRight((prev) =>
                prev
                  ? { ...prev, roleId: Number(e.target.value) }
                  : { id: 0, description: "", roleId: Number(e.target.value) }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateAccessRight} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccessRightsTable;
