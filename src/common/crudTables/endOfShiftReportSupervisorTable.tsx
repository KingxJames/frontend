import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch } from "react-redux";
import {
  useFetchEndOfShiftReportSupervisorQuery,
  useGenerateEndOfShiftReportSupervisorPdfMutation,
} from "../../../store/services/endOfShiftReportSupervisorAPI";
import { setEndOfShiftReportSupervisor } from "../../../store/features/endOfShiftReportSupervisorSlice";

export const EndOfShiftReportSupervisorTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: endOfShiftReportSupervisorData } =
    useFetchEndOfShiftReportSupervisorQuery({});
  const [generateEndOfShiftReportSupervisorPdf] =
    useGenerateEndOfShiftReportSupervisorPdfMutation();

  const paginationModel = { page: 0, pageSize: 10 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  const [
    selectedEndOfShiftReportSupervisor,
    setSelectedEndOfShiftReportSupervisor,
  ] = useState<{
    id: string;
    date: string;
    time: string;
    campus: string;
    report: string;
    uploadedBy: string;
  } | null>(null);

  useEffect(() => {
    if (endOfShiftReportSupervisorData) {
      dispatch(
        setEndOfShiftReportSupervisor(endOfShiftReportSupervisorData?.data)
      );
    }
  }, [endOfShiftReportSupervisorData, dispatch]);

  console.log(endOfShiftReportSupervisorData);

  const filteredEndOfShiftReportSupervisors = (
    endOfShiftReportSupervisorData?.data || []
  ).filter((report) => report.id?.toLowerCase().includes(search.toLowerCase()));

  //handle download report pdf
  const handleDownloadReportPDF = async (id: string) => {
    try {
      const response = await generateEndOfShiftReportSupervisorPdf(id);
      console.log("sdfgsdf", response);
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `endOfShiftReportSupervisor_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  const handlePreview = (endOfShiftReportSupervisor: any) => {
    setSelectedEndOfShiftReportSupervisor(endOfShiftReportSupervisor); // store the report to preview
    setOpenPreview(true); // open the dialog
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "campus", headerName: "Campus", flex: 1 },
    { field: "report", headerName: "Report", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          date: string;
          time: string;
          campus: string;
          report: string;
          uploadedBy: string;
        };
        return (
          <Box>
            <IconButton onClick={() => handlePreview(row)} color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDownloadReportPDF(row.id)}
              color="secondary"
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: "3%", height: "80vh", width: "100%" }}>
      <DataGrid
        rows={filteredEndOfShiftReportSupervisors}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        disableRowSelectionOnClick
      />

      {/* preview for incident report */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            mb: 2,
            color: "#5E4B8B",
            fontWeight: "bold",
            borderBottom: "2px solid #C5A645",
            pb: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            width: "90%",
            margin: "auto",
          }}
        >
          End of Shift Report Supervisor Preview{" "}
        </DialogTitle>
        <DialogContent>
          {selectedEndOfShiftReportSupervisor && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    fullWidth
                    value={selectedEndOfShiftReportSupervisor.date}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    fullWidth
                    value={selectedEndOfShiftReportSupervisor.time}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Campus */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Campus"
                    fullWidth
                    value={selectedEndOfShiftReportSupervisor.campus}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Uploaded By"
                    fullWidth
                    value={selectedEndOfShiftReportSupervisor.uploadedBy}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Report */}
                <Grid item xs={12}>
                  <TextField
                    label="Report"
                    fullWidth
                    multiline
                    rows={4}
                    value={selectedEndOfShiftReportSupervisor.report}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Uploaded By */}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenPreview(false)}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EndOfShiftReportSupervisorTable;