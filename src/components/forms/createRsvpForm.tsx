import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRSVPCreate } from '../../API/CreateRSVP';
import '../../_index.sass';
import { RSVPStatus } from '../../models/IRSVP';
import { IReligiousCeremony } from '../../models/IReligiousCeremony';
import { IUser } from '../../models/IUser';
import { IWedding } from '../../models/IWedding';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import { selectCeremony } from '../../redux/selectors/selectWeddingSlice';
import { createRSVPThunk } from '../../redux/slices/weddingSlice';
import './createRsvpForm.sass';

interface IProps {
    user: IUser | undefined
    wedding: IWedding | undefined
}

function CreateRsvpForm(props : IProps) {
    const { register, handleSubmit } = useForm();
    const numberOfGuestsOutput = useRef<HTMLLabelElement>(null);
    const ceremony = useAppSelector(selectCeremony)
    const language = useAppSelector(selectLanguage).language
    const [textareaBody, setTextAreaBody] = useState(setDefaultTextBody(ceremony))
    const dispatch = useAppDispatch()
    
    function rangeUpdate(event : any){
        if(numberOfGuestsOutput != null && numberOfGuestsOutput.current != null)
            numberOfGuestsOutput.current.innerHTML =  event.target.value;
    }
    
    async function createRSVP (formData : any){
        
        console.log(formData.deadline)
        console.log(new Date(formData.deadline))
        if(props.user != undefined && props.wedding != undefined){
            console.log(props.user?.id)
            console.log("USER ID YAY")
            console.log(props.user.id.includes("|") ?  props.user.id.split("|")[1] : props.user.id)


            var rsvp = {
                body: formData.body,
                deadline: new Date(formData.deadline).getTime(),
                OtherDietaryRequirements: "",
                numberOfGuests: formData.numberOfGuests,
                signerId: props.user.id.includes("|") ?  props.user.id.split("|")[1] : props.user.id,
                weddingId: props.wedding.id,
                status: RSVPStatus.Pending,
                language: language
            } as IRSVPCreate
            console.log(props.user)
            console.log(JSON.stringify(rsvp))

            dispatch(createRSVPThunk(rsvp))
        }


    }

    function deadlineChanged(event : any){
        //Date formaterer de rart
        var date = fromAmericanToEUDate(event.target.value);

        setTextAreaBody(textareaBody.replace("{deadline}", date))
    }

    function handleUpdateTextarea(event: any){
        setTextAreaBody(event.target.value)
    }

    

  return (
    <form id='userCreateRSVP' onSubmit={handleSubmit(createRSVP)}>
        <label>
            <p>Deadline:</p>
            <input {...register("deadline")} type='date' placeholder='deadline' onChange={deadlineChanged}></input>
        </label>
        <label>
            <p>NumberOfGuests:</p>
            <div>
                <input {...register("numberOfGuests")} type='range' placeholder='numberofguests' step={1} defaultValue={1} max={4} min={1} onChange={rangeUpdate}></input>
                <label id='number-of-guests-output' ref={numberOfGuestsOutput}>1</label>
            </div>
        </label>
        <label id='userCreateRSVPBody'>
            <p>Body:</p>
            <textarea id='userCreateRSVPBodyText' {...register("body")} placeholder='body' value={textareaBody} onChange={handleUpdateTextarea}></textarea>
        </label>
        <button id='userCreateRSVPButton' type='submit'>createRSVP</button>
    </form>
  )
}

export function fromAmericanToEUDate(americanDate : string){
    var splitAmerican = americanDate.split("-")
    return splitAmerican[2] + "/" + splitAmerican[1] + "/" + splitAmerican[0] 

}


export function setDefaultTextBody(ceremony? : IReligiousCeremony){
    var defaultText = ""
    if(ceremony!=null && ceremony!=undefined){
        var date = new Date(ceremony.startDate);
        defaultText = `We are glad to invite you to our wedding ${date.getDate()+"/" + (date.getMonth()+1) +"/"+date.getFullYear()} 
        The ceremony will be held in ${ceremony.location.title}, shown in the map beneath. 
        Please respond by clicking accept or decline, The Deadline to answer is {deadline}.
        For more information visit the rest of the website, we look forward to meeting you`
    }
    return defaultText;
}

export default CreateRsvpForm