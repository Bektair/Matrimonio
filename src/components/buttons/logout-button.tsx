import { useAuth0 } from "@auth0/auth0-react";
interface sentProps{
  className: string
}

export const LogoutButton = (props: sentProps) => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
    });
  };
  
  return (
    <button className={props.className} onClick={handleLogout}>
      Log out
    </button>
  );
};