import { UpdateRSVPbutton } from "../../components/buttons/updateRSVPbutton"
import { RSVPStatus } from "../../models/IRSVP"
interface IProps {
  id: string
  infoText: string
}
function RSVPDeclined(props : IProps) {
  return (
    <div  key={props.id+"-declined"}>
      <label>{props.infoText}</label>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Accepted} name='Accept'></UpdateRSVPbutton>

    </div>
  )
}

export default RSVPDeclined