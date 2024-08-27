import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { redirectUri } from "../../constants/environment";


function Authorize() {
  const { loginWithRedirect } = useAuth0();

  useEffect(()=>{
    const test = async ()=> { await loginWithRedirect({
      appState: {
        returnTo: `${redirectUri}`,
      },
      authorizationParams:{
        scope: "read:users",
      }
    });
   }
   test()
  
  }, [])


  
  return (
    <div>authorize</div>
  )
}

export default Authorize

