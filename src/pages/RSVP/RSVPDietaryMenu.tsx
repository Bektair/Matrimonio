import { useEffect } from 'react';
import '../../_index.sass';
import { IMenuOrder } from '../../models/IMenuOrder';
import { IRSVP } from '../../models/IRSVP';
import { IReception } from '../../models/IReception';
import { useAppSelector } from '../../redux/Hooks/hooks';
import { selectReception } from '../../redux/selectors/selectWeddingSlice';
import DietaryItem from './DietaryItem';
import './RSVPDietaryMenu.sass';
import { IMenuOption } from '../../models/IMenuOption';
import { useTranslation } from 'react-i18next';

interface IProps {
    rsvp: IRSVP
    menuOrders: IMenuOrder[]
    setCurrentMenuItem: any
}


function RSVPDietaryMenu(props : IProps) {
    const reception = useAppSelector(selectReception);

    useEffect(()=>{
        console.log("UPDATEDDDDDDDDDDDDDDDDD RSVPDIETARYMENU")
        console.log(props.menuOrders)
        
    }, [props.menuOrders])

    function renderDietaryItems (menuOptions : IMenuOption[]){
        var allElements = [];
        var dinnerElements = [];
        var dessertElements = [];
        for (let index = 0; index < menuOptions.length; index++) {
            const element = menuOptions[index];
            console.log("UPDATEDDDDDDDDDDDDDDDDD MenuOptions")
            console.log(element)
            console.log(props.menuOrders)
    

            var orders = props.menuOrders.filter((word)=> word.menuOptionId == element.id).length;
            console.log(orders)

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
            <form>                
                { reception && renderDietaryItems(reception.menuOptions)}
            </form>
        </div>
    </div>
  )
}

export default RSVPDietaryMenu