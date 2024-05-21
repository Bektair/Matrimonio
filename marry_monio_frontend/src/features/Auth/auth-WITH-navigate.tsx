
import { audience, clientId, domain, redirectUri } from '../../constants/environment';
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children } : any) => {
  const navigate = useNavigate();

    const onRedirectCallback = (appState : any) => {
        navigate(appState?.returnTo || window.location.pathname);
      };
    
      if (!(domain && clientId && redirectUri  && audience)) {
        return null;
      }
    
      return (
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            audience: audience,
            redirect_uri: redirectUri,
          }}
          onRedirectCallback={onRedirectCallback}
        >
         <Outlet/> 
        </Auth0Provider>
      );
};