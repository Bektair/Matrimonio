import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './_index.sass'
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from "./features/Auth/auth0-provider-with-navigate";
import { Provider } from 'react-redux';
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root')!);

  root.render(
    <React.StrictMode>
        <Provider store={store}>
          {/* <Auth0ProviderWithNavigate> */}
              <App></App>
          {/* </Auth0ProviderWithNavigate> */}
          </Provider>
    </React.StrictMode>
  );

