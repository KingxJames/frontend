import React from "react";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import UBBreadcrumb from "../../../common/UBBreadcrumbs/UBBreadcrumbs";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InputBox from "../../../common/inputBox/inputBox";
// import {
//   selectUser,
//   selectPhoneNumber,
//   setPhoneNumber,
//   setPersonalEmail,
// } from "../../../../store/features/authSlice";

export const UBSettings: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(selectUser);
  // const phoneNumber = useSelector(selectPhoneNumber);

  return (
    <>
      <UBBreadcrumb pageName="Settings" />
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #E0E0E0",
          borderRadius: "5px",
          height: "95vh", // Fixed height
          width: "90vh", // Fixed width
          padding: "2%",
          margin: "auto",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Profile Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #ccc",
            width: "100%", // Ensures it fits inside the parent
            boxSizing: "border-box",
            padding: "1% 0 2% 0",
          }}
        >
          <img
            src=""
            alt=""
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />

          {/* Buttons aligned to the right */}
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              gap: 1,
            }}
          >
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
            display: "flex",
            flexDirection: "column",
            gap: "10px", // Adds space between inputs
            paddingTop: "10px", // Prevents input from touching the border
            width: "100%", // Ensures inputs fit within the box
          }}
        >
          <InputBox label="Name" icon={PermIdentityIcon} type="text" text="" />
          <InputBox
            label="Email Address"
            icon={EmailIcon}
            type="text"
            text=""
          />
          <InputBox
            label="Phone Number"
            icon={LocalPhoneIcon}
            type="text"
            text=""
          />
          <InputBox label="Work Email" icon={EmailIcon} type="text" text="" />
          <InputBox
            label="Organization"
            icon={CorporateFareIcon}
            type="text"
            text=""
          />
          <InputBox
            label="Role"
            icon={CompassCalibrationIcon}
            type="text"
            text=""
          />
        </Box>
      </Box>
    </>
  );
};

export default UBSettings;
