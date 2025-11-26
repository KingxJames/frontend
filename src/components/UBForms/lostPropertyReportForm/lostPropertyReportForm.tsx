
import React, { useEffect, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
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
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLostPropertyFiles,
  ILostPropertyFile,
  selectLostProperty,
  setLostPropertyFiles,
  setComplainantName,
  setComplainantAddress,
  setComplainantDOB,
  setComplainantTelephone,
  setComplainantID,
  setComplainantEmail,
  setDateLost,
  setTimeLost,
  setComplainantAffiliation,
  setAdditionalDescription,
  setOwner,
  setOwnerSignature,
  setDateReported,
  setDateReturnedToOwner,
  setTimeReturnedToOwner,
  setOwnerName,
  setOwnerAddress,
  setOwnerDOB,
  setOwnerID,
  setOwnerEmail,
  setOwnerTelephone,
  setRemarks,
  setSignatureDPS,
  setReturnedToOwnerSignature,
  setUploadedBy,
  setFormSubmitted,
} from "../../../../store/features/lostPropertySlice";
import {
  useUpdateLostPropertyMutation,
  useFetchLostPropertyQuery,
  useCreateLostPropertyMutation,
} from "../../../../store/services/lostPropertyAPI";
import { useFetchCampusesQuery } from "../../../../store/services/campusAPI";
import { buildApiUrl } from "../../../../store/config/api";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { useAutosaveLostProperty } from "../../../hooks/useAutoSave";
import {
  loadOwnerSignature,
  loadSignatureDPS,
  loadReturnedToOwnerSignature,
  getImages,
} from "../../../hooks/lostProperty/fetchUseEffects";

