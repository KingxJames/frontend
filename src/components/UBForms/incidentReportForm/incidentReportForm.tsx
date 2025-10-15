import React, { useState } from "react";
import UBSidebar from "../../UBSidebar/UBSidebar";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIncidentReports,
  setDate,
  setTime,
  setIncidentReportStatus,
  setBuildingName,
  setCampus,
  setIncidentType,
  setDescription,
  setAction,
  setContact,
  setReportedBy,
  setWitnesses,
  setFormSubmitted,
  setIncidentFiles,
} from "../../../../store/features/incidentReportSlice";
import {
  selectIncidentStatus,
  IIncidentStatus,
} from "../../../../store/features/incidentStatusSlice";
import {
  selectBuildings,
  IBuilding,
} from "../../../../store/features/buildingSlice";
import { selectCampus, ICampus } from "../../../../store/features/campusSlice";
import {
  selectIncidentTypes,
  IIncidentType,
} from "../../../../store/features/incidentTypeSlice";
import { useFetchIncidentStatusesQuery } from "../../../../store/services/incidentStatusAPI";
import { useFetchBuildingsQuery } from "../../../../store/services/buildingsAPI";
import { useFetchCampusesQuery } from "../../../../store/services/campusAPI";
import { useFetchIncidentTypesQuery } from "../../../../store/services/incidentTypesAPI";
import {
  useUpdateIncidentReportMutation,
  useFetchIncidentReportQuery,
  useCreateIncidentReportMutation,
} from "../../../../store/services/incidentReportAPI";
import axios from "axios";
import { buildApiUrl } from "../../../../store/config/api";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { useAutosaveIncidentReport } from "../../../hooks/useAutoSaveIncidentReport";
import UBLogoWhite from "../../../images/UBLogoWhite.png";

