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
  useFetchUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./../../../store/services/userAPI";
import { useFetchRolesQuery } from "../../../store/services/roleAPI";
import { useFetchCampusesQuery } from "../../../store/services/campusAPI";
import { useFetchUserStatusesQuery } from "../../../store/services/userStatusAPI";
import {
  setUsers,
  updateUsers,
  addUsers,
  deleteUsers,
  selectUsers,
} from "./../../../store/features/userSlice";

export const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: usersData, refetch } = useFetchUserQuery();
  const { data: rolesData } = useFetchRolesQuery();
  const { data: campusesData } = useFetchCampusesQuery();
  const { data: userStatusesData } = useFetchUserStatusesQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
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
    roleId: 0,
  });
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
          )?.userStatuses || "Unknown Status",
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
      [
        "ID,Name,Username,Email,Phone No,Organization,Picture,Domain,Password,RoleID,Sender ID",
      ]
        .concat(
          users.users.map(
            (user) =>
              `${user.id},${user.name},${user.username},${user.email},${user.phoneNo},${user.organization},${user.picture},${user.password},${user.roleId}`
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
          roleId: 0,
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
    domain: string;
    password: string;
    roleId: number;
    senderId: number;
  }) => {
    if (!user) return;
    setSelectedUser(user); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateUser = async () => {
    if (
      !selectedUser ||
      !selectedUser.name.trim() ||
      !selectedUser.username.trim() ||
      !selectedUser.email.trim() ||
      !selectedUser.phoneNo.trim() ||
      !selectedUser.organization.trim() ||
      !selectedUser.picture.trim() ||
      !selectedUser.password.trim() ||
      !selectedUser.roleId
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedUser = await updateUser({
        id: selectedUser.id,
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
        phoneNo: selectedUser.phoneNo,
        organization: selectedUser.organization,
        picture: selectedUser.picture,
        password: selectedUser.password,
        roleId: selectedUser.roleId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateUsers(updatedUser));

      // Force re-fetch to get the latest data
      await refetch();

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedUser(null);
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
    { field: "password", headerName: "Password", flex: 1 },
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
          domain: string;
          password: string;
          roleId: number;
          senderId: number;
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

          <TextField
            margin="dense"
            label="Password"
            fullWidth
            variant="outlined"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
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
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
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
                      senderId: 0,
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
                      senderId: 0,
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
                      senderId: 0,
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
                      senderId: 0,
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
                      senderId: 0,
                    }
              )
            }
          />
          <TextField
            margin="dense"
            label="Password"
            fullWidth
            variant="outlined"
            value={selectedUser?.password || ""}
            onChange={(e) =>
              setSelectedUser((prev) =>
                prev
                  ? { ...prev, password: e.target.value }
                  : {
                      id: 0,
                      name: "",
                      username: "",
                      email: "",
                      phoneNo: "",
                      organization: "",
                      picture: "",
                      domain: "",
                      password: e.target.value,
                      roleId: 0,
                      senderId: 0,
                    }
              )
            }
          />
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
