import List from './genericlist'
import { IWedding } from '../../models/IWedding'
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { setWedding } from '../../redux/slices/weddingSlice';
import { replaceWedding } from '../../redux/slices/weddingsSlice';


interface IProps {
  weddings : IWedding[]
}

function WeddingList(props : IProps){
    const dispatch = useAppDispatch();
    function onClickEvent(selectedItem: IWedding) {
        dispatch(setWedding({wedding: selectedItem}));
        
        dispatch(replaceWedding(selectedItem));
    }


  return (
    <List<IWedding> onclickEvent={onClickEvent} listItems={props.weddings} propNames={["id", "dresscode", "description"] } 
                listItemFormat='${id} ${dresscode} ${description} nice' name='wedding'></List>
  )
}

export default WeddingList