import { useState } from 'react';
import { IRSVPUpdate } from '../../API/UpdateRSVP';
import { RSVPStatus } from '../../models/IRSVP';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { updateRSVPThunk } from '../../redux/slices/weddingSlice';
import ConfirmationModal from '../dialog/ConfirmationModal';
import { useTranslation } from 'react-i18next';
import './updateRSVPButton.sass'

interface sentProps{
    rsvpId: string
    status: RSVPStatus
    name: string
  }

export const UpdateRSVPbutton = (props : sentProps) => {
    const dispatch = useAppDispatch();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { t } = useTranslation();
    
    function updateInviteStatus(id: string, status : RSVPStatus){


        var RSVPForUpdate : IRSVPUpdate =  {
            body: undefined,
            status: status,
            deadline: undefined,
            numberOfGuests: undefined,
            otherDietaryRequirements: undefined,
            signerId: undefined,
            weddingId: undefined,
            menuOrders: undefined
          }
         dispatch(updateRSVPThunk({ id: id, RSVP: RSVPForUpdate }))
   }

   


  return (
    <>    
    { props.status != RSVPStatus.Accepted ? showConfirmation ? 
      <ConfirmationModal actionName={t("decline")} onCancel={()=>setShowConfirmation(false)} onConfirm={() => {updateInviteStatus(props.rsvpId, props.status)}}></ConfirmationModal> :
      <button id={props.rsvpId + "-" + props.status} className={"button-" + props.status} onClick={()=>setShowConfirmation(true)}>{props.name}</button> :
      <button id={props.rsvpId + "-" + props.status} className={"button-" + props.status} onClick={() => {updateInviteStatus(props.rsvpId, props.status)}}>{props.name}</button>
    }
    </>
  );
};

