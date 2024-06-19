import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IRSVPCreate } from '../../API/PostRSVP';
import '../../_index.sass';
import { IUser } from '../../models/IUser';
import { IWedding } from '../../models/IWedding';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { createRSVPThunk } from '../../redux/slices/weddingSlice';
import './createRsvpForm.sass';
import { selectCeremony } from '../../redux/selectors/selectWeddingSlice';

interface IProps {
    user: IUser | undefined
    wedding: IWedding | undefined
}

function CreateRsvpForm(props : IProps) {
    const { register, handleSubmit } = useForm();
    const numberOfGuestsOutput = useRef<HTMLLabelElement>(null);
    const ceremony = useSelector(selectCeremony)
    const [textareaBody, setTextAreaBody] = useState(setDefaultTextBody())
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
            console.log(formData.numberOfGuests)
            var rsvp = {
                body: formData.body,
                deadline: new Date(formData.deadline).getTime(),
                OtherDietaryRequirements: "",
                numberOfGuests: formData.numberOfGuests,
                signerId: props.user.id.split("|")[1],
                weddingId: props.wedding.id,
                status: "pending"
            } as IRSVPCreate
            console.log(props.user)
            console.log(JSON.stringify(rsvp))

            dispatch(createRSVPThunk(rsvp))
        }


      }
  

    function setDefaultTextBody(){
        var defaultText = ""
        if(ceremony!=null && ceremony!=undefined){

            var date = new Date(ceremony.date);
            defaultText = `We are glad to invite you to our wedding ${date.getDate()+"/" + date.getMonth()+"/"+date.getFullYear()} 
            The ceremony will be held in ${ceremony.location.title}, shown in the map beneath. 
            Please respond by clicking accept or decline, The Deadline to answer is {deadline}.
            For more information visit the rest of the website, we look forward to meeting you`
        }
        return defaultText;
    }

    function fromAmericanToEUDate(americanDate : string){
        var splitAmerican = americanDate.split("-")
        return splitAmerican[2] + "/" + splitAmerican[1] + "/" + splitAmerican[0] 

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

export default CreateRsvpForm