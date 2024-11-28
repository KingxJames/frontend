// import axios from 'axios';
// import { AppDispatch } from '../store'; // Adjust this to match your store setup
// import { setUser, setToken } from '../features/authSlice';
// import { CredentialResponse } from '@react-oauth/google';

// export const loginWithGoogle = async (
//   credentialResponse: CredentialResponse,
//   dispatch: AppDispatch,
//   navigate: (path: string) => void
// ) => {
//   if (credentialResponse.credential) {
//     console.log('Google ID Token:', credentialResponse.credential);

//     try {
//       // Verify and get the profile data using the ID Token
//       const response = await axios.get(
//         `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
//       );

//       const profileData = response.data;
//       console.log('Profile Data:', profileData);

//       // Check email domain
//       const emailDomain = profileData.email.split('@')[1];
//       if (emailDomain !== 'ub.edu.bz') {
//         console.error('Unauthorized domain');
//         alert('Only emails from the "ub.edu.bz" domain are allowed.');
//         return;
//       }

//       // Call the "login-or-create" API
//       const apiResponse = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/publicSafety/loginOrCreate`,
//         {
//           name: profileData.name,
//           email: profileData.email,
//           picture: profileData.picture,
//         }
//       );

//       console.log('Saved or existing user:', apiResponse.data);

//       // Update Redux store
//       dispatch(
//         setUser({
//           name: apiResponse.data.data.name,
//           email: apiResponse.data.data.email,
//           picture: profileData.picture,
//         })
//       );

//       dispatch(setToken(credentialResponse.credential));

//       // Redirect to the index page after successful login
//       navigate('/');
//     } catch (error) {
//       console.error('Error during login process:', error);
//     }
//   } else {
//     console.error('No credential received');
//   }
// };
