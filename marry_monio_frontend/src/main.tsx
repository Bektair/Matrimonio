import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './_index.sass'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout/Layout.tsx';
import NotFound from './pages/Errorpages/NotFound.tsx';
import routes from './components/route/index.tsx';
import { Auth0Provider } from "@auth0/auth0-react";
import { audience, clientId, domain, redirectUri } from './constants/environment.ts';
import { store } from './redux/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);




  root.render(
    <React.StrictMode>
        <Provider store={store}>

              <App></App>

          </Provider>
    </React.StrictMode>
  );

