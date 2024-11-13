import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface GoogleAuthProps {
  onSuccess: (response: CredentialResponse) => void;
  onError: () => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onSuccess, onError }) => {
  return (
    <GoogleOAuthProvider clientId="954779929729-hkv9gd5snnsfh2f824sf8pp22h3kuml9.apps.googleusercontent.com
">
      <GoogleLogin
        onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
