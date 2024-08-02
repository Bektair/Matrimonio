import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { redirectUri } from "../../constants/environment";
interface sentProps{
  className: string
}

export const LoginButton = (props: sentProps) => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

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
      {t("logIn")}
    </button>
  );
};