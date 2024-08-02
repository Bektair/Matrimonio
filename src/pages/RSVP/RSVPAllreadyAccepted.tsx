import { UpdateRSVPbutton } from "../../components/buttons/updateRSVPbutton"
import { RSVPStatus } from "../../models/IRSVP"
interface IProps {
  id: string
  infoText: string
}
function RSVPAllreadyAccepted(props: IProps) {
  
  return (
    <div key={props.id+"-allready-accepted"}>
      <label>{props.infoText}</label>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Declined} name='Decline'></UpdateRSVPbutton>
    </div>
  )
}

export default RSVPAllreadyAccepted