
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../../components/buttons/login-button";

const Login = () => {
  
  console.log("trying to laod app")
  const { isLoading, user, logout, getIdTokenClaims } = useAuth0();
  
  if (isLoading) {
    return <span>loading...</span>;
  }
  return <LoginButton></LoginButton>
   
  
}

export default Login