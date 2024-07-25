import List from './genericlist'
import { IWedding } from '../../models/IWedding'
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { getCeremony, getReception, setWedding } from '../../redux/slices/weddingSlice';
import { replaceWedding } from '../../redux/slices/weddingsSlice';


interface IProps {
  weddings : IWedding[]
  ceremony?: boolean | undefined
  reception?: boolean | undefined
}

function WeddingList(props : IProps){
    const dispatch = useAppDispatch();

    function onClickEvent(selectedItem: IWedding) {
      console.log("CLICKED")
      console.log(selectedItem)
        dispatch(setWedding({wedding: selectedItem}));
        dispatch(replaceWedding(selectedItem));

        if(props.ceremony) dispatch(getCeremony(selectedItem.id))
        if(props.reception) dispatch(getReception(selectedItem.id))

      }

    function getContent(_user : IWedding){
      var content = "";
      content += `${_user.id} ${_user.dresscode} ${_user.description}`;
      return content
  }

  return (
    <List<IWedding> onclickEvent={onClickEvent} listItems={props.weddings} setContentFunction={getContent} name='wedding'></List>
  )
}

export default WeddingList