import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
