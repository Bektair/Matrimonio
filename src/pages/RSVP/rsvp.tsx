import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './rsvp.sass';
function Rsvp() {

  const { user, isAuthenticated } = useAuth0();

  useEffect(()=>{
    console.log(user)

    if(!isAuthenticated){
      console.log("not authenticated")
    }
  }, [])

  return (
    <>
      <h1>RSVP</h1>
      
    </>

  )
}

export default Rsvp