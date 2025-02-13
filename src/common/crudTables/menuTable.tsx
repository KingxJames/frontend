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
  useFetchMenusQuery,
  useCreateMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from "./../../../store/services/menuAPI";
import {
  setMenus,
  updateMenus,
  addMenus,
  deleteMenus,
  selectMenus,
} from "./../../../store/features/menuSlice";

export const MenuTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: menusData } = useFetchMenusQuery();
  const [createMenu] = useCreateMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const menus = useSelector(selectMenus);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newMenu, setNewMenu] = useState({ name: "", icon: "", path: "" });
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    name: string;
    icon: string;
    path: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (menusData) {
      dispatch(setMenus(menusData)); // Store roles in Redux
    }
  }, [menusData, dispatch]);

  // Filter roles based on search query
  const filteredMenus = menus.menus
    ? menus.menus.filter((menu) =>
        menu.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const menuToDelete = menus.menus.find((menu) => menu.id === id);
      if (menuToDelete) {
        await deleteMenu(menuToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteMenus(menuToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting Menu:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,name,icon,path"]
        .concat(
          menus.menus.map(
            (menu) => `${menu.id},${menu.name},${menu.icon},${menu.path}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "menu.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddMenu = async () => {
    try {
      const response = await createMenu({
        name: newMenu.name,
        icon: newMenu.icon,
        path: newMenu.path,
      }).unwrap();

      if (response) {
        dispatch(addMenus(response)); // Update Redux store with the newly created role
        setNewMenu({ name: "", icon: "", path: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (menu: {
    id: number;
    name: string;
    icon: string;
    path: string;
  }) => {
    if (!menu) return;
    setSelectedMenu(menu); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateMenu = async () => {
    if (
      !selectedMenu ||
      !selectedMenu.name.trim() ||
      !selectedMenu.icon.trim() ||
      !selectedMenu.path.trim()
    ) {
      alert("Both name, icon, and path fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedMenu = await updateMenu({
        id: selectedMenu.id,
        name: selectedMenu.name,
        icon: selectedMenu.icon,
        path: selectedMenu.path,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateMenus(updatedMenu));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedMenu(null);
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "icon", headerName: "Icon", flex: 1 },
    { field: "path", headerName: "Path", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          name: string;
          icon: string;
          path: string;
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
          label="Search Menu"
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
            Add Menu
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
        rows={filteredMenus}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Menu Name"
            fullWidth
            variant="outlined"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Icon"
            fullWidth
            variant="outlined"
            value={newMenu.icon}
            onChange={(e) => setNewMenu({ ...newMenu, icon: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Path"
            fullWidth
            variant="outlined"
            value={newMenu.path}
            onChange={(e) => setNewMenu({ ...newMenu, path: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMenu} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Menu Name"
            fullWidth
            variant="outlined"
            value={selectedMenu?.name || ""}
            onChange={(e) =>
              setSelectedMenu((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : { id: 0, name: e.target.value, icon: "", path: "" }
              )     
            }
          />
          <TextField
            margin="dense"
            label="Icon"
            fullWidth
            variant="outlined"
            value={selectedMenu?.icon || ""}
            onChange={(e) =>
              setSelectedMenu((prev) =>
                prev
                  ? { ...prev, icon: e.target.value }
                  : { id: 0, name: "", icon: e.target.value, path: "" }
              )
            }
          />
          <TextField
            margin="dense"
            label="Path"
            fullWidth
            variant="outlined"
            value={selectedMenu?.path || ""}            
            onChange={(e) =>
              setSelectedMenu((prev) =>
                prev
                  ? { ...prev, path: e.target.value }
                  : { id: 0, name: "", icon: "", path: e.target.value }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateMenu} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );


};


export default MenuTable;