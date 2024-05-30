import { useRef } from 'react';
import { IUser } from '../../models/IUser';
import { useForm } from 'react-hook-form';


interface IProps {
    user: IUser
}

function CreateRsvpForm(props : IProps) {
    const numberOfGuestsOutput = useRef<HTMLLabelElement>(null);

    function rangeUpdate(event : any){
        if(numberOfGuestsOutput != null && numberOfGuestsOutput.current != null)
          numberOfGuestsOutput.current.innerHTML =  event.target.value;
      }
    
      async function createRSVP (formData : any){
          console.log(formData)
          console.log(props.user)
      }
  
  return (
    <form id='userCreateRSVP' onSubmit={(createRSVP)}>
        <label>
            Body:
            <input type='text' placeholder='body'></input>
        </label>
        <label>
            Deadline:
            <input type='date' placeholder='deadline'></input>
        </label>
        <label>
            Status:
            <input type='text' placeholder='status'></input>
        </label>
        <label>
            NumberOfGuests:
            <input type='range' placeholder='numberofquests' step={1} defaultValue={1} max={4} min={1} onChange={rangeUpdate}></input>
            <label id='number-of-guests-output' ref={numberOfGuestsOutput}>1</label>
        </label>
        <label>
            DietaryRequirements:
            <input type='text' placeholder='dietaryRequirements'></input>
        </label>
        <button type='submit'>createRSVP</button>
    </form>  
  )
}

export default CreateRsvpForm