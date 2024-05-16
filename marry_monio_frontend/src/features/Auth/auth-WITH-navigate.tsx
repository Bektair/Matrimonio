
import { Suspense } from 'react'
import './Layout.sass'
import { Outlet, useNavigate } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Layout from '../../components/Layout/Layout';
import { audience, clientId, domain, redirectUri } from '../../constants/environment';


export default function Auth0ProviderWithNavigate() {
    const navigate = useNavigate();


  const onRedirectCallback = (appState : any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };


  console.log("osr much logg" + domain + clientId + redirectUri + audience)
  if (!(domain && clientId && redirectUri  && audience)) {
    return null;
  }

  return (

    // <Auth0Provider
    //     domain={domain}
    //     clientId={clientId}
    //     authorizationParams={{
    //     audience: audience,
    //     redirect_uri: redirectUri,
    //     }}
    //     onRedirectCallback={onRedirectCallback}
    // >
    <Layout></Layout>
    // </Auth0Provider>

  );

   
}