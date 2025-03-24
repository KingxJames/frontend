import React, { useState } from "react";
import UBLogo from "../../../../src/images/UB_Logo.png";
import {
  Container,
  CssBaseline,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { setAuthData } from "../../../../store/features/authSlice";
import { useLoginMutation } from "../../../../store/services/authAPI";
import { useNavigate } from "react-router-dom";

export const UBLogin: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const [warning, setWarning] = useState<string | null>(null); // State for warning message
  const navigate = useNavigate();

  const handleLogin = async () => {
    setWarning(null); // Clear warning on each login attempt

    if (!username || !password) {
      setWarning("Username and Password are required.");
      return;
    }

    try {
      const response = await login({ username, password }).unwrap();
      console.log("Login successful:", response);

      // Dispatch data to the Redux store
      dispatch(setAuthData(response));
      navigate("/"); // Navigate to the next page
    } catch (err) {
      console.error("Login failed:", err);
      setWarning("Invalid username or password."); // Display a warning if login fails
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#6C3777",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "5%",
          padding: "3%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <img
              src={UBLogo}
              alt="UB Logo"
              style={{
                width: "100%",
                height: "70%",
                transition: "width 0.3s, height 0.3s",
              }}
            />
          </Box>

          <TextField
            sx={{ mb: 2, mt: "-7%", width: "100%" }}
            id="outlined-textarea"
            label="Username"
            placeholder=""
            multiline
            value={username}
            onChange={(e) =>
              dispatch(setAuthData({ username: e.target.value }))
            }
          />

          <TextField
            sx={{ mb: 2, width: "100%" }}
            id="password"
            label="Password"
            placeholder=""
            type="password"
            multiline={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {warning && (
            <Typography
              sx={{
                color: "red",
                mb: 2,
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {warning}
            </Typography>
          )}

          <Button
            onClick={handleLogin}
            sx={{
              width: "50%",
              backgroundColor: "#6C3777",
              color: "white",
              borderRadius: "20px",
              mb: "-5%",
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UBLogin;
