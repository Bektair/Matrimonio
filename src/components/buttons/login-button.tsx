import { useAuth0 } from "@auth0/auth0-react";
import { redirectUri } from "../../constants/environment";
interface sentProps{
  className: string
}

export const LoginButton = (props: sentProps) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    
    await loginWithRedirect({
      
      appState: {
        returnTo: `${redirectUri}`,
      },
      authorizationParams:{
        scope: "read:users",
      }
    });
  };

  return (
    <button className={props.className} onClick={handleLogin}>
      Log In
    </button>
  );
};