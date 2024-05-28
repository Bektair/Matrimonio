import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './_index.sass'
import { Provider } from 'react-redux';

import { store } from './redux/store.ts';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { audience, clientId, domain, redirectUri } from './constants/environment.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);
console.log("DOMANINNNNNNNNNNN" + process.env.NODE_ENV +  domain)
console.log("VueVariabel" + import.meta.env.VITE_APP_AUTH0_DOMAIN)
console.log("ReactVariabel" + process.env.REACT_APP_API_URL)



  root.render(
    <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Auth0Provider
                  domain={domain}
                  clientId={clientId}
                  authorizationParams={{
                    audience: audience,
                    redirect_uri: redirectUri,
                  }

                }
                >
                  <App></App>
                </Auth0Provider>
            </BrowserRouter>
          </Provider>
    </React.StrictMode>
  );
