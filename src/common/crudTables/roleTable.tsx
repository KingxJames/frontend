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
  useFetchRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} from "./../../../store/services/roleAPI";
import {
  setRoles,
  updateRoles,
  addRoles,
  deleteRoles,
  selectRoles,
} from "./../../../store/features/roleSlice";

export const RolesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: rolesData, isLoading } = useFetchRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const roles = useSelector(selectRoles);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newRole, setNewRole] = useState({ roles: "", description: "" });
  const [selectedRole, setSelectedRole] = useState<{
    id: number;
    roles: string;
    description: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (rolesData) {
      dispatch(setRoles(rolesData)); // Store roles in Redux
    }
  }, [rolesData, dispatch]);

  // Filter roles based on search query
  const filteredRoles = roles.roles
    ? roles.roles.filter((role) =>
        role.roles?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const roleToDelete = roles.roles.find((role) => role.id === id);
      if (roleToDelete) {
        await deleteRole(roleToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteRoles(roleToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Role,Description"]
        .concat(
          roles.roles.map(
            (role) => `${role.id},${role.roles},${role.description}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "roles.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddRole = async () => {
    try {
      const response = await createRole({
        roles: newRole.roles,
        description: newRole.description,
      }).unwrap();

      if (response) {
        dispatch(addRoles(response)); // Update Redux store with the newly created role
        setNewRole({ roles: "", description: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };
  // Handle edit role - open dialog
  const handleEdit = (role: {
    id: number;
    roles: string;
    description: string;
  }) => {
    setSelectedRole(role);
    setOpenEdit(true);
  };

  // Save edited role
  const handleSaveEdit = () => {
    if (selectedRole) {
      dispatch(updateRoles(selectedRole)); // Dispatch updateRoles
      setOpenEdit(false);
      setSelectedRole(null);
    }
  };

  const columns: GridColDef[] = [
    { field: "roles", headerName: "Role", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          roles: string;
          description: string;
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
          label="Search Roles"
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
          >
            Add Role
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
        rows={filteredRoles}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            variant="outlined"
            value={newRole.roles}
            onChange={(e) => setNewRole({ ...newRole, roles: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={newRole.description}
            onChange={(e) =>
              setNewRole({ ...newRole, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddRole} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            variant="outlined"
            value={selectedRole?.roles || ""}
            onChange={(e) =>
              setSelectedRole((prev) =>
                prev ? { ...prev, roles: e.target.value } : prev
              )
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={selectedRole?.description || ""}
            onChange={(e) =>
              setSelectedRole((prev) =>
                prev ? { ...prev, description: e.target.value } : prev
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
