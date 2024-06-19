import { UpdateRSVPbutton } from "../../components/buttons/updateRSVPbutton"
import { RSVPStatus } from "../../models/IRSVP"
interface IProps {
  id: string
}
function RSVPDeclined(props : IProps) {
  return (
    <div  key={props.id+"-declined"}>
      <label>Du har svart nei til denne invitasjonen, vil du endre svar?</label>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Accepted} name='Accept'></UpdateRSVPbutton>

    </div>
  )
}

export default RSVPDeclined