// import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../store/store.ts";
import App from "./App.tsx";
import "./App.css";
import "./css/satoshi.css";
import "./css/style.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="954779929729-hkv9gd5snnsfh2f824sf8pp22h3kuml9.apps.googleusercontent.com">
    <StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);

