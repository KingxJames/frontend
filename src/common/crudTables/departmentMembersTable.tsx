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
  useFetchDepartmentMembersQuery,
  useCreateDepartmentMemberMutation,
  useDeleteDepartmentMemberMutation,
  useUpdateDepartmentMemberMutation,
} from "./../../../store/services/departmentMembersAPI";
import {
  setDepartmentMembers,
  updateDepartmentMembers,
  addDepartmentMembers,
  deleteDepartmentMembers,
  selectDepartmentMembers,
} from "./../../../store/features/departmentMemberSlice";

export const DepartmentMembersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: departmentMembersData, refetch } = useFetchDepartmentMembersQuery();
  const [createDepartmentMember] = useCreateDepartmentMemberMutation();
  const [deleteDepartmentMember] = useDeleteDepartmentMemberMutation();
  const [updateDepartmentMember] = useUpdateDepartmentMemberMutation();
  const departmentMembers = useSelector(selectDepartmentMembers);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newDepartmentMember, setNewDepartmentMember] = useState({
    department_id: 0,
    user_id: 0,
  });
  const [selectedDepartmentMember, setSelectedDepartmentMember] = useState<{
    id: number;
    departmentId: number;
    userId: number;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (departmentMembersData) {
      dispatch(setDepartmentMembers(departmentMembersData)); // Store roles in Redux
    }
  }, [departmentMembersData, dispatch]);

  // Filter roles based on search query
  const filteredDepartmentMembers = departmentMembers.departmentMembers
    ? departmentMembers.departmentMembers.filter((departmentMember) =>
        departmentMember.departmentId
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const departmentMemberToDelete = departmentMembers.departmentMembers.find(
        (departmentMember) => departmentMember.id === id
      );
      if (departmentMemberToDelete) {
        await deleteDepartmentMember(
          departmentMemberToDelete.id.toString()
        ).unwrap(); // Call the delete mutation
        dispatch(deleteDepartmentMembers(departmentMemberToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting departmember:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,departmentId,userId"]
        .concat(
          departmentMembers.departmentMembers.map(
            (departmentMember) =>
              `${departmentMember.id},${departmentMember.departmentId},${departmentMember.userId}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "departmentMember.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddDepartmentMembers = async () => {
    try {
      const response = await createDepartmentMember({
        departmentId: newDepartmentMember.department_id,
        userId: newDepartmentMember.user_id,
      }).unwrap();

      if (response) {
        await refetch();
        dispatch(addDepartmentMembers(response)); // Update Redux store with the newly created role
        setNewDepartmentMember({ department_id: 0, user_id: 0 });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding department Member:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (departmentMember: {
    id: number;
    departmentId: number;
    userId: number;
  }) => {
    if (!departmentMember) return;
    setSelectedDepartmentMember(departmentMember); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateDepartmentMember = async () => {
    if (
      !selectedDepartmentMember ||
      !selectedDepartmentMember.departmentId ||
      !selectedDepartmentMember.userId
    ) {
      alert("Both department_id and user_id fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedDepartmentMember = await updateDepartmentMember({
        id: selectedDepartmentMember.id,
        departmentId: selectedDepartmentMember.departmentId,
        userId: selectedDepartmentMember.userId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateDepartmentMembers(updatedDepartmentMember));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedDepartmentMember(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "departmentId", headerName: "Department ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          departmentId: number;
          userId: number;
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
          label="Search DepartmentMembers"
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
            Add Department Members
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
        rows={filteredDepartmentMembers}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Department Members</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department ID"
            fullWidth
            variant="outlined"
            value={newDepartmentMember.department_id}
            onChange={(e) => setNewDepartmentMember({ ...newDepartmentMember, department_id: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Users ID"
            fullWidth
            variant="outlined"
            value={newDepartmentMember.user_id}
            onChange={(e) =>
              setNewDepartmentMember({ ...newDepartmentMember, user_id: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddDepartmentMembers} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Department Members</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Members"
            fullWidth
            variant="outlined"
            value={selectedDepartmentMember?.departmentId || ""}
            onChange={(e) =>
              setSelectedDepartmentMember((prev) =>
                prev
                  ? { ...prev, departmentId:  Number(e.target.value) }
                  : { id: 0, departmentId:  Number(e.target.value), userId: Number(e.target.value) }
              )
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={selectedDepartmentMember?.userId || ""}
            onChange={(e) =>
              setSelectedDepartmentMember((prev) =>
                prev
                  ? { ...prev, userId: Number(e.target.value) }
                  : { id: 0, departmentId:  Number(e.target.value), userId: Number(e.target.value) }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDepartmentMember} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );};

export default DepartmentMembersTable;
