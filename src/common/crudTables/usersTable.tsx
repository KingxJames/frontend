import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
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
  useFetchUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./../../../store/services/userAPI";
import { useFetchRolesQuery } from "../../../store/services/roleAPI";
import {
  useFetchCampusesQuery,
  useUpdateCampusesMutation,
  useCreateCampusesMutation,
} from "../../../store/services/campusAPI";
import {
  useUpdateUserStatusMutation,
  useFetchUserStatusesQuery,
} from "../../../store/services/userStatusAPI";
import { useUpdateRoleMutation } from "../../../store/services/roleAPI";
import {
  setUsers,
  updateUsers,
  addUsers,
  deleteUsers,
  selectUsers,
} from "./../../../store/features/userSlice";

import {
  updateCampuses,
  selectCampuses,
} from "../../../store/features/campusSlice";

import { updateUserStatuses } from "../../../store/features/userStatusSlice";
import { updateRoles } from "../../../store/features/roleSlice";
import { Form } from "react-router-dom";

export const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: usersData, refetch } = useFetchUserQuery();
  const { data: rolesData } = useFetchRolesQuery();
  const { data: campusesData } = useFetchCampusesQuery();
  const { data: userStatusesData } = useFetchUserStatusesQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [updateCampus] = useUpdateCampusesMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateRole] = useUpdateRoleMutation();
  const users = useSelector(selectUsers);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phoneNo: "",
    organization: "",
    picture: "",
    password: "",
    domain: "",
    roleId: 0,
    roles: "",
    campusId: 0,
    campus: "",
    userStatusId: 0,
    userStatuses: "",
  });
  const [newCampus, setNewCampus] = useState({ campus: "" });
  const [newUserStatus, setNewUserStatus] = useState({ userStatuses: "" });
  const [newRole, setNewRole] = useState({ roles: "", description: "" });
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    username: string;
    email: string;
    phoneNo: string;
    organization: string;
    picture: string;
    domain: string;
    password: string;
    roleId: number;
    roles: string;
    campus: string;
    userStatuses: string;
    campusId: number;
    userStatusId: number;
  } | null>(null);

  const [selectedCampus, setSelectedCampus] = useState<{
    id: number;
    campus: string;
  } | null>(null);

  const [selectedRole, setSelectedRole] = useState<{
    id: number;
    roles: string;
    description: string;
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
      ["ID,Name,Username,Email,,Organization,Picture,Role,User Status,Campus"]
        .concat(
          users.users.map(
            (user) =>
              `${user.id},${user.name},${user.username},${user.email},${user.organization},${user.picture},${user.roles},${user.userStatuses},${user.campus}`
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

  // Handle add new role
  const handleAddUser = async () => {
    try {
      const response = await createUser({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        phoneNo: newUser.phoneNo,
        organization: newUser.organization,
        picture: newUser.picture,
        password: newUser.password,
        roleId: newUser.roleId,
      }).unwrap();

      if (response) {
        await refetch();
        dispatch(addUsers(response)); // Update Redux store with the newly created role
        setNewUser({
          name: "",
          username: "",
          email: "",
          phoneNo: "",
          organization: "",
          picture: "",
          password: "",
          domain: "",
          roleId: 0,
          roles: "",
          campusId: 0,
          campus: "",
          userStatusId: 0,
          userStatuses: "",
        });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (user: {
    id: number;
    name: string;
    username: string;
    email: string;
    phoneNo: string;
    organization: string;
    picture: string;
    password: string;
    roleId: number;
    roles: string;
    userStatusId: number;
    userStatuses: string;
    campusId: number;
    campus: string;
    domain: string;
  }) => {
    setSelectedUser(user); // Ensure selectedRole is set
    setSelectedRole({
      id: user.roleId,
      roles: user.roles,
      description: "",
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
      !selectedUser.username.trim() ||
      // !selectedUser.phoneNo || 
      !selectedUser.email.trim() ||
      !selectedUser.organization.trim() || 
      !selectedUser.picture.trim() ||
      !selectedUser.domain.trim() ||
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
        // userStatusId: selectedUserStatus.id,
        // userStatuses: selectedUserStatus?.userStatuses,
        // roleId: selectedRole.id,
        // roles: selectedRole?.roles,
        // campusId: selectedCampus.id,
        // campus: selectedCampus.campus,
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
          description: selectedRole.description,
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
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "organization", headerName: "Organization", flex: 1 },
    { field: "picture", headerName: "Picture", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "campus", headerName: "Campus", flex: 1 },
    { field: "userStatus", headerName: "Status", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          name: string;
          username: string;
          email: string;
          phoneNo: string;
          organization: string;
          picture: string;
          password: string;
          roleId: number;
          roles: string;
          userStatusId: number;
          userStatuses: string;
          campusId: number;
          campus: string;
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
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
            sx={{ marginRight: 2 }} // Adds spacing to the right
          >
            Add User
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
        rows={filteredUsers}
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
            label="Name"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            variant="outlined"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Organization"
            fullWidth
            variant="outlined"
            value={newUser.organization}
            onChange={(e) =>
              setNewUser({ ...newUser, organization: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Picture"
            fullWidth
            variant="outlined"
            value={newUser.picture}
            onChange={(e) =>
              setNewUser({ ...newUser, picture: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="lg"
      >
        {" "}
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : {
                      id: 0,
                      name: e.target.value,
                      username: "",
                      email: "",
                      phoneNo: "",
                      organization: "",
                      picture: "",
                      domain: "",
                      password: "",
                      roleId: 0,
                      roles: "",
                      campusId: 0,
                      campus: "",
                      userStatusId: 0,
                      userStatuses: "",
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            variant="outlined"
            value={selectedUser?.username || ""}
            onChange={(e) =>
              setSelectedUser((prev) =>
                prev
                  ? { ...prev, username: e.target.value }
                  : {
                      id: 0,
                      name: "",
                      username: e.target.value,
                      email: "",
                      phoneNo: "",
                      organization: "",
                      picture: "",
                      domain: "",
                      password: "",
                      roleId: 0,
                      roles: "",
                      campusId: 0,
                      campus: "",
                      userStatusId: 0,
                      userStatuses: "",
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser((prev) =>
                prev
                  ? { ...prev, email: e.target.value }
                  : {
                      id: 0,
                      name: "",
                      username: "",
                      email: e.target.value,
                      phoneNo: "",
                      organization: "",
                      picture: "",
                      domain: "",
                      password: "",
                      roleId: 0,
                      roles: "",
                      campusId: 0,
                      campus: "",
                      userStatusId: 0,
                      userStatuses: "",
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Organization"
            fullWidth
            variant="outlined"
            value={selectedUser?.organization || ""}
            onChange={(e) =>
              setSelectedUser((prev) =>
                prev
                  ? { ...prev, organization: e.target.value }
                  : {
                      id: 0,
                      name: "",
                      username: "",
                      email: "",
                      phoneNo: "",
                      organization: e.target.value,
                      picture: "",
                      domain: "",
                      password: "",
                      roleId: 0,
                      roles: "",
                      campusId: 0,
                      campus: "",
                      userStatusId: 0,
                      userStatuses: "",
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Picture"
            fullWidth
            variant="outlined"
            value={selectedUser?.picture || ""}
            onChange={(e) =>
              setSelectedUser((prev) =>
                prev
                  ? { ...prev, picture: e.target.value }
                  : {
                      id: 0,
                      name: "",
                      username: "",
                      email: "",
                      phoneNo: "",
                      organization: "",
                      picture: e.target.value,
                      domain: "",
                      password: "",
                      roleId: 0,
                      roles: "",
                      campusId: 0,
                      campus: "",
                      userStatusId: 0,
                      userStatuses: "",
                    }
              )
            }
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole?.id || ""}
              onChange={(e) => {
                const role = rolesData?.find((r) => r.id === e.target.value);
                if (role) {
                  setSelectedRole({
                    id: role.id,
                    roles: role.roles,
                    description: role.description,
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

          <FormControl fullWidth variant="outlined">
            <InputLabel>User Status</InputLabel>
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

          <FormControl fullWidth variant="outlined">
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
                      ? { ...prev, campusId: campus.id, campus: campus.campus }
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
