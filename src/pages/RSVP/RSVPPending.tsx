import { UpdateRSVPbutton } from '../../components/buttons/updateRSVPbutton';
import { RSVPStatus } from '../../models/IRSVP';

interface IProps {
    id: string
}



function RSVPPending(props: IProps) {
    



  return (
    <div key={props.id+"-pending"} className='rsvp-response-buttons'>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Accepted} name='Accept'></UpdateRSVPbutton>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Declined} name='Decline'></UpdateRSVPbutton>
    </div>
  )
}

export default RSVPPending