import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectAuth } from '../../redux/slices/authSlice';
import { IWeddingAndSigner, getRSVPbyWeddingAndSigner, getReception, selectRSVPS, selectWedding, setWedding } from '../../redux/slices/weddingSlice';
import './rsvp.sass';
import RSVPAccept from './RSVPAccept';
import { getAllWeddings, selectWeddings } from '../../redux/slices/weddingsSlice';
function Rsvp() {

  const { user, isAuthenticated } = useAuth0();
  const RSVPS = useAppSelector(selectRSVPS);
  const Wedding = useAppSelector(selectWedding);
  const UserId = useAppSelector(selectAuth).id;
  const weddings = useAppSelector(selectWeddings)

  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    //TODO fjern, kun for testing
    if(weddings.length > 0)
      dispatch(setWedding(weddings[0]));
    else{
        dispatch(getAllWeddings());
    }
    console.log("GETTING RECEPTION?" + Wedding)
    if(Wedding != undefined){
      dispatch(getRSVPbyWeddingAndSigner( {signerId: UserId, wedding_id: Wedding.id.toString()} as IWeddingAndSigner))
      dispatch(getReception(Wedding.id))
    }
    if(!isAuthenticated){
      console.log("not authenticated")
    }
  }, [])

  function printRSVP(){
    console.log(UserId + " | " + Wedding?.id.toString())
    console.log(RSVPS)
    if(Wedding != undefined)
      dispatch(getRSVPbyWeddingAndSigner( {signerId: UserId, wedding_id: Wedding.id.toString()} as IWeddingAndSigner))

  }



  return (
    <>
      <h1>Hello {user?.name}!</h1>
      <button onClick={printRSVP}>PrintRSVP</button>
      { RSVPS && RSVPS.length > 0 &&
      <>
        <div>Test {RSVPS[0].body}</div>
        <button>Decline</button>

      </>
      }
      <RSVPAccept rsvp={RSVPS[0]}></RSVPAccept>

      {/* <List listItems={RSVPS} listItemFormat='' propNames={["id", "body"]} name='rsvps' onclickEvent={} ></List> */}

      
    </>

  )
}

export default Rsvp