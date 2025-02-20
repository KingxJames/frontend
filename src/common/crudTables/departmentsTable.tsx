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
  useFetchDepartmentsQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../../../store/services/departmentsAPI";
import {
  setDepartments,
  updateDepartments,
  addDepartments,
  deleteDepartments,
  selectDepartments,
} from "../../../store/features/departmentSlice";

export const DepartmentsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: departmentsData, refetch } = useFetchDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const departments = useSelector(selectDepartments);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    departments: "",
  });
  const [selectedDepartment, setSelectedDepartment] = useState<{
    id: number;
    departments: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (departmentsData) {
      dispatch(setDepartments(departmentsData)); // Store roles in Redux
    }
  }, [departmentsData, dispatch]);

  // Filter roles based on search query
  const filteredDepartments = departments.departments
    ? departments.departments.filter((department) =>
        department.departments?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const departmentToDelete = departments.departments.find(
        (department) => department.id === id
      );
      if (departmentToDelete) {
        await deleteDepartment(departmentToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteDepartments(departmentToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Departments"]
        .concat(
          departments.departments.map(
            (department) => `${department.id},${department.departments}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "departments.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new department
  const handleAddDepartment = async () => {
    try {
      const response = await createDepartment({
        departments: newDepartment.departments,
      }).unwrap();

      if (response) {
        await refetch();
        dispatch(addDepartments(response)); // Update Redux store with the newly created role
        setNewDepartment({ departments: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (department: { id: number; departments: string }) => {
    if (!department) return;
    setSelectedDepartment(department); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateDepartment = async () => {
    if (!selectedDepartment || !selectedDepartment.departments.trim()) {
      alert("Both departments fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedDepartment = await updateDepartment({
        id: selectedDepartment.id,
        departments: selectedDepartment.departments,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateDepartments(updatedDepartment));

      // Force re-fetch to get the latest data
      await refetch();

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "departments", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          departments: string;
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
          label="Search Departments"
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
            Add Department
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
        rows={filteredDepartments}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Department Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department"
            fullWidth
            variant="outlined"
            value={newDepartment.departments}
            onChange={(e) =>
              setNewDepartment({
                ...newDepartment,
                departments: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddDepartment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Departments</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department"
            fullWidth
            variant="outlined"
            value={selectedDepartment?.departments || ""}
            onChange={(e) =>
              setSelectedDepartment((prev) =>
                prev
                  ? { ...prev, departments: e.target.value }
                  : { id: 0, departments: e.target.value }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDepartment} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepartmentsTable;
