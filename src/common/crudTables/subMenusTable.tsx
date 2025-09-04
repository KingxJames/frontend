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
  useFetchSubMenusQuery,
  useCreateSubMenuMutation,
  useDeleteSubMenuMutation,
  useUpdateSubMenuMutation,
} from "./../../../store/services/subMenusAPI";
import {
  setSubMenus,
  updateSubMenus,
  addSubMenus,
  deleteSubMenus,
  selectSubMenus,
} from "./../../../store/features/subMenusSlice";

export const SubMenusTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: subMenusData } = useFetchSubMenusQuery();
  const [createSubMenu] = useCreateSubMenuMutation();
  const [deleteSubMenu] = useDeleteSubMenuMutation();
  const [updateSubMenu] = useUpdateSubMenuMutation();
  const subMenus = useSelector(selectSubMenus);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newSubMenu, setNewSubMenu] = useState({
    name: "",
    icon: "",
    path: "",
    menuId: 0,
  });
  const [selectedSubMenu, setSelectedSubMenu] = useState<{
    id: number;
    name: string;
    icon: string;
    path: string;
    menuId: number;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (subMenusData) {
      dispatch(setSubMenus(subMenusData)); // Store roles in Redux
    }
  }, [subMenusData, dispatch]);

  // Filter roles based on search query
  const filteredSubMenus = subMenus.subMenus
    ? subMenus.subMenus.filter((subMenu) =>
        subMenu.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const subMenusToDelete = subMenus.subMenus.find(
        (subMenu) => subMenu.id === id
      );
      if (subMenusToDelete) {
        await deleteSubMenu(subMenusToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteSubMenus(subMenusToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting subMenus:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Icon,Path,Menu ID"]
        .concat(
          subMenus.subMenus.map(
            (subMenu) =>
              `${subMenu.id},${subMenu.name}, ${subMenu.icon},${subMenu.path}, ${subMenu.menuId}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subMenu.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddSubMenu = async () => {
    try {
      const response = await createSubMenu({
        name: newSubMenu.name,
        icon: newSubMenu.icon,
        path: newSubMenu.path,
        menuId: newSubMenu.menuId,
      }).unwrap();

      if (response) {
        dispatch(addSubMenus(response)); // Update Redux store with the newly created role
        setNewSubMenu({ name: "", icon: "", path: "", menuId: 0 });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding sub menu:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (subMenu: {
    id: number;
    name: string;
    icon: string;
    path: string;
    menuId: number;
  }) => {
    if (!subMenu) return;
    setSelectedSubMenu(subMenu); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateSubMenu = async () => {
    if (
      !selectedSubMenu ||
      !selectedSubMenu.name.trim() ||
      !selectedSubMenu.icon.trim() ||
      !selectedSubMenu.path.trim() ||
      !selectedSubMenu.menuId
    ) {
      alert("fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedSubMenu = await updateSubMenu({
        id: selectedSubMenu.id,
        name: selectedSubMenu.name,
        icon: selectedSubMenu.icon,
        path: selectedSubMenu.path,
        menuId: selectedSubMenu.menuId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateSubMenus(updatedSubMenu));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedSubMenu(null);
    } catch (error) {
      console.error("Error updating subMenu:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "icon", headerName: "Icon", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "path", headerName: "Path", flex: 1 },
    { field: "menuId", headerName: "Menu ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          icon: string;
          name: string;
          path: string;
          menuId: number;
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
          label="Search Sub Menus"
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
            Add SubMenu
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
        rows={filteredSubMenus}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Sub Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Sub Menu"
            fullWidth
            variant="outlined"
            value={newSubMenu.icon}
            onChange={(e) =>
              setNewSubMenu({ ...newSubMenu, icon: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={newSubMenu.name}
            onChange={(e) =>
              setNewSubMenu({ ...newSubMenu, name: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="path"
            fullWidth
            variant="outlined"
            value={newSubMenu.path}
            onChange={(e) =>
              setNewSubMenu({ ...newSubMenu, path: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Menu ID"
            fullWidth
            variant="outlined"
            value={newSubMenu.menuId}
            onChange={(e) =>
              setNewSubMenu({ ...newSubMenu, menuId: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSubMenu} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit subMenu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Icon"
            fullWidth
            variant="outlined"
            value={selectedSubMenu?.icon || ""}
            onChange={(e) =>
              setSelectedSubMenu((prev) =>
                prev
                  ? { ...prev, icon: e.target.value }
                  : {
                      id: 0,
                      icon: e.target.value,
                      name: "",
                      path: "",
                      menuId: 0,
                    }
              )
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="name"
            fullWidth
            variant="outlined"
            value={selectedSubMenu?.name || ""}
            onChange={(e) =>
              setSelectedSubMenu((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : {
                      id: 0,
                      icon: "",
                      name: e.target.value,
                      path: "",
                      menuId: 0,
                    }
              )
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="path"
            fullWidth
            variant="outlined"
            value={selectedSubMenu?.path || ""}
            onChange={(e) =>
              setSelectedSubMenu((prev) =>
                prev
                  ? { ...prev, path: e.target.value }
                  : {
                      id: 0,
                      icon: "",
                      name: "",
                      path: e.target.value,
                      menuId: 0,
                    }
              )
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="menuId"
            fullWidth
            variant="outlined"
            value={selectedSubMenu?.menuId || ""}
            onChange={(e) =>
              setSelectedSubMenu((prev) =>
                prev
                  ? { ...prev, menuId: Number(e.target.value) }
                  : {
                      id: 0,
                      icon: "",
                      name: "",
                      path: "",
                      menuId: Number(e.target.value),
                    }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubMenu} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubMenusTable;
