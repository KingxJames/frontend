import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  IIncidentReport,
  setIncidentReportState,
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
import UBLogoWhite from "../../../images/UBLogoWhite.png";

export const IncidentReportForm: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);

    // Generate preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    // Automatically save in Redux state
    const incidentFiles = files.map((file) => ({
      incidentPicture: file.name,
      // Optionally, you can add displayURL: URL.createObjectURL(file)
    }));
    dispatch(setIncidentFiles(incidentFiles));
  };

  // Submit form and upload files
  const handleSubmit = async () => {
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

        dispatch(setIncidentFiles(uploadResponse.data));
      }

      // // 3. Then update/create incident report in DB
      // await createIncidentReport({
      //   ...incidentReports,
      //   formSubmitted: true,
      // }).unwrap();

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
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: "100px",
          bgcolor: "#6C3777;", // Purple
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src={UBLogoWhite}
          alt="UB Logo"
          style={{ height: "120%", marginRight: "10px" }}
        />

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Incident Report Form
        </Typography>
      </Box>

      {/* Form Body */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "900px",
            p: 4,
            borderRadius: "12px",
            backgroundColor: "#fff",
            border: "2px solid #C5A645", // Gold border
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
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <TextField label="Campus" fullWidth /> */}
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
                  {incidentTypes?.data?.incidentType.map(
                    (type: IIncidentType) => (
                      <MenuItem key={type.id} value={type.type}>
                        {type.type}
                      </MenuItem>
                    )
                  )}
                </Select>
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
              onClick={handleSubmit} // ⬅️ now triggers upload + DB update
            >
              Submit Report
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default IncidentReportForm;
