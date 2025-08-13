import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";

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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./../../../store/services/userAPI";
import { useFetchRolesQuery } from "../../../store/services/roleAPI";
import { useFetchCampusesQuery } from "../../../store/services/campusAPI";
import { useFetchUserStatusesQuery } from "../../../store/services/userStatusAPI";
import { useFetchUserCampusesQuery } from "../../../store/services/userCampusAPI";
import {
  setUsers,
  updateUsers,
  deleteUsers,
  selectUsers,
} from "./../../../store/features/userSlice";

import { updateCampuses } from "../../../store/features/campusSlice";

import { updateUserStatuses } from "../../../store/features/userStatusSlice";
import { updateRoles } from "../../../store/features/roleSlice";

export const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: usersData, refetch } = useFetchUserQuery();
  const { data: rolesData } = useFetchRolesQuery();
  const { data: campusesData } = useFetchCampusesQuery();
  const { data: userStatusesData } = useFetchUserStatusesQuery();
  const { data: userCampusesData } = useFetchUserCampusesQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const users = useSelector(selectUsers);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    roles: string;
    campus: string;
    userStatuses: string;
    campusId: number;
    userStatusId: number;
    userCampusId: number;
    primaryCampus: boolean;
  } | null>(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("selectedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [selectedCampus, setSelectedCampus] = useState<{
    id: number;
    campus: string;
  } | null>(null);

  const [selectedRole, setSelectedRole] = useState<{
    id: number;
    roles: string;
  } | null>(null);

  const [selectedUserStatus, setSelectedUserStatus] = useState<{
    id: number;
    userStatuses: string;
  } | null>(null);

  useEffect(() => {
    if (usersData) {
      const mappedUsers = usersData.map((user) => ({
        ...user,
        role: rolesData?.find((role) => role.id === user.roleId)?.roles || "",
        campus:
          campusesData?.find((campus) => campus.id === user.campusId)?.campus ||
          "",
        userStatus:
          userStatusesData?.find(
            (userStatuses) => userStatuses.id === user.userStatusId
          )?.userStatuses || "",
        userCampus:
          userCampusesData?.find((userCampus) => userCampus.userId === user.id)
            ?.primaryCampus || false,
      }));

      dispatch(setUsers(mappedUsers)); // Store mapped users in Redux
    }
  }, [usersData, rolesData, campusesData, userStatusesData, dispatch]);

  // Filter roles based on search query
  const filteredUsers = users.users
    ? users.users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  console.log("filteredUsers", filteredUsers);

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const userToDelete = users.users.find((user) => user.id === id);
      if (userToDelete) {
        await deleteUser(userToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteUsers(userToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Role,User Status,Campus"]
        .concat(
          users.users.map(
            (user) =>
              `${user.name},${user.email},${user.roles},${user.userStatuses},${user.campus}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle edit role - open dialog
  const handleEdit = (user: {
    id: number;
    name: string;
    email: string;
    phoneNo: string;
    organization: string;
    password: string;
    roleId: number;
    roles: string;
    userStatusId: number;
    userStatuses: string;
    campusId: number;
    campus: string;
    userCampusId: number;
    primaryCampus: boolean;
    domain: string;
  }) => {
    setSelectedUser(user); // Ensure selectedRole is set
    console.log("selectedUser", selectedUser);
    setSelectedRole({
      id: user.roleId,
      roles: user.roles,
    });
    setSelectedCampus({
      id: user.campusId,
      campus: user.campus,
    });
    setSelectedUserStatus({
      id: user.userStatusId,
      userStatuses: user.userStatuses,
    });
    setOpenEdit(true);
  };

  const handleUpdateUser = async () => {
    if (
      !selectedUser ||
      !selectedUser.name.trim() ||
      !selectedUser.email.trim() ||
      !selectedRole?.id || // Ensure role is selected
      !selectedUserStatus?.id || // Ensure user status is selected
      !selectedCampus?.id // Ensure campus is selected
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      //ensure user has the updated campusId
      const updatedUser = {
        ...selectedUser,
        campusId: selectedCampus.id, // Assign the correct campusId
        campus: selectedCampus.campus,
        userStatusId: selectedUserStatus.id,
        userStatuses: selectedUserStatus?.userStatuses,
        roleId: selectedRole.id,
        roles: selectedRole?.roles,
      };

      //Api call to update user
      const updatedUserResponse = await updateUser({
        ...updatedUser,
      }).unwrap();
      dispatch(updateUsers(updatedUserResponse));

      //update campus only if it's modified
      if (selectedCampus) {
        const updatedCampus = {
          id: selectedCampus.id,
          campus: selectedCampus.campus,
        };
        dispatch(updateCampuses(updatedCampus));
      }

      //update userStatus only if it's modified
      if (selectedUserStatus) {
        const updatedUserStatus = {
          id: selectedUserStatus.id,
          userStatuses: selectedUserStatus.userStatuses,
        };
        dispatch(updateUserStatuses(updatedUserStatus));
      }

      //update role only if it's modified
      if (selectedRole) {
        const updatedRole = {
          id: selectedRole.id,
          roles: selectedRole.roles,
        };
        dispatch(updateRoles(updatedRole));
      }

      refetch();
      setOpenEdit(false);
      setSelectedUser(null);
      setSelectedRole(null);
      setSelectedCampus(null);
      setSelectedUserStatus(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "userStatus", headerName: "Status", flex: 1 },
    { field: "campus", headerName: "Campus", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          name: string;
          email: string;
          phoneNo: string;
          organization: string;
          password: string;
          roleId: number;
          roles: string;
          userStatusId: number;
          userStatuses: string;
          campusId: number;
          campus: string;
          userCampusId: number;
          primaryCampus: boolean;
          domain: string;
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
          label="Search by Name"
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

      {/* Data Grid */}
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // getRowId={(row) => row.id}
        disableRowSelectionOnClick
      />

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="lg">
        <DialogTitle sx={{ textAlign: "center", marginBottom: "0%" }}>
          Edit User
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                fullWidth
                variant="outlined"
                value={selectedUser?.name || ""}
                disabled
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev
                      ? { ...prev, name: e.target.value }
                      : {
                          id: 0,
                          name: e.target.value,
                          email: "",
                          phoneNo: "",
                          organization: "",
                          domain: "",
                          password: "",
                          roleId: 0,
                          roles: "",
                          campusId: 0,
                          campus: "",
                          userStatusId: 0,
                          userStatuses: "",
                          userCampusId: 0,
                          primaryCampus: false,
                        }
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                value={selectedUser?.email || ""}
                disabled
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev
                      ? { ...prev, email: e.target.value }
                      : {
                          id: 0,
                          name: "",
                          email: e.target.value,
                          phoneNo: "",
                          organization: "",
                          domain: "",
                          password: "",
                          roleId: 0,
                          roles: "",
                          campusId: 0,
                          campus: "",
                          userStatusId: 0,
                          userStatuses: "",
                          userCampusId: 0,
                          primaryCampus: false,
                        }
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedRole?.id || ""}
                  onChange={(e) => {
                    const role = rolesData?.find(
                      (r) => r.id === e.target.value
                    );
                    if (role) {
                      setSelectedRole({
                        id: role.id,
                        roles: role.roles,
                      });

                      // Ensure `selectedUser` is updated
                      setSelectedUser((prev) =>
                        prev
                          ? { ...prev, roleId: role.id, roles: role.roles }
                          : prev
                      );
                    }
                  }}
                  label="Role"
                >
                  {rolesData?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.roles}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedUser?.userStatusId || ""}
                  onChange={(e) => {
                    const userStatus = userStatusesData?.find(
                      (u) => u.id === e.target.value
                    );
                    if (userStatus) {
                      setSelectedUserStatus({
                        id: userStatus.id,
                        userStatuses: userStatus.userStatuses,
                      });
                      setSelectedUser((prev) =>
                        prev
                          ? {
                              ...prev,
                              userStatusId: userStatus.id,
                              userStatuses: userStatus.userStatuses,
                            }
                          : null
                      );
                    }
                  }}
                  label="User Status"
                >
                  {userStatusesData?.map((userStatus) => (
                    <MenuItem key={userStatus.id} value={userStatus.id}>
                      {userStatus.userStatuses}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>Campus</InputLabel>
                <Select
                  value={selectedUser?.campusId || ""}
                  onChange={(e) => {
                    const campus = campusesData?.find(
                      (c) => c.id === e.target.value
                    );
                    if (campus) {
                      setSelectedCampus({
                        id: campus.id,
                        campus: campus.campus,
                      });
                      setSelectedUser((prev) =>
                        prev
                          ? {
                              ...prev,
                              campusId: campus.id,
                              campus: campus.campus,
                            }
                          : null
                      );
                    }
                  }}
                  label="Campus"
                >
                  {campusesData?.map((campus) => (
                    <MenuItem key={campus.id} value={campus.id}>
                      {campus.campus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersTable;
