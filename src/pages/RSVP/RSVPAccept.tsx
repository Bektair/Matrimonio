import Popup from 'reactjs-popup'
import './RSVPAccept.sass'
import { IRSVP } from '../../models/IRSVP'
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import DietaryItem from './DietaryItem';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectReception, selectWedding, setWedding, updateRSVPThunk } from '../../redux/slices/weddingSlice';
import { IRSVPUpdate } from '../../API/UpdateRSVP';
import { getAllWeddings, selectWeddings } from '../../redux/slices/weddingsSlice';
import { IReception } from '../../models/IReception';
import '../../_index.sass'

interface IProps {
    rsvp: IRSVP
}


function RSVPAccept(props : IProps) {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const numberOfGuestsOutput = useRef<HTMLLabelElement>(null);
    const wedding = useAppSelector(selectWedding);
    const reception = useAppSelector(selectReception);
    const weddings = useAppSelector(selectWeddings)


    function rangeUpdate(event : any){
        if(numberOfGuestsOutput != null && numberOfGuestsOutput.current != null)
            numberOfGuestsOutput.current.innerHTML =  event.target.value;
    }
    
    function updateRSVP(formData : any){

        if(weddings.length > 0)
            dispatch(setWedding(weddings[0]));
          else{
              dispatch(getAllWeddings());
          }


        console.log("RECEPTION")
        console.log(reception)
        console.log("Form")
        console.log(formData)
//TODO
        if(wedding != undefined){
            var rsvpUpdate : IRSVPUpdate =  {
                body: undefined,
                status: "Accepted",
                deadline: undefined,
                numberOfGuests: formData.numberOfGuests,
                ChoosenDessertId: 1,
                ChoosenDinnerId: 1,
                OtherDietaryRequirements: props.rsvp.OtherDietaryRequirements,
                signerId: props.rsvp.Signer.id,
                weddingId: wedding?.id
            }

            dispatch(updateRSVPThunk(rsvpUpdate))
        }

    }

    function renderDietaryItems (reception : IReception){
        var elements = [];
        var menuOptions = reception.menuOptions;
        for (let index = 0; index < menuOptions.length; index++) {
            const element = menuOptions[index];
            elements.push(<DietaryItem key={element.dishName + "-" + element.id} allergens={element.alergens.split(",")} 
                image={element.image} name={element.dishName} tags={element.tags.split(",")} ></DietaryItem>)
        }
        return elements;
    }



    return (
    <div>
        <Popup trigger={<button>Accept</button>} position="center center">
            <div>
                <form onSubmit={handleSubmit(updateRSVP)}>
                    <h2>Dietary Requirements</h2>
                    <h3>Reception Dinner</h3>
                    { reception && renderDietaryItems(reception)
                    
                    }
                    
                    <div>
                        <input {...register("numberOfGuests")} type='range' placeholder='numberofguests' step={1} defaultValue={1} max={4} min={1} onChange={rangeUpdate}></input>
                        <label id='number-of-guests-output' ref={numberOfGuestsOutput}>1</label>
                    </div>
                    <label>
                        <label>Other notes</label>
                        <input type="text" placeholder="important allergens etc"></input>
                    </label>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </Popup>
    </div>
  )
}

export default RSVPAccept