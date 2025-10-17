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
  useFetchEndOfShiftReportPatrolQuery,
  useGenerateEndOfShiftReportPatrolPdfMutation,
} from "../../../store/services/endOfShiftReportPatrolAPI";
import { setEndOfShiftReportPatrol } from "../../../store/features/endOfShiftReportPatrolSlice";

export const EndOfShiftReportPatrolTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: endOfShiftReportPatrolData } =
    useFetchEndOfShiftReportPatrolQuery({});
  const [generateEndOfShiftReportPatrolPdf] =
    useGenerateEndOfShiftReportPatrolPdfMutation();

  const paginationModel = { page: 0, pageSize: 5 };
  const [search, setSearch] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  const [selectedEndOfShiftReportPatrol, setSelectedEndOfShiftReportPatrol] =
    useState<{
      id: string;
      date: string;
      time: string;
      campus: string;
      report: string;
      uploadedBy: string;
    } | null>(null);

  useEffect(() => {
    if (endOfShiftReportPatrolData) {
      dispatch(setEndOfShiftReportPatrol(endOfShiftReportPatrolData?.data));
    }
  }, [endOfShiftReportPatrolData, dispatch]);

  console.log(endOfShiftReportPatrolData);

  const filteredEndOfShiftReportPatrols = (
    endOfShiftReportPatrolData?.data || []
  ).filter((report) => report.id?.toLowerCase().includes(search.toLowerCase()));

  //handle download report pdf
  const handleDownloadReportPDF = async (id: string) => {
    try {
      const response = await generateEndOfShiftReportPatrolPdf(id);
      console.log("sdfgsdf", response);
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `endOfShiftReportPatrol_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  const handlePreview = (endOfShiftReportPatrol: any) => {
    setSelectedEndOfShiftReportPatrol(endOfShiftReportPatrol); // store the report to preview
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
        rows={filteredEndOfShiftReportPatrols}
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
          End of Shift Report Patrol Preview{" "}
        </DialogTitle>
        <DialogContent>
          {selectedEndOfShiftReportPatrol && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    fullWidth
                    value={selectedEndOfShiftReportPatrol.date}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    fullWidth
                    value={selectedEndOfShiftReportPatrol.time}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Campus */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Campus"
                    fullWidth
                    value={selectedEndOfShiftReportPatrol.campus}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Uploaded By"
                    fullWidth
                    value={selectedEndOfShiftReportPatrol.uploadedBy}
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
                    value={selectedEndOfShiftReportPatrol.report}
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
