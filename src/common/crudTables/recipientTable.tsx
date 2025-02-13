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
  useFetchRecipientsQuery,
  useCreateRecipientMutation,
  useDeleteRecipientMutation,
  useUpdateRecipientMutation,
} from "./../../../store/services/recipientsAPI";
import {
  setRecipients,
  updateRecipients,
  addRecipients,
  deleteRecipients,
  selectRecipients,
} from "./../../../store/features/recipientSlice";

export const RecipientTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: recipientData } = useFetchRecipientsQuery();
  const [createRecipient] = useCreateRecipientMutation();
  const [deleteRecipient] = useDeleteRecipientMutation();
  const [updateRecipient] = useUpdateRecipientMutation();
  const recipients = useSelector(selectRecipients);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    userId: 0,
    messageId: 0,
  });
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: number;
    userId: number;
    messageId: number;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (recipientData) {
      dispatch(setRecipients(recipientData)); // Store roles in Redux
    }
  }, [recipientData, dispatch]);

  // Filter roles based on search query
  const filteredRecipients = recipients.recipients
    ? recipients.recipients.filter((recipient) =>
        recipient.userId
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const recipientToDelete = recipients.recipients.find(
        (recipient) => recipient.id === id
      );
      if (recipientToDelete) {
        await deleteRecipient(recipientToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteRecipients(recipientToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting Recipients:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,user ID,Message ID"]
        .concat(
          recipients.recipients.map(
            (recipient) =>
              `${recipient.id},${recipient.userId},${recipient.messageId}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "recipients.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddRecipient = async () => {
    try {
      const response = await createRecipient({
        userId: newRecipient.userId,
        messageId: newRecipient.messageId,
      }).unwrap();

      if (response) {
        dispatch(addRecipients(response)); // Update Redux store with the newly created role
        setNewRecipient({ userId: 0, messageId: 0 });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding recipient:", error);
    }
  };

  const handleUpdateRecipient = async () => {
    if (
      !selectedRecipient ||
      !selectedRecipient.userId ||
      !selectedRecipient.messageId
    ) {
      alert("Both userId and messageId fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedRecipient = await updateRecipient({
        id: selectedRecipient.id,
        userId: selectedRecipient.userId,
        messageId: selectedRecipient.messageId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateRecipients(updatedRecipient));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedRecipient(null);
    } catch (error) {
      console.error("Error updating recipient:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (recipient: {
    id: number;
    userId: number;
    messageId: number;
  }) => {
    if (!recipient) return;
    setSelectedRecipient(recipient); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "messageId", headerName: "Message ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          userId: number;
          messageId: number;
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
          label="Search by User ID"
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
            Add recipient
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
        rows={filteredRecipients}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Recipient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            value={newRecipient.userId}
            onChange={(e) =>
              setNewRecipient({
                ...newRecipient,
                userId: Number(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Message ID"
            fullWidth
            variant="outlined"
            value={newRecipient.messageId}
            onChange={(e) =>
              setNewRecipient({
                ...newRecipient,
                messageId: Number(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddRecipient} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Recipient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            value={selectedRecipient?.userId || ""}
            onChange={(e) =>
              setSelectedRecipient((prev) =>
                prev
                  ? { ...prev, userId: Number(e.target.value) }
                  : { id: 0, userId: Number(e.target.value), messageId: 0 }
              )
            }
          />
          <TextField
            margin="dense"
            label="Message ID"
            fullWidth
            variant="outlined"
            value={selectedRecipient?.messageId || ""}
            onChange={(e) =>
              setSelectedRecipient((prev) =>
                prev
                  ? { ...prev, messageId: Number(e.target.value) }
                  : { id: 0, userId: 0, messageId: Number(e.target.value) }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRecipient} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipientTable;