export const LostPropertyReportForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: lostPropertyData } = useFetchLostPropertyQuery({});
  const [createLostProperty] = useCreateLostPropertyMutation();
  const [updateLostProperty] = useUpdateLostPropertyMutation();

  const lostProperty = useSelector(selectLostProperty);
  const id = lostProperty.id;

  //Autosave
  useAutosaveLostProperty();

  //fetch images from server
  const imageUrls = getImages();

  //Fetch Signatures from server and load canvases
  const ownerSigRef = loadOwnerSignature();
  const signatureDPSRef = loadSignatureDPS();
  const returnedSigRef = loadReturnedToOwnerSignature();
  const clearReturnedToOwnerSignature = () => {
    returnedSigRef.current.clear();
  };
  const clearSignatureDPS = () => {
    signatureDPSRef.current.clear();
  };
  const clearOwnerSignature = () => {
    ownerSigRef.current.clear();
  };

  const saveReturnedToOwnerSignature = async () => {
    const dataURL = returnedSigRef.current.toDataURL();

    try {
      const response = await fetch(
        buildApiUrl(`/publicSafety/uploadSignatureCanvas/${id}`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ signature: dataURL }),
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("Signature saved:", result);

      const fileData = result.data;

      // Must save as an array like incidentFiles
      dispatch(
        setReturnedToOwnerSignature([
          {
            generated_name: fileData.generated_name,
            url: fileData.url,
          },
        ])
      );
    } catch (error) {
      console.error("Canvas signature upload error:", error);
    }
  };

  const saveSignatureDPS = async () => {
    const dataURL = signatureDPSRef.current.toDataURL();
    try {
      const response = await fetch(
        buildApiUrl(`/publicSafety/uploadSignatureCanvas/${id}`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ signature: dataURL }),
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("Signature saved:", result);

      const fileData = result.data;

      // Must save as an array like incidentFiles
      dispatch(
        setSignatureDPS([
          {
            generated_name: fileData.generated_name,
            url: fileData.url,
          },
        ])
      );
    } catch (error) {
      console.error("Canvas signature upload error:", error);
    }
  };

  const saveOwnerSignature = async () => {
    const dataURL = ownerSigRef.current.toDataURL();
    try {
      const response = await fetch(
        buildApiUrl(`/publicSafety/uploadSignatureCanvas/${id}`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ signature: dataURL }),
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("Signature saved:", result);

      const fileData = result.data;

      // Must save as an array like incidentFiles
      dispatch(
        setOwnerSignature([
          {
            generated_name: fileData.generated_name,
            url: fileData.url,
          },
        ])
      );
    } catch (error) {
      console.error("Canvas signature upload error:", error);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "complainantName",
      "complainantAddress",
      "complainantDOB",
      "complainantTelephone",
      "complainantID",
      "complainantEmail",
      "dateLost",
      "timeLost",
      "complainantAffiliation",
      "owner",
      "dateReported",
      "dateReturnedToOwner",
      "timeReturnedToOwner",
      "ownerName",
      "ownerAddress",
      "ownerDOB",
      "ownerID",
      "ownerEmail",
      "ownerTelephone",
      "signatureDPS",
      "returnedToOwnerSignature",
      "uploadedBy",
    ];

    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!lostProperty[field as keyof typeof lostProperty]) {
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
    if (!files.length) return;

    // Save selected files locally
    setSelectedFiles(files);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("file[]", file));

      const response = await fetch(
        buildApiUrl(`/publicSafety/uploadPublicSafetyPhoto/${id}`),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      {
        console.log(`Bearer ${token}`);
      }
      if (!response.ok)
        throw new Error(`Upload failed: ${response.statusText}`);

      const result = await response.json();
      console.log("Upload result:", result);

      // Normalize response data
      const uploadedFiles = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
        ? result.data
        : [];

      const newImages = uploadedFiles
        .filter((file: ILostPropertyFile) => file.generated_name)
        .map((file: ILostPropertyFile) => ({
          url: `app/private/uploads/photos/${file.generated_name}`,
          generated_name: file.generated_name,
        }));

      if (newImages.length) {
        dispatch(
          setLostPropertyFiles([
            ...(lostProperty.lostPropertyFiles || []),
            ...newImages,
          ])
        );
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      // 2. Update the incident report (not create a new one)
      await updateLostProperty({
        ...lostProperty,
        formSubmitted: true,
        id: lostProperty.id, // Firestore document id
      }).unwrap();

      dispatch(setFormSubmitted(true));

      // 4. Navigate away
      navigate(`/forms`);
    } catch (error) {
      console.error("Failed to submit incident report:", error);
    }
  };

  return (
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
          Lost Property Report Form
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Complainant Name"
              fullWidth
              value={lostProperty.complainantName}
              onChange={(e) => dispatch(setComplainantName(e.target.value))}
              error={!!errors["complainantName"]}
              helperText={errors["complainantName"] ? "Name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Complainant Address"
              fullWidth
              value={lostProperty.complainantAddress}
              onChange={(e) => dispatch(setComplainantAddress(e.target.value))}
              error={!!errors["complainantAddress"]}
              helperText={
                errors["complainantAddress"] ? "Address is required" : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Complainant DOB"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostProperty.complainantDOB}
              onChange={(e) => dispatch(setComplainantDOB(e.target.value))}
              error={!!errors["complainantDOB"]}
              helperText={
                errors["complainantDOB"] ? "Complainant DOB is required" : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Complainant Telephone"
              fullWidth
              value={lostProperty.complainantTelephone}
              onChange={(e) =>
                dispatch(setComplainantTelephone(e.target.value))
              }
              error={!!errors["complainantTelephone"]}
              helperText={
                errors["complainantTelephone"] ? "Telephone is required" : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Complainant ID"
              fullWidth
              value={lostProperty.complainantID}
              onChange={(e) => dispatch(setComplainantID(e.target.value))}
              error={!!errors["complainantID"]}
              helperText={errors["complainantID"] ? "ID is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Complainant Email"
              fullWidth
              value={lostProperty.complainantEmail}
              onChange={(e) => dispatch(setComplainantEmail(e.target.value))}
              error={!!errors["complainantEmail"]}
              helperText={errors["complainantEmail"] ? "Email is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date Lost"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostProperty.dateLost}
              onChange={(e) => dispatch(setDateLost(e.target.value))}
              error={!!errors["dateLost"]}
              helperText={errors["dateLost"] ? "Date lost is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Time Lost"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostProperty.timeLost}
              onChange={(e) => dispatch(setTimeLost(e.target.value))}
              error={!!errors["timeLost"]}
              helperText={errors["timeLost"] ? "Time lost is required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">
                Comlainant Affiliation
              </FormLabel>
              <RadioGroup
                row
                value={lostProperty.complainantAffiliation}
                onChange={(e) =>
                  dispatch(setComplainantAffiliation(e.target.value))
                }
              >
                <FormControlLabel
                  value="Employee"
                  control={<Radio />}
                  label="Employee"
                />
                <FormControlLabel
                  value="Student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="Patient"
                  control={<Radio />}
                  label="Patient"
                />
                <FormControlLabel
                  value="Visitor Resident"
                  control={<Radio />}
                  label="Visitor Resident"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {errors["complainantAffiliation"] && (
                <Typography color="error" variant="caption">
                  Comlainant affiliation is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                bgcolor: "#6C3777",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#6d54a3",
                },
              }}
            >
              Upload Files
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
              {lostProperty.lostPropertyFiles?.map((file, index) => {
                const blobUrl = imageUrls[file.generated_name];

                return blobUrl ? (
                  <img
                    key={index}
                    src={blobUrl}
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
                      (e.currentTarget.style.transform = "scale(1.05)")
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
              })}
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Additional Description"
              type="text"
              multiline
              rows={4}
              fullWidth
              value={lostProperty.additionalDescription}
              onChange={(e) =>
                dispatch(setAdditionalDescription(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Owner Name(Print)"
              fullWidth
              value={lostProperty.owner}
              onChange={(e) => dispatch(setOwner(e.target.value))}
              error={!!errors["owner"]}
              helperText={errors["owner"] ? "Owner is required" : ""}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // centers the content horizontally
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 500, alignSelf: "flex-start" }}
              >
                Owner Signature
              </Typography>

              <SignatureCanvas
                ref={ownerSigRef}
                penColor="black"
                canvasProps={{
                  width: 300,
                  height: 150,
                  className: "sigCanvas",
                  style: {
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  },
                }}
              />

              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearOwnerSignature}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={saveOwnerSignature}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Date Reported"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={lostProperty.dateReported}
              onChange={(e) => dispatch(setDateReported(e.target.value))}
              error={!!errors["dateReported"]}
              helperText={
                errors["dateReported"] ? "Date reported is required" : ""
              }
            />
          </Grid>

          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 4,
              width: "100%",
              color: "#5E4B8B",
              fontWeight: "bold",
              borderBottom: "2px solid #C5A645",
              pb: 1,
            }}
          >
            Disposition Return Of Recovered Item To Owner
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date Returned to Owner"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={lostProperty.dateReturnedToOwner}
                onChange={(e) =>
                  dispatch(setDateReturnedToOwner(e.target.value))
                }
                error={!!errors["dateReturnedToOwner"]}
                helperText={
                  errors["dateReturnedToOwner"]
                    ? "Date returned is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time Returned to Owner"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={lostProperty.timeReturnedToOwner}
                onChange={(e) =>
                  dispatch(setTimeReturnedToOwner(e.target.value))
                }
                error={!!errors["timeReturnedToOwner"]}
                helperText={
                  errors["timeReturnedToOwner"]
                    ? "Time returned is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Owner Name"
                fullWidth
                value={lostProperty.ownerName}
                onChange={(e) => dispatch(setOwnerName(e.target.value))}
                error={!!errors["ownerName"]}
                helperText={errors["ownerName"] ? "Owner Name is required" : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Owner DOB"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={lostProperty.ownerDOB}
                onChange={(e) => dispatch(setOwnerDOB(e.target.value))}
                error={!!errors["ownerDOB"]}
                helperText={errors["ownerDOB"] ? "Owner DOB is required" : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Owner Address"
                fullWidth
                value={lostProperty.ownerAddress}
                onChange={(e) => dispatch(setOwnerAddress(e.target.value))}
                error={!!errors["ownerAddress"]}
                helperText={
                  errors["ownerAddress"] ? "Owner Address is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Owner ID Number"
                fullWidth
                value={lostProperty.ownerID}
                onChange={(e) => dispatch(setOwnerID(e.target.value))}
                error={!!errors["ownerID"]}
                helperText={errors["ownerID"] ? "Owner ID is required" : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Owner Email"
                fullWidth
                value={lostProperty.ownerEmail}
                onChange={(e) => dispatch(setOwnerEmail(e.target.value))}
                error={!!errors["ownerEmail"]}
                helperText={
                  errors["ownerEmail"] ? "Owner Email is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Owner Telephone"
                fullWidth
                value={lostProperty.ownerTelephone}
                onChange={(e) => dispatch(setOwnerTelephone(e.target.value))}
                error={!!errors["ownerTelephone"]}
                helperText={
                  errors["ownerTelephone"] ? "Owner Telephone is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                type="text"
                multiline
                rows={4}
                fullWidth
                value={lostProperty.remarks}
                onChange={(e) => dispatch(setRemarks(e.target.value))}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Signature DPS</label>
              <SignatureCanvas
                ref={signatureDPSRef}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 150,
                  className: "sigCanvas",
                  style: { border: "1px solid #ccc", borderRadius: "8px" },
                }}
              />
              <div style={{ marginTop: 8 }}>
                <Button size="small" onClick={clearSignatureDPS}>
                  Clear
                </Button>
                <Button size="small" onClick={saveSignatureDPS}>
                  Save
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Owner Signature</label>
              <SignatureCanvas
                ref={returnedSigRef}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 150,
                  className: "sigCanvas",
                  style: { border: "1px solid #ccc", borderRadius: "8px" },
                }}
              />
              <div style={{ marginTop: 8 }}>
                <Button size="small" onClick={clearReturnedToOwnerSignature}>
                  Clear
                </Button>
                <Button size="small" onClick={saveReturnedToOwnerSignature}>
                  Save
                </Button>
              </div>
            </Grid>
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
  );
};

export default LostPropertyReportForm;
