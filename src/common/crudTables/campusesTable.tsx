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
  useFetchCampusesQuery,
  useCreateCampusesMutation,
  useDeleteCampusesMutation,
  useUpdateCampusesMutation,
} from "../../../store/services/campusAPI";
import {
  setCampuses,
  updateCampuses,
  addCampuses,
  deleteCampuses,
  selectCampuses,
} from "../../../store/features/campusSlice";

export const CampusesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: campusesData, refetch } = useFetchCampusesQuery();
  const [createCampus] = useCreateCampusesMutation();
  const [deleteCampus] = useDeleteCampusesMutation();
  const [updateCampus] = useUpdateCampusesMutation();
  const campuses = useSelector(selectCampuses);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newCampus, setNewCampus] = useState({ campus: "" });
  const [selectedCampus, setSelectedCampus] = useState<{
    id: number;
    campus: string;
  } | null>(null);

  // Fetch campuses when component mounts
  useEffect(() => {
    if (campusesData) {
      dispatch(setCampuses(campusesData)); // Store campuses in Redux
    }
  }, [campusesData, dispatch]);

  // Filter campuses based on search query
  const filteredCampuses = Array.isArray(campuses?.campus)
    ? campuses.campus.filter((campus) =>
        campus?.campus?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const campusToDelete = campuses.campus.find((campus) => campus.id === id);
      if (campusToDelete) {
        await deleteCampus(campusToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteCampuses(campusToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting campus:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Campus"]
        .concat(
          campuses.campus.map((campus) => `${campus.id},${campus.campus}`)
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campuses.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new campus
  const handleAddCampus = async () => {
    try {
      const response = await createCampus({
        campus: newCampus.campus,
      }).unwrap();

      if (response) {
        await refetch();
        dispatch(addCampuses(response)); // Update Redux store with the newly created campus
        setNewCampus({ campus: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding campus:", error);
    }
  };

  // Handle edit campus - open dialog
  const handleEdit = (campus: { id: number; campus: string }) => {
    if (!campus) return;
    setSelectedCampus(campus); // Ensure selectedCampus is set
    setOpenEdit(true);
  };

  const handleUpdateCampus = async () => {
    if (!selectedCampus || !selectedCampus.campus.trim()) {
      alert("The campus field is required.");
      return;
    }

    try {
      const updatedCampus = await updateCampus({
        id: selectedCampus.id,
        campus: selectedCampus.campus,
      }).unwrap();

      dispatch(updateCampuses(updatedCampus));
      await refetch();

      setOpenEdit(false);
      setSelectedCampus(null);
    } catch (error) {
      console.error("Error updating campus:", error);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "campus", headerName: "Campus", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as { id: number; campus: string };
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
          label="Search Campus"
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
            sx={{ marginRight: 2 }}
          >
            Add Campus
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
        rows={filteredCampuses.map((c) => ({ id: c.id, campus: c.campus }))}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Campus Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Campus</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Campus Name"
            fullWidth
            variant="outlined"
            value={newCampus.campus}
            onChange={(e) =>
              setNewCampus({ ...newCampus, campus: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCampus} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Campus Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Campus</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Campus Name"
            fullWidth
            variant="outlined"
            value={selectedCampus?.campus || ""}
            onChange={(e) =>
              setSelectedCampus((prev) =>
                prev
                  ? { ...prev, campus: e.target.value }
                  : { id: 0, campus: e.target.value }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCampus} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CampusesTable;
