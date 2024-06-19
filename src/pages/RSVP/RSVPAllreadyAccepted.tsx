import { UpdateRSVPbutton } from "../../components/buttons/updateRSVPbutton"
import { RSVPStatus } from "../../models/IRSVP"
interface IProps {
  id: string
}
function RSVPAllreadyAccepted(props: IProps) {
  return (
    <div key={props.id+"-allready-accepted"}>
      <label>Du har allerede svart ja til denne invitasjonen, vil du endre svar?</label>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Declined} name='Decline'></UpdateRSVPbutton>
    </div>
  )
}

export default RSVPAllreadyAccepted