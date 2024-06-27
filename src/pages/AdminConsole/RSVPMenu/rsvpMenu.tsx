import { useEffect, useState } from 'react'
import List from '../../../components/lists/genericlist'
import { IRSVP } from '../../../models/IRSVP'
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks/hooks'
import { selectRSVPS, selectWedding } from '../../../redux/selectors/selectWeddingSlice'
import { getRSVPbyWedding } from '../../../redux/slices/weddingSlice'

function RsvpMenu() {
    const dispatch = useAppDispatch();
    const rsvps = useAppSelector(selectRSVPS)
    const wedding = useAppSelector(selectWedding)
    const [rsvp, setRSVP] = useState<IRSVP>(); 


    console.log("Okay RSVP")
    console.log(rsvp)
    console.log(wedding)

    useEffect(()=> {
        if(wedding){
            console.log("I have wedding will try fetch")
            dispatch(getRSVPbyWedding(wedding.id))
        }
    }, [])


    function onClickEvent(selectedItem: IRSVP) {
        setRSVP(selectedItem);
      
    }
//Just give the list the content it should have lol
//I can give it an array of content, this way we are not so volunourable to variable changes

    function getContent(_rsvp : IRSVP){
        var content = "";
        content += `${_rsvp.id} ${_rsvp.status} ${_rsvp.signer.firstName} ${_rsvp.signer.lastName} ${_rsvp.deadline}`;
        return content
    }


  return (
    <>
        
        <List setContentFunction={getContent} onclickEvent={onClickEvent} listItems={rsvps}  name='rsvp'></List>
        <label>Id selected: {rsvp?.id}</label>
        <></>
    </>
  )
}

export default RsvpMenu

/*
export interface IRSVP{
    id: string
    body: string
    deadline: number
    status: RSVPStatus
    numberOfGuests: number
    OtherDietaryRequirements: string
    Signer: IUserReadDTO
    ChoosenDinnerId: number | null
    ChoosenDessertId: number | null

    export interface IUserReadDTO {
    id: string
    firstName: string
    lastName: string
    profilePicture:string
    email: string
    nickname: string
    password:string
    email_Verified:boolean
}


    <List<IWedding> onclickEvent={onClickEvent} listItems={props.weddings} propNames={["id", "dresscode", "description"] } 
        listItemFormat='${id} ${dresscode} ${description} nice' name='wedding'></List>
}
*/