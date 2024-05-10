import { Navigate, Outlet } from "react-router-dom";
import Login from "./login";
import keycloak from "../../../keycloak";

const ProtectedRoute = () => {
  

    console.log("TIME TO LOGIN!???!!!!!!!!!" + keycloak.authenticated)
  
  
    return keycloak.authenticated ? <Outlet /> : <Login></Login>;
  };
  
  export default ProtectedRoute;