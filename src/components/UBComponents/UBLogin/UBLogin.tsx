import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UBLogo from "../../../../src/images/UB_Logo.png";
import { useNavigate } from "react-router-dom";
import { Container, CssBaseline, Box, Typography } from "@mui/material";
import {
    useLoginWithGoogleQuery,
    useHandleGoogleCallbackMutation,
} from "../../../../store/services/authAPI";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../../store/features/authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const UBLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [handleGoogleCallback] = useHandleGoogleCallbackMutation();
    const login = useLoginWithGoogleQuery();

    const handleGoogleLogin = () => {
        // Redirect to Google authentication page
        window.location.href = `${BACKEND_URL}/auth/google`;
    };

    useEffect(() => {
        // Define an async function to handle the login callback
        const handleLoginCallback = async () => {
            // Get the URL parameters from the current page
            const params = new URLSearchParams(window.location.search);
            // Check if there's a "code" parameter (this indicates Google authentication has returned a code)
            const code = params.get("code");
            console.log("--->", code)
            if (code) {
                // If the code exists, call the Google callback mutation with the code
                const result = await handleGoogleCallback(code);

                // If result contains data, extract the token and name
                if (result?.data) {
                    const { token, name } = result.data;

                    // Dispatch the token and Gmail name to the Redux store
                    dispatch(
                        setAuthData({
                            token,
                            name,
                            username: name, // Assuming you want to use 'name' as 'username'
                            loading: false,
                            error: null,
                        })
                    );

                    // Navigate to the home page after successful login
                    navigate("/");
                }
            } else {
                // If there's no code, redirect the user to start Google authentication
                handleGoogleLogin(); // Redirect immediately on page load
            }
        };

        // Call the async function defined above
        handleLoginCallback();
    }, [handleGoogleCallback, navigate, dispatch]);

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
                        <Typography component="h1" variant="h5">
                            Redirecting to Google Login...
                        </Typography>
                    </Box>
                </Container>
            </Box>
    );
};

export default UBLogin;
