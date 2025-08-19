import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenuState } from "../../../store/features/menuSlice";
import { IMenu } from "../../../store/features/menuSlice";
import UBLogo from "../../images/UBLogoWhite.png";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const menuItems = useSelector(selectMenuState);

  const handleGoHome = () => {
    // Navigate to first available menu or dashboard
    if (menuItems.length > 0) {
      const firstMenu = menuItems.find((item: IMenu) => item.is_active);
      if (firstMenu?.path) {
        navigate(firstMenu.path);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 2,
            padding: 4,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 3 }}>
            <img
              src={UBLogo}
              alt="UB Logo"
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "20px",
              }}
            />
          </Box>

          {/* 404 Number */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", sm: "8rem" },
              fontWeight: "bold",
              color: "#6C3777",
              lineHeight: 1,
              mb: 2,
            }}
          >
            404
          </Typography>

          {/* Error Message */}
          <Typography
            variant="h4"
            sx={{
              color: "#333",
              mb: 2,
              fontWeight: 500,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            The page you're looking for doesn't exist or has been moved. Please
            check the URL or use the navigation below.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              onClick={handleGoHome}
              sx={{
                backgroundColor: "#6C3777",
                "&:hover": {
                  backgroundColor: "#5a2f63",
                },
                px: 3,
                py: 1.5,
              }}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              onClick={handleGoBack}
              sx={{
                borderColor: "#6C3777",
                color: "#6C3777",
                "&:hover": {
                  borderColor: "#5a2f63",
                  backgroundColor: "rgba(108, 55, 119, 0.04)",
                },
                px: 3,
                py: 1.5,
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Additional Help */}
          <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #eee" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#888",
                fontSize: "0.875rem",
              }}
            >
              If you believe this is an error, please contact the system
              administrator.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
