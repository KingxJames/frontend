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
  useFetchBuildingsQuery,
  useCreateBuildingsMutation,
  useDeleteBuildingsMutation,
  useUpdateBuildingsMutation,
} from "../../../store/services/buildingsAPI";

import {
  setBuilding,
  updateBuilding,
  addBuilding,
  deleteBuilding,
  selectBuildings,
  IBuilding,
} from "../../../store/features/buildingSlice";

export const BuildingsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: buildingsData, refetch } = useFetchBuildingsQuery();
  const [createBuildings] = useCreateBuildingsMutation();
  const [deleteBuildings] = useDeleteBuildingsMutation(); // RTK Query mutation
  const [updateBuildings] = useUpdateBuildingsMutation();
  const buildings = useSelector(selectBuildings);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newBuilding, setNewBuilding] = useState({
    name: "",
    location: "",
    campus: "",
  });
  const [selectedBuilding, setSelectedBuilding] = useState<{
    id: string;
    name: string;
    location: string;
    campus: string;
  } | null>(null);

  useEffect(() => {
    if (buildingsData) {
      dispatch(setBuilding(buildingsData.data.buildings));
    }
  }, [buildingsData, dispatch]);

  // Safe filtering - check if buildings is an array before filtering
  const filteredBuildings = Array.isArray(buildings)
    ? buildings.filter((building: any) =>
        building.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await deleteBuildings(id).unwrap(); // API call
      refetch();
    } catch (error) {
      console.error("Failed to delete building:", error);
    }
  };

  const handleExport = () => {
    if (!buildings || buildings.length === 0) return;

    const csvHeader = "Building,Building Location,Campus";
    const csvRows = buildings.map(
      (building) => `${building.name},${building.location},${building.campus}`
    );

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "buildings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddBuilding = async () => {
    if (!newBuilding.name || !newBuilding.location || !newBuilding.campus) {
      alert("All fields are required.");
      return;
    }

    try {
      const buildingData: Partial<IBuilding> = {
        name: newBuilding.name,
        location: newBuilding.location,
        campus: newBuilding.campus,
      };

      const response = await createBuildings(buildingData).unwrap();

      if (response) {
        // Option 1: Use refetch for accurate data
        await refetch();

        // Option 2: Optimistic update for instant UI
        // dispatch(addBuilding(response));

        // Reset form
        setNewBuilding({ name: "", location: "", campus: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding Building:", error);
      alert("Failed to add building. Please try again.");
    }
  };

  const handleEdit = (building: {
    id: string;
    name: string;
    location: string;
    campus: string;
  }) => {
    setSelectedBuilding(building);
    setOpenEdit(true);
  };

  const handleUpdateBuilding = async () => {
    if (
      !selectedBuilding ||
      !selectedBuilding.name ||
      !selectedBuilding.location ||
      !selectedBuilding.campus
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      // API call to update building
      const updatedBuildingResponse = await updateBuildings(
        selectedBuilding
      ).unwrap();

      // Option 1: Optimistic update (instant UI)
      dispatch(updateBuilding(updatedBuildingResponse));

      // Option 2: Strict API sync
      await refetch();

      setOpenEdit(false);
      setSelectedBuilding(null);
    } catch (error) {
      console.error("Error updating building:", error);
      alert("Failed to update building. Please try again.");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Building", flex: 1 },
    { field: "location", headerName: "Building Location", flex: 2 },
    { field: "campus", headerName: "Campus", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          name: string;
          location: string;
          campus: string;
        };
        return (
          <div>
            <IconButton onClick={() => handleEdit(row)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.id.toString())}
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
        getRowId={(row) => row.id}
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
            sx={{ mt: 2, mb: 2 }} // Adds spacing
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Building Location</InputLabel>
            <Select
              value={newBuilding.location}
              label="Building Location"
              onChange={(e) =>
                setNewBuilding({ ...newBuilding, location: e.target.value })
              }
            >
              <MenuItem value="Belmopan">Belmopan</MenuItem>
              <MenuItem value="Belize City">Belize City</MenuItem>
              <MenuItem value="Central Farm">Central Farm</MenuItem>
              <MenuItem value="Punta Gorda">Punta Gorda</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Campus</InputLabel>
            <Select
              value={newBuilding.campus}
              label="Campus"
              onChange={(e) =>
                setNewBuilding({ ...newBuilding, campus: e.target.value })
              }
            >
              <MenuItem value="Belmopan Campus">Belmopan Campus</MenuItem>
              <MenuItem value="Belize City Campus (Education Campus)">
                Belize City Campus (Education Campus)
              </MenuItem>
              <MenuItem value="Belize City Campus (Business Campus)">
                Belize City Campus (Business Campus)
              </MenuItem>
              <MenuItem value="Central Campus">Central Form Campus</MenuItem>
              <MenuItem value="Punta Gorda Campus">Punta Gorda Campus</MenuItem>
            </Select>
          </FormControl>
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
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Building Location</InputLabel>
            <Select
              value={newBuilding.location}
              label="Building Location"
              onChange={(e) =>
                setNewBuilding({ ...newBuilding, location: e.target.value })
              }
            >
              <MenuItem value="Belmopan">Belmopan</MenuItem>
              <MenuItem value="Belize City">Belize City</MenuItem>
              <MenuItem value="Central Farm">Central Farm</MenuItem>
              <MenuItem value="Punta Gorda">Punta Gorda</MenuItem>
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth variant="outlined">
            <InputLabel>Campus</InputLabel>
            <Select
              value={newBuilding.campus}
              label="Campus"
              onChange={(e) =>
                setNewBuilding({ ...newBuilding, campus: e.target.value })
              }
            >
              <MenuItem value="Belmopan Campus">Belmopan Campus</MenuItem>
              <MenuItem value="Belize City Campus (Education Campus)">
                Belize City Campus (Education Campus)
              </MenuItem>
              <MenuItem value="Belize City Campus (Business Campus)">
                Belize City Campus (Business Campus)
              </MenuItem>
              <MenuItem value="Central Campus">Central Form Campus</MenuItem>
              <MenuItem value="Punta Gorda Campus">Punta Gorda Campus</MenuItem>
            </Select>
          </FormControl>
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
