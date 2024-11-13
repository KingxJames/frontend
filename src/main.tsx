import React from "react";
import ReactDOM from "react-dom/client";
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
  <StrictMode>
    <Provider store={store}>
      <Router>
        <GoogleOAuthProvider clientId="954779929729-fgvd34196vr86v434e0rjlqjqdfij9pb.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Router>
    </Provider>
  </StrictMode>
);

{
  /* // ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// ); */
}
