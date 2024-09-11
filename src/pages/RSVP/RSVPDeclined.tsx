import { useTranslation } from "react-i18next";
import { UpdateRSVPbutton } from "../../components/buttons/updateRSVPbutton"
import { RSVPStatus } from "../../models/IRSVP"
interface IProps {
  id: string
  infoText: string
}
function RSVPDeclined(props : IProps) {
  const { t } = useTranslation();

  return (
    <div  key={props.id+"-declined"}>
      <label>{props.infoText}</label>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Accepted} name={t("accept")}></UpdateRSVPbutton>

    </div>
  )
}

export default RSVPDeclined