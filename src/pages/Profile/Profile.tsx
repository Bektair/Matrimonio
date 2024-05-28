import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../../components/buttons/logout-button';

function Profile() {
  const {user, isAuthenticated } = useAuth0();
  var navigate = useNavigate()



  useEffect(()=>{
    console.log(user)

    if(!isAuthenticated){
      console.log("not authenticated")
      navigate("/login")
    }
    

  }, [])
  
  
  return (
    <>
      <div>Profile</div>
      <div>{user?.name}</div>
      <img src={user?.picture}></img>
      <LogoutButton className=''></LogoutButton>
    </>
  )
}

export default Profile