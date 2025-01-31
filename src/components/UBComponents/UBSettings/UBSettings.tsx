import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InputBox from "../../../common/inputBox/inputBox";
import UBBreadcrumb from "../../../common/UBBreadcrumbs/UBBreadcrumbs";
import { selectName } from "../../../../store/features/authSlice";

export const UBSettings: React.FC = () => {
  const navigate = useNavigate();
  const name = useSelector(selectName);
  // const email = useSelector(selectEmail);

  return (
    <>
      <Box sx={{ padding: "2% 2% 0 2%" }}>
        <UBBreadcrumb pageName="Settings" />
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          maxWidth: "90vw", // Responsive width
          width: "50%",
          padding: "2%",
          marginLeft: "2%",
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Personal Information
        </Typography>

        {/* Profile Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #ccc",
            padding: "10px 0",
            gap: "10px",
          }}
        >
          <img
            src=""
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />

          {/* Buttons aligned to the right */}
          <Box sx={{ display: "flex", marginLeft: "auto", gap: 1 }}>
            <Button
              sx={{ border: "1px solid black", width: "40px", height: "40px" }}
            >
              <DeleteIcon />
            </Button>
            <Button>
              <FileUploadIcon /> Upload
            </Button>
          </Box>
        </Box>

        {/* Input Fields */}
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <InputBox
                label="Name"
                icon={PermIdentityIcon}
                type="text"
                text={name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputBox
                label="Email Address"
                icon={EmailIcon}
                type="text"
                text=""
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputBox
                label="Phone Number"
                icon={LocalPhoneIcon}
                type="text"
                text=""
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputBox
                label="Work Email"
                icon={EmailIcon}
                type="text"
                text=""
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputBox
                label="Organization"
                icon={CorporateFareIcon}
                type="text"
                text=""
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputBox
                label="Role"
                icon={CompassCalibrationIcon}
                type="text"
                text=""
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UBSettings;
