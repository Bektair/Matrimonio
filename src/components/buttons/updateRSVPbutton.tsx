import { IRSVPUpdate } from '../../API/UpdateRSVP';
import { RSVPStatus } from '../../models/IRSVP';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { updateRSVPThunk } from '../../redux/slices/weddingSlice';

interface sentProps{
    rsvpId: string
    status: RSVPStatus
    name: string
  }

export const UpdateRSVPbutton = (props : sentProps) => {
    const dispatch = useAppDispatch();
    
    function updateInviteStatus(id: string, status : RSVPStatus){
        var RSVPForUpdate : IRSVPUpdate =  {
            body: undefined,
            status: status,
            deadline: undefined,
            numberOfGuests: undefined,
            ChoosenDessertId: undefined,
            ChoosenDinnerId: undefined,
            OtherDietaryRequirements: undefined,
            signerId: undefined,
            weddingId: undefined
          }
         dispatch(updateRSVPThunk({ id: id, RSVP: RSVPForUpdate }))
   }


  return (
    <button className={props.rsvpId + "-" + props.status} onClick={() => {updateInviteStatus(props.rsvpId, props.status)}}>{props.name}</button>
  );
};

