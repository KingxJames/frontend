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
  useFetchBuildingsQuery,
  useCreateBuildingsMutation,
  useDeleteBuildingsMutation,
  useUpdateBuildingsMutation,
} from "../../../store/services/buildingsAPI";
import {
  setBuildings,
  updateBuildings,
  addBuildings,
  deleteBuildings,
  selectBuildings,
} from "../../../store/features/buildingSlice";

export const BuildingsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: buildingsData, refetch } = useFetchBuildingsQuery();
  const [createBuilding] = useCreateBuildingsMutation();
  const [deleteBuilding] = useDeleteBuildingsMutation();
  const [updateBuilding] = useUpdateBuildingsMutation();
  const buildings = useSelector(selectBuildings);

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newBuilding, setNewBuilding] = useState({
    name: "",
    location: "",
    campusId: 0,
  });
  const [selectedBuilding, setSelectedBuilding] = useState<{
    id: number;
    name: string;
    location: string;
    campusId: number;
  } | null>(null);

  useEffect(() => {
    if (buildingsData) {
      dispatch(setBuildings(buildingsData));
    }
  }, [buildingsData, dispatch]);

  const filteredBuildings = buildings.buildings
    ? buildings.buildings.filter((building) =>
        building.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const buildingToDelete = buildings.buildings.find(
        (building) => building.id === id
      );
      if (buildingToDelete) {
        await deleteBuilding(buildingToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteBuildings(buildingToDelete.id)); // Update Redux store

        // Force re-fetch to get the latest data
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Building Location"]
        .concat(
          buildings.buildings.map(
            (building) => `${building.id},${building.name},${building.location}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "buildings.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleAddBuilding = async () => {
    try {
      const response = await createBuilding({
        name: newBuilding.name,
        location: newBuilding.location,
        campusId: newBuilding.campusId,
      }).unwrap();

      if (response) {
        await refetch(); // Force re-fetch to get the latest data
        dispatch(addBuildings(response));
        setNewBuilding({ name: "", location: "", campusId: 0 });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding Building:", error);
    }
  };

  const handleEdit = (building: {
    id: number;
    name: string;
    location: string;
    campusId: number;
  }) => {
    setSelectedBuilding(building);
    setOpenEdit(true);
  };

  const handleUpdateBuilding = async () => {
    if (
      !selectedBuilding ||
      !selectedBuilding.name.trim() ||
      !selectedBuilding.location.trim()
    ) {
      alert("Both name and building location fields are required.");
      return;
    }

    try {
      const updatedBuilding = await updateBuilding(selectedBuilding).unwrap();
      dispatch(updateBuildings(updatedBuilding));
      refetch();
      setOpenEdit(false);
      setSelectedBuilding(null);
    } catch (error) {
      console.error("Error updating building:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Building", flex: 1 },
    { field: "location", headerName: "Building Location", flex: 2 },
    { field: "campusId", headerName: "Campus ID", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          name: string;
          location: string;
          campusId: number;
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
          label="Search Buildings"
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
            Add Building
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
        rows={filteredBuildings}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Building Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Building</DialogTitle>
        <DialogContent>
          <TextField
            label="Building Name"
            fullWidth
            variant="outlined"
            value={newBuilding.name}
            onChange={(e) =>
              setNewBuilding({ ...newBuilding, name: e.target.value })
            }
            sx={{ marginBottom: 2 }} // Adds spacing
          />
          <TextField
            label="Building Location"
            fullWidth
            variant="outlined"
            value={newBuilding.location}
            onChange={(e) =>
              setNewBuilding({ ...newBuilding, location: e.target.value })
            }
            sx={{ marginBottom: 2 }} // Adds spacing
          />
          <TextField
            label="Campus Id"
            fullWidth
            variant="outlined"
            value={newBuilding.campusId}
            onChange={(e) =>
              setNewBuilding({
                ...newBuilding,
                campusId: Number(e.target.value),
              })
            }
            sx={{ marginBottom: 2 }} // Adds spacing
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddBuilding} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Building Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Building</DialogTitle>
        <DialogContent>
          <TextField
            label="Building Name"
            fullWidth
            variant="outlined"
            value={selectedBuilding?.name || ""}
            onChange={(e) =>
              setSelectedBuilding((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            sx={{ marginBottom: 2 }} // Adds spacing
          />
          <TextField
            label="Building Location"
            fullWidth
            variant="outlined"
            value={selectedBuilding?.location || ""}
            onChange={(e) =>
              setSelectedBuilding((prev) =>
                prev ? { ...prev, location: e.target.value } : null
              )
            }
            sx={{ marginBottom: 2 }} // Adds spacing
          />
          <TextField
            label="Campus Id"
            fullWidth
            variant="outlined"
            value={selectedBuilding?.campusId || ""}
            onChange={(e) =>
              setSelectedBuilding((prev) =>
                prev ? { ...prev, campusId: Number(e.target.value) } : null
              )
            }
            sx={{ marginBottom: 2 }} // Adds spacing
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBuilding} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuildingsTable;
