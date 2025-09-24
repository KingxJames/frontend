import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { validateToken } from "../../../store/services/authAPI";
import { setGoogleAuthData } from "../../../store/features/authSlice";
import { setMenuState } from "../../../store/features/menuSlice";

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
        // Check for error parameter in URL first
        const urlParams = new URLSearchParams(window.location.search);
        const errorParam = urlParams.get("error");
        const tokenParam = urlParams.get("token");

        if (errorParam) {
          setIsUnauthorized(true);
          setIsLoading(false);
          return;
        }

        // Get token from URL or localStorage
        let token = tokenParam || localStorage.getItem("access_token");

        if (token) {
          localStorage.setItem("access_token", token);
          // Clean URL by removing query parameters
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        // Validate token with backend
        const userData = await validateToken();
        dispatch(
          setGoogleAuthData({
            token,
            name: userData.user.name,
            email: userData.user.email,
          })
        );

        // console.log("--->", userData.user.name);

        // Set menu from userData
        if (userData.user.menus && userData.user.menus.length) {
          dispatch(setMenuState(userData.user.menus));
          // navigate(userData.user.menus[0].path);
          // redirect here
        }

        setUser(userData);
      } catch (error: any) {
        console.error("Token validation failed:", error);

        // Check for 401 Unauthorized status
        const isUnauthorizedError =
          error?.status === 401 || error?.response?.status === 401;

        if (isUnauthorizedError) {
          setIsUnauthorized(true);
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateUserAccess();
  }, []);

  // Show loading spinner while validating
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
        <CircularProgress
          size={60}
          sx={{
            color: "#6C3777",
          }}
        />
      </Box>
    );
  }

  // Redirect to login with unauthorized flag if user is not authorized
  if (isUnauthorized) {
    return <Navigate to="/login?unauthorized=true" replace />;
  }

  // Redirect to login if no user data, otherwise render protected content
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UBPrivateRoute;
