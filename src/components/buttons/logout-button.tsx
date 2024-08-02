import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
interface sentProps{
  className: string
}

export const LogoutButton = (props: sentProps) => {
  const { logout } = useAuth0();
  const { i18n, t } = useTranslation();


  const handleLogout = async () => {
    await logout({
    });
  };
  
  return (
    <button className={props.className} onClick={handleLogout}>
      {t("logOut")}
    </button>
  );
};