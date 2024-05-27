
import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router-dom";
import { audience, clientId, domain, redirectUri } from '../../constants/environment';

export const Auth0ProviderWithNavigate = () => {
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