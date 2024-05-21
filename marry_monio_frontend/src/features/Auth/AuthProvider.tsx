import { useNavigate } from "react-router-dom";
import { audience, clientId, domain, redirectUri } from '../../constants/environment';
import { Auth0Provider } from '@auth0/auth0-react';

export const AuthProvider = ({ children }: { children: any }) => {
    const navigate = useNavigate();
  
    if (!(domain && clientId && redirectUri  && audience)) {
        return null;
      }
  
    const onRedirectCallback = (appState: any) => {
      navigate(appState?.returnTo || window.location.pathname);
    };
  
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
        {children}
      </Auth0Provider>
    );
  };