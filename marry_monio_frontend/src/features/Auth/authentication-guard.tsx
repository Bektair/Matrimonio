import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { PageLoader } from "./page-loader";

export const AuthenticationGuard = ({ component } : any) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />  
        {/* Rendered component while redirecting to login. */}
      </div>
    ),
    // Can add Returnto: that decides where to redirect after login
  });

  return <Component />;
};