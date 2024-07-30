import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ITranslationRSVP } from "../../API/CreateRSVP";
import { IRSVPUpdate } from "../../API/UpdateRSVP";
import { IReligiousCeremony } from "../../models/IReligiousCeremony";
import { IRSVP, RSVPStatus } from "../../models/IRSVP";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectLanguage } from "../../redux/selectors/selectLanguage";
import { addTranslationRSVPThunk, updateRSVPThunk } from "../../redux/slices/weddingSlice";
import { fromAmericanToEUDate, setDefaultTextBody } from "./createRsvpForm";

interface IProps{
    rsvp: IRSVP
    ceremony: IReligiousCeremony | undefined,
    wedding_id: string
}


function UpdateRsvpForm(props: IProps) {
    const { register, handleSubmit } = useForm();
    const [textareaBody, setTextAreaBody] = useState(setDefaultTextBody(props.ceremony))
    const numberOfGuestsOutput = useRef<HTMLLabelElement>(null);
    const language = useAppSelector(selectLanguage).language;
    const dispatch = useAppDispatch()
    

    function updateRSVP(formData : any, e:any){
        console.log(":..............................................................");
        console.log(formData);
        console.log(e)
        console.log(e.nativeEvent.submitter.name);

        if(e.nativeEvent.submitter.name == "Translate"){
            var rsvp = {
                body: formData.body,
                language: language,
                isDefaultLanguage: false
            } as ITranslationRSVP
            dispatch(addTranslationRSVPThunk({ translation: rsvp, rsvpId: props.rsvp.id }));
        }else{
            var rsvpUpdate = {
                body: formData.body,
                deadline: new Date(formData.deadline).getTime(),
                status: RSVPStatus.Pending,
                numberOfGuests: formData.numberOfGuests,
                otherDietaryRequirements: formData.otherDietaryRequirements,
                signerId: props.rsvp.signer.id, //Does not change
                weddingId: props.wedding_id, //Does not change
            } as IRSVPUpdate
            dispatch(updateRSVPThunk({RSVP: rsvpUpdate, id: props.rsvp.id}))
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

    function rangeUpdate(event : any){
        if(numberOfGuestsOutput != null && numberOfGuestsOutput.current != null)
            numberOfGuestsOutput.current.innerHTML =  event.target.value;
    }



    return (
    
    <form id='userUpdateRSVP' onSubmit={handleSubmit(updateRSVP)}>
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
        <label id='userUpdateRSVPBody'>
            <p>Body:</p>
            <textarea id='userCreateRSVPBodyText' {...register("body")} placeholder='body' value={textareaBody} onChange={handleUpdateTextarea}></textarea>
        </label>
        <label id='userUpdateRSVPOtherDietary'>
            <p>OtherDietaryRequirements:</p>
            <input {...register("otherDietaryRequirements")} placeholder='otherDietaryRequirements'/>
        </label>
        <button id='userUpdateRSVPButton' type='submit' name="Update">UpdateRSVP</button>
        <button id='userAddTranslateRSVPButton' type='submit' name="Translate">SetøTranslationRSVP</button>
    </form>
  )
}

export default UpdateRsvpForm