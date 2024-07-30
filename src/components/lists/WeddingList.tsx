import List from './genericlist'
import { IWedding } from '../../models/IWedding'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { getCeremony, getReception, setWedding } from '../../redux/slices/weddingSlice';
import { replaceWedding } from '../../redux/slices/weddingsSlice';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import { selectWedding } from '../../redux/selectors/selectWeddingSlice';


interface IProps {
  weddings : IWedding[]
  ceremony?: boolean | undefined
  reception?: boolean | undefined
}

function WeddingList(props : IProps){
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage).language

    function onClickEvent(selectedItem: IWedding) {
      console.log("CLICKED")
      console.log(selectedItem)
      
        dispatch(setWedding({wedding: selectedItem}));
        dispatch(replaceWedding(selectedItem));

        if(props.ceremony) dispatch(getCeremony({weddingId: selectedItem.id.toString(), language: language}))
        if(props.reception) dispatch(getCeremony({weddingId: selectedItem.id.toString(), language: language }))


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