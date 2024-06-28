import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectReception, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import { selectWeddings } from "../../../redux/selectors/selectWeddingsSlice"
import { getAllWeddings } from "../../../redux/slices/weddingsSlice"
import WeddingList from "../../../components/lists/WeddingList"
import Summary from "../../Schedule/Summary"
import CreateReceptionForm from "../../../components/forms/createReceptionForm"
import CreateMenuItemForm from "../../../components/forms/createMenuItemForm"
import { IMenuOptionRequest } from "../../../API/CreateMenuOption"
import { IMenuOption } from "../../../models/IMenuOption"
import { createMenuOptionThunk } from "../../../redux/slices/weddingSlice"
import List from "../../../components/lists/genericlist"

function ReceptionMenu() {
  const weddings = useAppSelector(selectWeddings)
  const wedding = useAppSelector(selectWedding)
  const reception = useAppSelector(selectReception)
  const dispatch = useAppDispatch();
  const [menuItems, setMenuItems] = useState<IMenuOption[]>([])

  useEffect(()=>{
      if(weddings.length < 1)
          dispatch(getAllWeddings)
      else{
      }
      
  },[])

  function menuItemAdd(menuItem: IMenuOption){


    setMenuItems([...menuItems, { alergens: menuItem.alergens, dishName: menuItem.dishName, 
        id: menuItem.id, image: menuItem.image, tags: menuItem.tags }])

    if(reception){
        var menuOptionRequest : IMenuOptionRequest =  {
            reception_id: reception.id,
            menuOption: menuItem
        }
       dispatch(createMenuOptionThunk(menuOptionRequest))
    }
  }

  function setContent(option: IMenuOption){
    
    return `${option.dishName} ${option.alergens} ${option.tags}`
  }

  function onMenuOptionClick(option: IMenuOption){
    console.log(option)

  }

  return (
    <>
      <div>ReceptionMenu</div>
      <WeddingList weddings={weddings} reception={true}></WeddingList>
      { wedding && !reception && <><label>You can add a reception to wedding with id {wedding.id}</label>
      <CreateReceptionForm wedding_id={wedding?.id}></CreateReceptionForm></>}
      { wedding && reception && <><label>Reception</label><Summary location={reception.location} startDate={reception.startDate} endDate={reception.endDate}></Summary>
      <CreateMenuItemForm menuItemAdd={menuItemAdd}></CreateMenuItemForm>
      <List<IMenuOption> listItems={reception.menuOptions} name="menuOptions" setContentFunction={setContent} onclickEvent={onMenuOptionClick} ></List>
      </> }

    </>
  )
}

export default ReceptionMenu