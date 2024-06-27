import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { IRSVP, RSVPStatus } from '../../models/IRSVP';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { IWeddingAndSigner, getRSVPbyWeddingAndSigner, getReception  } from '../../redux/slices/weddingSlice';
import { getAllWeddings } from '../../redux/slices/weddingsSlice';
import RSVPAllreadyAccepted from './RSVPAllreadyAccepted';
import RSVPAllreadyAcceptedPastDue from './RSVPAllreadyAcceptedPastDue';
import RSVPDeclined from './RSVPDeclined';
import RSVPDeclinedPastDue from './RSVPDeclinedPastDue';
import RSVPDietaryMenu from './RSVPDietaryMenu';
import RSVPExpiredInvite from './RSVPExpiredInvite';
import RSVPPending from './RSVPPending';
import './rsvp.sass';
import { selectRSVPByAuthId, selectRSVPS, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { selectAuth } from '../../redux/selectors/selectAuth';
import { selectWeddings } from '../../redux/selectors/selectWeddingsSlice';
function Rsvp() {

  const { user, isAuthenticated } = useAuth0();
  const RSVPS = useAppSelector(selectRSVPS);
  const Wedding = useAppSelector(selectWedding);
  const Auth = useAppSelector(selectAuth);
  const UserId = useAppSelector(selectAuth).id;
  const weddings = useAppSelector(selectWeddings)
  const dispatch = useAppDispatch();
  const currentRSVP = useAppSelector(state => selectRSVPByAuthId(state, Auth ? Auth.id : undefined))

  const mode = import.meta.env.MODE;
  console.log("MODE")
  console.log(mode)

  useEffect(()=>{
    //TODO fjern, kun for testing

 
    console.log("ALL good")
    console.log(Auth)
    console.log(RSVPS)
    console.log(Wedding)
    console.log(currentRSVP)

    if(weddings.length == 0){
      dispatch(getAllWeddings());
    }
    if(Wedding != undefined){
      dispatch(getRSVPbyWeddingAndSigner( {signerId: UserId, wedding_id: Wedding.id.toString()} as IWeddingAndSigner))
      dispatch(getReception(Wedding.id))
    }
    if(!isAuthenticated){
      console.log("not authenticated")
    }
  }, [])


  // function updateRSVP(rsvp : IRSVPUpdate, id: string){Declined
  //   dispatch(updateRSVPThunk({ id: id, RSVP: rsvp }));
  // }
  

  function renderSwitchRSVPState(rsvp : IRSVP){
    var elements = [];
    console.log("STATUS ER: " + rsvp.status)
    switch (rsvp.status) {
      case RSVPStatus.Pending:
        elements.push(<RSVPPending key={rsvp.id+"-"+rsvp.status} id={rsvp.id}></RSVPPending>)
        break;
      case RSVPStatus.Accepted:
        console.log("DEADLINE " + rsvp.deadline)
        if(rsvp.deadline > Date.now()){
          console.log("Klarte Deadline :)")
          elements.push(<RSVPAllreadyAccepted id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPAllreadyAccepted>)
        } else {
          elements.push(<RSVPAllreadyAcceptedPastDue id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPAllreadyAcceptedPastDue>)
        }
        break;
      case RSVPStatus.Declined:
        if(rsvp.deadline  > Date.now()){
          elements.push(<RSVPDeclined id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPDeclined>)
        }
        else {
          elements.push(<RSVPDeclinedPastDue id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPDeclinedPastDue>)
        }
        break;
      case RSVPStatus.PastDeadline:
        elements.push(<RSVPExpiredInvite id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPExpiredInvite>);
        break;
    
      default:
        elements.push(<div key={rsvp.id + "-wrong-status"}>Wrong status set on RSVP, check with support</div>)
        break;
    }
    return elements
  }



  return (
    <>
      <h1>Hello {user?.name}!</h1> 
      <div className='RSVP-invite-button'>
        { Auth && Auth.id  && RSVPS && RSVPS.length > 0 && Wedding && currentRSVP &&
          renderSwitchRSVPState(currentRSVP)
        }
      </div>

      { Auth && Auth.id  && RSVPS && RSVPS.length > 0 && Wedding && currentRSVP && currentRSVP.status == RSVPStatus.Accepted &&


        <RSVPDietaryMenu rsvp={currentRSVP}></RSVPDietaryMenu>
      }
      
    </>

  )
}

export default Rsvp