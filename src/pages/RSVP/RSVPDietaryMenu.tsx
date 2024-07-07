import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IRSVPUpdate } from '../../API/UpdateRSVP';
import '../../_index.sass';
import { IRSVP } from '../../models/IRSVP';
import { IReception } from '../../models/IReception';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectReception, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { selectWeddings } from '../../redux/selectors/selectWeddingsSlice';
import { updateRSVPThunk } from '../../redux/slices/weddingSlice';
import { getAllWeddings } from '../../redux/slices/weddingsSlice';
import DietaryItem from './DietaryItem';
import './RSVPDietaryMenu.sass';

interface IProps {
    rsvp: IRSVP
    setCurrentMenuItem: any
}


function RSVPDietaryMenu(props : IProps) {
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

        if(weddings.length == 0)
            dispatch(getAllWeddings());

        console.log("RECEPTION")
        console.log(reception)
        console.log("Form")
        console.log(formData)

        var radioSelectedDinner = document.getElementsByClassName('selected-dish-item')[0];
        var radioSelectedDessert = document.getElementsByClassName('selected-dessert-item')[0];
        
        console.log(radioSelectedDinner.id)
        console.log(radioSelectedDinner)
        console.log(radioSelectedDessert)
        console.log(radioSelectedDessert.id)


        if(wedding != undefined){
            var rsvpUpdate : IRSVPUpdate =  {
                body: undefined,
                status: "Accepted",
                deadline: undefined,
                numberOfGuests: formData.numberOfGuests,
                OtherDietaryRequirements: formData.otherDietaryRequirements,
                signerId: props.rsvp.signer.id,
                weddingId: wedding?.id,
                menuOrders: undefined
            }
            console.log("Update")
            console.log(rsvpUpdate)

            dispatch(updateRSVPThunk({ id: props.rsvp.id, RSVP: rsvpUpdate }))
        }

    }

    function renderDietaryItems (reception : IReception){
        var allElements = [];
        var dinnerElements = [];
        var dessertElements = [];
        var menuOptions = reception.menuOptions;
        for (let index = 0; index < menuOptions.length; index++) {
            const element = menuOptions[index];
            var copy = props.rsvp.menuOrders.slice();
            var orders = copy.filter((x)=> x.menuOptionId == element.id).length;

            var IsSelected = false
            if(element.tags.match("Dinner")){
                dinnerElements.push(<DietaryItem onClickAddon={props.setCurrentMenuItem} selected={IsSelected} id={element.id} key={element.dishType + "-" + element.id} 
                    image={element.image} name={element.dishType} tags={element.tags.split(",")} orderCount={orders}></DietaryItem>);
            } else {
                var IsSelected = false
                dessertElements.push(<DietaryItem onClickAddon={props.setCurrentMenuItem}  selected={IsSelected} id={element.id} key={element.dishType + "-" + element.id} 
                    image={element.image} name={element.dishType} tags={element.tags.split(",")} orderCount={orders} ></DietaryItem>)
            }
        }
    

        allElements.push(<h3 key={"ReceptionDinner"}>Reception Dinner</h3>)
        allElements.push(dinnerElements);
        if(dessertElements.length > 0){
           allElements.push(<h3 key={"ReceptionDessert"}>Reception Dessert</h3>)
            allElements.push(dessertElements);
        }

        return allElements;
    }



    return (
    <div>
        <div>
            <form onSubmit={handleSubmit(updateRSVP)}>                
                { reception && renderDietaryItems(reception)}
                <div>
                    <input {...register("numberOfGuests")} type='range' placeholder='numberofguests' step={1} defaultValue={1} max={4} min={1} onChange={rangeUpdate}></input>
                    <label id='number-of-guests-output' ref={numberOfGuestsOutput}>1</label>
                </div>
                <label>
                    <label>Other notes</label>
                    <input {...register("otherDietaryRequirements")}  type="text" placeholder="other dietery requirements"></input>
                </label>
                <button type='submit'>Send</button>
            </form>
        </div>
    </div>
  )
}

export default RSVPDietaryMenu