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
  useFetchUserStatusesQuery,
  useCreateUserStatusMutation,
  useDeleteUserStatusMutation,
  useUpdateUserStatusMutation,
} from "./../../../store/services/userStatusAPI";
import {
  setUserStatuses,
  updateUserStatuses,
  addUserStatuses,
  deleteUserStatuses,
  selectUserStatuses,
} from "./../../../store/features/userStatusSlice";

export const UserStatusesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: userStatusData, refetch } = useFetchUserStatusesQuery();
  const [createUserStatus] = useCreateUserStatusMutation();
  const [deleteUserStatus] = useDeleteUserStatusMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const userStatuses = useSelector(selectUserStatuses);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUserStatus, setNewUserStatus] = useState({ userStatuses: "" });
  const [selectedUserStatus, setSelectedUserStatus] = useState<{
    id: number;
    userStatuses: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (userStatusData) {
      dispatch(setUserStatuses(userStatusData)); // Store roles in Redux
    }
  }, [userStatusData, dispatch]);

  // Filter roles based on search query
  const filteredUserStatuses = userStatuses.userStatuses
    ? userStatuses.userStatuses.filter((userStatus) =>
        userStatus.userStatuses?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const userStatusToDelete = userStatuses.userStatuses.find(
        (userStatus) => userStatus.id === id
      );
      if (userStatusToDelete) {
        await deleteUserStatus(userStatusToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteUserStatuses(userStatusToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting userStatus:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Statuses"]
        .concat(
          userStatuses.userStatuses.map(
            (userStatus) => `${userStatus.id},${userStatus.userStatuses}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "userStatuses.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddUserStatus = async () => {
    try {
      const response = await createUserStatus({
        userStatuses: newUserStatus.userStatuses,
      }).unwrap();

      if (response) {
        refetch();
        dispatch(addUserStatuses(response)); // Update Redux store with the newly created role
        setNewUserStatus({ userStatuses: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding userStatus:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (userStatus: { id: number; userStatuses: string }) => {
    if (!userStatus) return;
    setSelectedUserStatus(userStatus); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateUserStatus = async () => {
    if (!selectedUserStatus || !selectedUserStatus.userStatuses.trim()) {
      alert("fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedUserStatus = await updateUserStatus({
        id: selectedUserStatus.id,
        userStatuses: selectedUserStatus.userStatuses,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateUserStatuses(updatedUserStatus));

      // Force re-fetch to get the latest data
      await refetch();

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedUserStatus(null);
    } catch (error) {
      console.error("Error updating user Status:", error);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "userStatuses", headerName: "User Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          userStatuses: string;
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
          label="Search User Statuses"
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
            Add User Status
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
        rows={filteredUserStatuses}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Status"
            fullWidth
            variant="outlined"
            value={newUserStatus.userStatuses}
            onChange={(e) =>
              setNewUserStatus({
                ...newUserStatus,
                userStatuses: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUserStatus} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Status"
            fullWidth
            variant="outlined"
            value={selectedUserStatus?.userStatuses || ""}
            onChange={(e) =>
              setSelectedUserStatus((prev) =>
                prev
                  ? { ...prev, userStatuses: e.target.value }
                  : { id: 0, userStatuses: e.target.value }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUserStatus} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserStatusesTable;