export const IncidentReportForm: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: incidentReportData } = useFetchIncidentReportQuery({});
  const { data: incidentStatusData } = useFetchIncidentStatusesQuery();
  const { data: buildingsData } = useFetchBuildingsQuery();
  const { data: campusData } = useFetchCampusesQuery();
  const { data: incidentTypesData } = useFetchIncidentTypesQuery();
  const [updateIncidentReport] = useUpdateIncidentReportMutation();
  const [createIncidentReport] = useCreateIncidentReportMutation();

  const incidentReports = useSelector(selectIncidentReports);
  const id = incidentReports.id;
  useAutosaveIncidentReport();
  const incidentStatus = useSelector(selectIncidentStatus);
  const campus = useSelector(selectCampus);
  const buildings = useSelector(selectBuildings);
  const incidentTypes = useSelector(selectIncidentTypes);

  if (incidentStatus.length <= 1) {
    return null;
  }

  if (buildings.length <= 1) {
    return null;
  }

  if (campus.length <= 1) {
    return null;
  }

  if (incidentTypes.length <= 1) {
    return null;
  }

  const validateForm = () => {
    const requiredFields = [
      "action",
      "description",
      "caseNumber",
      "incidentReportStatus",
      "incidentType",
      "buildingName",
      "uploadedBy",
      "date",
      "time",
    ];

    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!incidentReports[field as keyof typeof incidentReports]) {
        newErrors[field] = true;
        missingFields.push(field);
      }
    });

    setErrors(newErrors);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required field${
          missingFields.length > 1 ? "s" : ""
        }: ${missingFields.join(", ")}`
      );
      return false;
    }
    return true;
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);

    // Generate preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    // Automatically save in Redux state
    const incidentFiles = files.map((file: any) => ({
      incidentPicture: file.name,
      previewURL: file.url,
      generated_name: file.name,
    }));
    dispatch(setIncidentFiles(incidentFiles));
  };

  // Submit form and upload files
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      // 1. Upload files if there are any
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        formData.append("incidentReportId", id);
        selectedFiles.forEach((file) => {
          formData.append("file[]", file);
        });

        const uploadResponse = await axios.post(
          buildApiUrl(`/publicSafety/uploadPhoto/${id}`),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setIncidentFiles(uploadResponse.data.files));
      }

      // 2. Update the incident report (not create a new one)
      await updateIncidentReport({
        ...incidentReports,
        formSubmitted: true,
        id: incidentReports.id, // Firestore document id
      }).unwrap();

      dispatch(setFormSubmitted(true));

      // 4. Navigate away
      navigate(`/forms`);
    } catch (error) {
      console.error("Failed to submit incident report:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      {/* Sidebar */}

      <UBSidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            height: "100px",
            background: "linear-gradient(90deg, #6C3777 0%, #8E44AD 100%)", // purple gradient
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
            position: "relative",
            top: 0,
            left: 0,
            zIndex: 1000,
            borderBottom: "4px solid #ffd900ad", // gold accent line
          }}
        >
          {/* Add a logo if you want */}
          <Box
            sx={{
              height: "60px",
              mr: 2,
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))",
            }}
          />
          {/* Back Button */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              left: "20px",
              color: "#fff",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)", // glowing text effect
              textTransform: "uppercase",
            }}
          >
            Incident Report Form
          </Typography>
        </Box>

        {/* Form Body */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            pt: "50px", // push content below header
            overflowY: "auto",
          }}
        >
          {/* Section: Details */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Incident Details - {incidentReports.caseNumber}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => dispatch(setDate(e.target.value))}
                value={incidentReports.date}
                error={!!errors["date"]}
                helperText={errors["date"] ? "Date is required" : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={incidentReports.time}
                onChange={(e) => dispatch(setTime(e.target.value))}
                error={!!errors["time"]}
                helperText={errors["time"] ? "Time is required" : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="building-location-label">
                  Building Name
                </InputLabel>
                <Select
                  labelId="building-location-label"
                  label="Building Location"
                  value={incidentReports.buildingName}
                  onChange={(e) => dispatch(setBuildingName(e.target.value))}
                >
                  {buildings?.data?.buildings?.map((building: IBuilding) => (
                    <MenuItem key={building.id} value={building.name}>
                      {building.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors["buildingName"] && (
                  <Typography color="error" variant="caption">
                    Building name is required
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="building-location-label">Campus</InputLabel>
                <Select
                  labelId="building-location-label"
                  label="Campus"
                  value={incidentReports.campus}
                  onChange={(e) => dispatch(setCampus(e.target.value))}
                >
                  {campus?.data?.campus?.map((campus: ICampus) => (
                    <MenuItem key={campus.id} value={campus.campus}>
                      {campus.campus}
                    </MenuItem>
                  ))}
                </Select>
                {errors["campus"] && (
                  <Typography color="error" variant="caption">
                    Campus is required
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="incident-type-label">Incident Type</InputLabel>
                <Select
                  labelId="incident-type-label"
                  label="Incident Type"
                  value={incidentReports.incidentType}
                  onChange={(e) => dispatch(setIncidentType(e.target.value))}
                >
                  {incidentTypes?.data?.incidentTypes.map(
                    (type: IIncidentType) => (
                      <MenuItem key={type.id} value={type.type}>
                        {type.type}
                      </MenuItem>
                    )
                  )}
                </Select>
                {errors["incidentType"] && (
                  <Typography color="error" variant="caption">
                    Incident type is required
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="incident-status-label">
                  Incident Status
                </InputLabel>
                <Select
                  labelId="incident-status-label"
                  label="Incident Status"
                  value={incidentReports.incidentReportStatus}
                  onChange={(e) =>
                    dispatch(setIncidentReportStatus(e.target.value))
                  }
                >
                  {incidentStatus.data?.map((status: IIncidentStatus) => (
                    <MenuItem key={status.id} value={status.incidentStatus}>
                      {status.incidentStatus}
                    </MenuItem>
                  ))}
                </Select>
                {errors["incidentReportStatus"] && (
                  <Typography color="error" variant="caption">
                    Incident status is required
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description of Incident"
                type="text"
                multiline
                rows={4}
                value={incidentReports.description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                fullWidth
                error={!!errors["description"]}
                helperText={errors["description"] ? "Description is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Action Taken"
                multiline
                rows={4}
                value={incidentReports.action}
                onChange={(e) => dispatch(setAction(e.target.value))}
                fullWidth
                error={!!errors["action"]}
                helperText={errors["action"] ? "Action is required" : ""}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                component="label"
                role={undefined}
                // tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: "#6C3777;",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#6d54a3ff",
                  },
                }}
              >
                Upload files
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            {/* Preview Section */}
            <Grid item xs={12}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>

          {/* Section: People Involved */}
          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 2,
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            People Involved
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Reported By"
                fullWidth
                value={incidentReports.reportedBy}
                onChange={(e) => dispatch(setReportedBy(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact"
                fullWidth
                value={incidentReports.contact}
                onChange={(e) => dispatch(setContact(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Witnesses"
                fullWidth
                value={incidentReports.witnesses}
                onChange={(e) => dispatch(setWitnesses(e.target.value))}
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6C3777;",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#6d54a3ff",
                },
              }}
              onClick={handleSubmit}
            >
              Submit Report
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default IncidentReportForm;
