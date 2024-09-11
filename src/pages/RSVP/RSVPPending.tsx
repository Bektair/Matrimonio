import { useTranslation } from 'react-i18next';
import { UpdateRSVPbutton } from '../../components/buttons/updateRSVPbutton';
import { RSVPStatus } from '../../models/IRSVP';

interface IProps {
    id: string
    infoText: string
}

function RSVPPending(props: IProps) {
  const { t } = useTranslation();

  return (
    <div key={props.id+"-pending"} className='rsvp-response-buttons'>
      <label>{props.infoText}</label>
      <label></label>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Accepted} name={t("accept")}></UpdateRSVPbutton>
      <UpdateRSVPbutton rsvpId={props.id} status={RSVPStatus.Declined} name={t("decline")}></UpdateRSVPbutton>
    </div>
  )
}

export default RSVPPending