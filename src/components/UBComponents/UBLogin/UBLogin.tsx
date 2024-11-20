import React from 'react';
import UBLogo from "../../../../src/images/UB_Logo.png";
import { Container, CssBaseline, Box, Typography } from "@mui/material";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { setUser, selectUser, setToken } from "../../../../store/features/authSlice";
import { useNavigate } from 'react-router-dom';

export const UBLogin: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser); // Get the user data from the Redux store
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle the Google OAuth credential response
    const responseMessage = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            console.log('Google ID Token:', credentialResponse.credential);

            try {
                // Verify and get the profile data using the ID Token
                const response = await axios.get(
                    `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
                );

                const profileData = response.data;
                console.log('Profile Data:', profileData);

                const emailDomain = profileData.email.split('@')[1];
                if (emailDomain !== 'ub.edu.bz') {
                    console.error('Unauthorized domain');
                    alert('Only emails from the "ub.edu.bz" domain are allowed.');
                    return;
                }

                dispatch(
                    setUser({
                        name: profileData.name,
                        email: profileData.email,
                        picture: profileData.picture,
                    })
                );

                dispatch(setToken(credentialResponse.credential));

                // Redirect to the index page after successful login
                navigate('/'); // Adjust this path to your index route

            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        } else {
            console.error('No credential received');
        }
    };

    // Function to handle Google login failure
    const errorMessage = () => {
        console.error('Google Login Failed');
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
                    {user ? (
                        <div>
                            <img src={user.picture} alt="user image" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                            <Typography component="h3" variant="h6">User Logged in</Typography>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <br />
                        </div>
                    ) : (
                        <>
                            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                Sign in with Google
                            </Typography>
                            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                        </>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default UBLogin;
