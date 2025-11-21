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
  Typography,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchIncidentReportQuery,
  useGenerateIncidentReportPdfMutation,
} from "../../../store/services/incidentReportAPI";
import {
  IncidentReportInitialState,
  setIncidentReportState,
  IIncidentFile,
} from "../../../store/features/incidentReportSlice";
import { buildApiUrl } from "../../../store/config/api";
import { RootState } from "../../../store/store";

export const IncidentReportTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data: incidentReportData } = useFetchIncidentReportQuery({});
  const [generateIncidentReportPdf] = useGenerateIncidentReportPdfMutation();

  const paginationModel = { page: 0, pageSize: 5 };
  const [search] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImages, setPreviewImages] = useState<Record<string, string>>(
    {}
  );

  const [selectedIncidentReport, setSelectedIncidentReport] = useState<{
    id: string;
    action: string;
    description: string;
    caseNumber: string;
    incidentReportStatus: string;
    incidentType: string;
    incidentFiles: IIncidentFile[];
    buildingName: string;
    campus: string;
    uploadedBy: string;
    date: string;
    time: string | null;
    reportedBy: string;
    contact: string;
    witnesses: string;
  } | null>(null);

  useEffect(() => {
    if (incidentReportData) {
      dispatch(setIncidentReportState(incidentReportData?.data));
    }
  }, [incidentReportData, dispatch]);

  const token = useSelector((state: RootState) => state.auth.token);

  const filteredIncidentReports = (incidentReportData?.data || []).filter(
    (report: IncidentReportInitialState) =>
      report.description?.toLowerCase().includes(search.toLowerCase()) ||
      report.caseNumber?.toLowerCase().includes(search.toLowerCase())
  );

  //handle download report pdf
  const handleDownloadReportPDF = async (id: string) => {
    try {
      const response = await generateIncidentReportPdf(id);
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `incident_report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download report PDF:", error);
    }
  };

  const handlePreview = async (incidentReport: IncidentReportInitialState) => {
    setSelectedIncidentReport(incidentReport);
    setOpenPreview(true);

    const urls: Record<string, string> = {};

    for (const file of incidentReport.incidentFiles) {
      try {
        const response = await fetch(
          buildApiUrl(`publicSafety/getFile/photos/${file.generated_name}`),
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          urls[file.generated_name] = blobUrl;
        }
      } catch (err) {
        console.error("Error loading image:", err);
      }
    }
    setPreviewImages(urls);
  };

  const columns: GridColDef[] = [
    { field: "caseNumber", headerName: "Case Number", flex: 1.2 },
    { field: "incidentType", headerName: "Incident Type", flex: 1.2 },
    { field: "incidentReportStatus", headerName: "Incident Status", flex: 0.8 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    { field: "reportedBy", headerName: "Reported By", flex: 1 },
    { field: "date", headerName: "Date of Incident", flex: 1.2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as {
          id: string;
          action: string;
          description: string;
          caseNumber: string;
          incidentReportStatus: string;
          incidentType: string;
          incidentFiles: IIncidentFile[];
          buildingName: string;
          campus: string;
          uploadedBy: string;
          date: string;
          time: string | null;
          reportedBy: string;
          contact: string;
          witnesses: string;
          formSubmitted: boolean;
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
        rows={filteredIncidentReports}
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
          Incident Report Preview - {selectedIncidentReport?.caseNumber ?? ""}
        </DialogTitle>
        <DialogContent>
          {selectedIncidentReport && (
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
              <Grid container spacing={2} sx={{ p: "2%" }}>
                {/* Date */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    fullWidth
                    value={selectedIncidentReport.date}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    fullWidth
                    value={selectedIncidentReport.time ?? ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Building Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Building Name"
                    fullWidth
                    value={selectedIncidentReport.buildingName}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Campus */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Campus"
                    fullWidth
                    value={selectedIncidentReport.campus}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Incident Type */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Incident Type"
                    fullWidth
                    value={selectedIncidentReport.incidentType}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Status"
                    fullWidth
                    value={selectedIncidentReport.incidentReportStatus}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    label="Description of Incident"
                    fullWidth
                    multiline
                    rows={4}
                    value={selectedIncidentReport.description}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Action Taken */}
                <Grid item xs={12}>
                  <TextField
                    label="Action Taken"
                    fullWidth
                    multiline
                    rows={3}
                    value={selectedIncidentReport.action}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Box sx={{ width: "100%", pl: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      mb: 1,
                      fontWeight: "bold",
                      color: "#5E4B8B",
                      borderBottom: "2px solid #C5A645",
                      width: "100%",
                      pb: 1,
                    }}
                  >
                    Incident Files
                  </Typography>

                  {/* Preview Section */}
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      {selectedIncidentReport?.incidentFiles?.length ? (
                        selectedIncidentReport.incidentFiles.map(
                          (file, index) => {
                            const blobUrl = file.generated_name;

                            return blobUrl ? (
                              <img
                                key={index}
                                src={previewImages[file.generated_name]}
                                alt={file.original_name}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  border: "1px solid #ccc",
                                  transition: "transform 0.2s ease",
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.transform =
                                    "scale(1.05)")
                                }
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                              />
                            ) : (
                              <div
                                key={index}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  backgroundColor: "#eee",
                                  borderRadius: "8px",
                                }}
                              />
                            );
                          }
                        )
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No photos available for this report.
                        </Typography>
                      )}
                    </div>
                  </Grid>
                </Box>

                <Box sx={{ width: "100%", pl: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      mb: 1,
                      fontWeight: "bold",
                      color: "#5E4B8B",
                      borderBottom: "2px solid #C5A645",
                      width: "100%",
                      pb: 1,
                    }}
                  >
                    People Involved
                  </Typography>
                </Box>

                {/* Reported By */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Reported By"
                    fullWidth
                    value={selectedIncidentReport.reportedBy}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Contact */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contact"
                    fullWidth
                    value={selectedIncidentReport.contact}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Witnesses */}
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Witnesses"
                    fullWidth
                    value={selectedIncidentReport.witnesses}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Uploaded By */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Uploaded By"
                    fullWidth
                    value={selectedIncidentReport.uploadedBy}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
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
