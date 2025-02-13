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
  useFetchMessageCategoriesQuery,
  useCreateMessageCategoryMutation,
  useDeleteMessageCategoryMutation,
  useUpdateMessageCategoryMutation,
} from "../../../store/services/messageCategoriesAPI";
import {
  setMessageCategories,
  updateMessageCategories,
  addMessageCategories,
  deleteMessageCategories,
  selectMessageCategories,
} from "../../../store/features/messageCategoriesSlice";

export const MessageCategoriesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: messsageCategoriesData } = useFetchMessageCategoriesQuery();
  const [createMessageCategory] = useCreateMessageCategoryMutation();
  const [deleteMessageCategory] = useDeleteMessageCategoryMutation();
  const [updateMessageCategory] = useUpdateMessageCategoryMutation();
  const messageCategories = useSelector(selectMessageCategories);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newMessageCategory, setNewMessageCategory] = useState({
    category: "",
  });
  const [selectedMessageCategory, setSelectedMessageCategory] = useState<{
    id: number;
    category: string;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (messsageCategoriesData) {
      dispatch(setMessageCategories(messsageCategoriesData)); // Store roles in Redux
    }
  }, [messsageCategoriesData, dispatch]);

  // Filter roles based on search query
  const filteredMessageCategories = messageCategories.messageCategories
    ? messageCategories.messageCategories.filter((messageCategory) =>
        messageCategory.category?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const messageCategoryToDelete = messageCategories.messageCategories.find(
        (messageCategory) => messageCategory.id === id
      );
      if (messageCategoryToDelete) {
        await deleteMessageCategory(
          messageCategoryToDelete.id.toString()
        ).unwrap(); // Call the delete mutation
        dispatch(deleteMessageCategories(messageCategoryToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deletingMessage Categories:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Category"]
        .concat(
          messageCategories.messageCategories.map(
            (messageCategory) =>
              `${messageCategory.id},${messageCategory.category}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "messageCategories.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddMessageCategory = async () => {
    try {
      const response = await createMessageCategory({
        category: newMessageCategory.category,
      }).unwrap();

      if (response) {
        dispatch(addMessageCategories(response)); // Update Redux store with the newly created role
        setNewMessageCategory({ category: "" });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (messageCategory: { id: number; category: string }) => {
    if (!messageCategory) return;
    setSelectedMessageCategory(messageCategory); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateMessageCategories = async () => {
    if (!selectedMessageCategory || !selectedMessageCategory.category.trim()) {
      alert("Both category fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedMessageCategory = await updateMessageCategory({
        id: selectedMessageCategory.id,
        category: selectedMessageCategory.category,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateMessageCategories(updatedMessageCategory));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedMessageCategory(null);
    } catch (error) {
      console.error("Error updating messageCategory:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          category: string;
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
          label="Search by Category"
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
            Add Message Category
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
        rows={filteredMessageCategories}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Message Categories</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={newMessageCategory.category}
            onChange={(e) =>
              setNewMessageCategory({
                ...newMessageCategory,
                category: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMessageCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Message Categories</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={selectedMessageCategory?.category || ""}
            onChange={(e) =>
              setSelectedMessageCategory((prev) =>
                prev
                  ? { ...prev, category: e.target.value }
                  : { id: 0, category: e.target.value }
              )
            }
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateMessageCategories} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MessageCategoriesTable;
