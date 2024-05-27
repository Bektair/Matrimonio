
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../../../marry_monio_frontend/src/components/buttons/login-button";

const Login = () => {
  
  console.log("trying to laod app")
  const { isLoading } = useAuth0();
  


  if (isLoading) {
    return <span>loading...</span>;
  }



  return <LoginButton></LoginButton>
   
  
}

export default Login