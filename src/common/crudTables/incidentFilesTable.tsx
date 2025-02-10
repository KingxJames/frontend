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
  useFetchIncidentFilesQuery,
  useCreateIncidentFileMutation,
  useDeleteIncidentFileMutation,
  useUpdateIncidentFileMutation,
} from "./../../../store/services/incidentFilesAPI";
import {
  setIncidentFiles,
  updateIncidentFiles,
  addIncidentFiles,
  deleteIncidentFiles,
  selectIncidentFiles,
} from "./../../../store/features/incidentFileSlice";

export const IncidentFilesTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: incidentFilesData } = useFetchIncidentFilesQuery();
  const [createIncidentFile] = useCreateIncidentFileMutation();
  const [deleteIncidentFile] = useDeleteIncidentFileMutation();
  const [updateIncidentFile] = useUpdateIncidentFileMutation();
  const incidentFiles = useSelector(selectIncidentFiles);
  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newIncidentFile, setNewIncidentFile] = useState({
    path: "",
    comment: "",
    messageId: 0,
  });
  const [selectedIncidentFile, setSelectedIncidentFile] = useState<{
    id: number;
    path: string;
    comment: string;
    messageId: number;
  } | null>(null);

  // Fetch roles when component mounts
  useEffect(() => {
    if (incidentFilesData) {
      dispatch(setIncidentFiles(incidentFilesData)); // Store roles in Redux
    }
  }, [incidentFilesData, dispatch]);

  // Filter roles based on search query
  const filteredIncidentFiles = incidentFiles.incidentFiles
    ? incidentFiles.incidentFiles.filter((incidentFile) =>
        incidentFile.path?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const incidentFilesToDelete = incidentFiles.incidentFiles.find(
        (incidentFile) => incidentFile.id === id
      );
      if (incidentFilesToDelete) {
        await deleteIncidentFile(incidentFilesToDelete.id.toString()).unwrap(); // Call the delete mutation
        dispatch(deleteIncidentFiles(incidentFilesToDelete.id)); // Update Redux store
      }
    } catch (error) {
      console.error("Error deleting IncidentFiles:", error);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,path,comment, message ID"]
        .concat(
          incidentFiles.incidentFiles.map(
            (incidentFile) =>
              `${incidentFile.id},${incidentFile.path},${incidentFile.comment}, ${incidentFile.messageId}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidentFile.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Handle add new role
  const handleAddIncidentFiles = async () => {
    try {
      const response = await createIncidentFile({
        path: newIncidentFile.path,
        comment: newIncidentFile.comment,
        messageId: newIncidentFile.messageId,
      }).unwrap();

      if (response) {
        dispatch(addIncidentFiles(response)); // Update Redux store with the newly created role
        setNewIncidentFile({ path: "", comment: "", messageId: 0 });
        setOpenAdd(false);
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  // Handle edit role - open dialog
  const handleEdit = (incidentFile: {
    id: number;
    path: string;
    comment: string;
    messageId: number;
  }) => {
    if (!incidentFile) return;
    setSelectedIncidentFile(incidentFile); // Ensure selectedRole is set
    setOpenEdit(true);
  };

  const handleUpdateRole = async () => {
    if (
      !selectedIncidentFile ||
      !selectedIncidentFile.path.trim() ||
      !selectedIncidentFile.comment.trim() ||
      !selectedIncidentFile.messageId
    ) {
      alert("Both path, comment, messageId fields are required.");
      return;
    }

    try {
      // Call the updateRole mutation
      const updatedIncidentFiles = await updateIncidentFile({
        id: selectedIncidentFile.id,
        path: selectedIncidentFile.path,
        comment: selectedIncidentFile.comment,
        messageId: selectedIncidentFile.messageId,
      }).unwrap();

      // Update Redux store with the updated role
      dispatch(updateIncidentFiles(updatedIncidentFiles));

      // Close the dialog and reset selectedRole
      setOpenEdit(false);
      setSelectedIncidentFile(null);
    } catch (error) {
      console.error("Error updating incident file:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "path", headerName: "Incident files", flex: 1 },
    { field: "comment", headerName: "Comment", flex: 2 },
    { field: "messageId", headerName: "Message ID", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: number;
          path: string;
          comment: string;
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
          label="Search Incident Files"
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
            Add Incident Files
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
        rows={filteredIncidentFiles}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Incident File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Path"
            fullWidth
            variant="outlined"
            value={newIncidentFile.path}
            onChange={(e) =>
              setNewIncidentFile({ ...newIncidentFile, path: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Comment"
            fullWidth
            variant="outlined"
            value={newIncidentFile.comment}
            onChange={(e) =>
              setNewIncidentFile({
                ...newIncidentFile,
                comment: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="message ID"
            fullWidth
            variant="outlined"
            value={newIncidentFile.messageId}
            onChange={(e) =>
              setNewIncidentFile({
                ...newIncidentFile,
                messageId: Number(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddIncidentFiles} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Incident Files</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Incident files"
            fullWidth
            variant="outlined"
            value={selectedIncidentFile?.path || ""}
            onChange={(e) =>
              setSelectedIncidentFile((prev) =>
                prev
                  ? { ...prev, path: e.target.value }
                  : { id: 0, path: e.target.value, comment:  e.target.value, messageId: 0 }
              )
            }
          />
          <TextField
            margin="dense"
            label="Comment"
            fullWidth
            variant="outlined"
            value={selectedIncidentFile?.comment || ""}
            onChange={(e) =>
              setSelectedIncidentFile((prev) =>
                prev
                  ? { ...prev, comment: e.target.value }
                  : { id: 0, path: e.target.value, comment:  e.target.value, messageId: 0 }
              )
            }
          />

          <TextField
            margin="dense"
            label="messageId"
            fullWidth
            variant="outlined"
            value={selectedIncidentFile?.messageId || ""}
            onChange={(e) =>
              setSelectedIncidentFile((prev) =>
                prev
                  ? { ...prev, comment: e.target.value }
                  : { id: 0, path: e.target.value, comment: e.target.value, messageId: 0 }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IncidentFilesTable;
