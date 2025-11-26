import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { setGoogleAuthData } from "../../../store/features/authSlice";
import { setMenuState } from "../../../store/features/menuSlice";
import { API_HOST } from "../../../store/config/api";

interface User {
  id: string;
  name: string;
  email: string;
}

export const UBPrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const validateUserAccess = async () => {
      try {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const errorParam = urlParams.get("error");
        const tokenParam = urlParams.get("token");

        if (errorParam) {
          setIsUnauthorized(true);
          setIsLoading(false);
          return;
        }

        // Use token from URL or localStorage
        const token = tokenParam || localStorage.getItem("access_token");

        if (!token) {
          setIsUnauthorized(true);
          setIsLoading(false);
          return;
        }

        localStorage.setItem("access_token", token);

        // Clean URL query params
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        // Fetch user data from backend with Bearer token
        const response = await fetch(`${API_HOST}/api/v1/publicSafety/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setIsUnauthorized(true);
          } else {
            throw new Error(`Server error: ${response.status}`);
          }
          setIsLoading(false);
          return;
        }

        const userData = await response.json();

        if (!userData.user) {
          setIsUnauthorized(true);
          setIsLoading(false);
          return;
        }

        // Save user info in Redux
        dispatch(
          setGoogleAuthData({
            token,
            name: userData.user.name,
            email: userData.user.email,
          })
        );

        // Set menus if available
        if (userData.user.menus && userData.user.menus.length > 0) {
          dispatch(setMenuState(userData.user.menus));
          // Optional: navigate(userData.user.menus[0].path);
        }

        setUser(userData.user);
      } catch (error) {
        console.error("Token validation failed:", error);
        setUser(null);
        setIsUnauthorized(true);
      } finally {
        setIsLoading(false);
      }
    };

    validateUserAccess();
  }, [dispatch, navigate]);

  // Show spinner while loading
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#6C3777" }} />
      </Box>
    );
  }

  // Redirect if unauthorized
  if (isUnauthorized) {
    return <Navigate to="/login?unauthorized=true" replace />;
  }

  // Render protected route if user exists
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UBPrivateRoute;
