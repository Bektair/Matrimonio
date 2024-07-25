import '../../_index.sass';
import { IRSVP } from '../../models/IRSVP';
import { IReception } from '../../models/IReception';
import { useAppSelector } from '../../redux/Hooks/hooks';
import { selectReception } from '../../redux/selectors/selectWeddingSlice';
import DietaryItem from './DietaryItem';
import './RSVPDietaryMenu.sass';

interface IProps {
    rsvp: IRSVP
    setCurrentMenuItem: any
}


function RSVPDietaryMenu(props : IProps) {

    const reception = useAppSelector(selectReception);


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
            <form>                
                { reception && renderDietaryItems(reception)}
            </form>
        </div>
    </div>
  )
}

export default RSVPDietaryMenu