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
  useFetchUserCampusesQuery,
  useCreateUserCampusMutation,
  useDeleteUserCampusMutation,
  useUpdateUserCampusMutation,
} from "./../../../store/services/userCampusAPI";
import {
  setUserCampuses,
  updateUserCampuses,
  addUserCampuses,
  deleteUserCampuses,
  selectUserCampuses,
} from "./../../../store/features/userCampusSlice";

export const UserCampusTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: userCampusData } = useFetchUserCampusesQuery();
  const [createUserCampus] = useCreateUserCampusMutation();
  const [deleteUserCampus] = useDeleteUserCampusMutation();
  const [updateUserCampus] = useUpdateUserCampusMutation();
  const userCampuses = useSelector(selectUserCampuses);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUserCampus, setNewUserCampus] = useState({
    userId: 0,
    campusId: 0,
    primaryCampus: true,
  });
  const [selectedUserCampus, setSelectedUserCampus] = useState<{
    id: number;
    userId: number;
    campusId: number;
    primaryCampus: boolean;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (userCampusData) {
      dispatch(setUserCampuses(userCampusData)); // Store roles in Redux
    }
  }, [userCampusData, dispatch]);

  // Filter roles based on search query
  const filteredUserCampus = userCampuses?.userCampuses
    ? userCampuses.userCampuses.filter((userCampus) =>
        userCampus?.userId
          ? userCampus.userId
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          : false
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const userCampusToDelete = userCampuses.userCampuses.find(
        (userCampus) => userCampus.id === id
      );
      if (userCampusToDelete) {
        await deleteUserCampus(userCampusToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteUserCampuses(userCampusToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting user campus:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,User ID,Campus ID,Primary Campus"]
        .concat(
          userCampuses.userCampuses.map(
            (userCampus) =>
              `${userCampus.id},${userCampus.userId},${userCampus.campusId},${userCampus.primaryCampus}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "userCampus.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddUserCampus = async () => {
    try {
      const response = await createUserCampus({
        userId: newUserCampus.userId,
        campusId: newUserCampus.campusId,
        primaryCampus: newUserCampus.primaryCampus,
      }).unwrap();

      if (response) {
        dispatch(addUserCampuses(response)); // Update Redux store with the newly created role
        setNewUserCampus({ userId: 0, campusId: 0, primaryCampus: true });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding user Campus:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (userCampus: {
    id: number;
    userId: number;
    campusId: number;
    primaryCampus: boolean;
  }) => {
    if (!userCampus) return;
    setSelectedUserCampus(userCampus); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateUserCampus = async () => {
    if (
      !selectedUserCampus ||
      !selectedUserCampus.userId ||
      !selectedUserCampus.campusId ||
      !selectedUserCampus.primaryCampus
    ) {
      alert("fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedUserCampus = await updateUserCampus({
        id: selectedUserCampus.id,
        userId: selectedUserCampus.userId,
        campusId: selectedUserCampus.campusId,
        primaryCampus: selectedUserCampus.primaryCampus,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateUserCampuses(updatedUserCampus));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedUserCampus(null);
    } catch (error) {
      console.error("Error updating user campus:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "campusId", headerName: "Campus ID", flex: 1 },
    { field: "primaryCampus", headerName: "Primary Campus", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          userId: number;
          campusId: number;
          primaryCampus: boolean;
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
          label="Search User Campus"
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
            Add User Campus
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
        rows={filteredUserCampus}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User Campus</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            value={newUserCampus.userId}
            onChange={(e) =>
              setNewUserCampus({
                ...newUserCampus,
                userId: Number(e.target.value),
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Campus ID"
            fullWidth
            variant="outlined"
            value={newUserCampus.campusId}
            onChange={(e) =>
              setNewUserCampus({
                ...newUserCampus,
                campusId: Number(e.target.value),
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Primary Campus"
            fullWidth
            variant="outlined"
            value={newUserCampus.primaryCampus}
            onChange={(e) =>
              setNewUserCampus({
                ...newUserCampus,
                primaryCampus: e.target.value === "true",
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUserCampus} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User Campus</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="user ID"
            fullWidth
            variant="outlined"
            value={selectedUserCampus?.userId || ""}
            onChange={(e) =>
              setSelectedUserCampus((prev) =>
                prev
                  ? { ...prev, userId: Number(e.target.value) }
                  : {
                      id: 0,
                      userId: Number(e.target.value),
                      campusId: 0,
                      primaryCampus: true,
                    }
              )
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Campus ID"
            fullWidth
            variant="outlined"
            value={selectedUserCampus?.campusId || ""}
            onChange={(e) =>
              setSelectedUserCampus((prev) =>
                prev
                  ? { ...prev, campusId: Number(e.target.value) }
                  : {
                      id: 0,
                      userId: 0,
                      campusId: Number(e.target.value),
                      primaryCampus: true,
                    }
              )
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="primary Campus"
            fullWidth
            variant="outlined"
            value={selectedUserCampus?.primaryCampus || ""}
            onChange={(e) =>
              setSelectedUserCampus((prev) =>
                prev
                  ? { ...prev, primaryCampus: e.target.value === "true" }
                  : {
                      id: 0,
                      userId: 0,
                      campusId: 0,
                      primaryCampus: e.target.value === "true",
                    }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUserCampus} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
