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
import { createMenuOptionThunk, getReception } from "../../../redux/slices/weddingSlice"
import List from "../../../components/lists/genericlist"
import { selectLanguage } from "../../../redux/selectors/selectLanguage"
import ReceptionTranslationForm from "../../../components/forms/ReceptionTranslationForm"
import UpdateLocationForm from "../../../components/forms/UpdateLocationForm"

function ReceptionMenu() {
  const weddings = useAppSelector(selectWeddings)
  const wedding = useAppSelector(selectWedding)
  const reception = useAppSelector(selectReception)
  const language = useAppSelector(selectLanguage).language;
  const dispatch = useAppDispatch();
  const [menuItems, setMenuItems] = useState<IMenuOption[]>([])
  useEffect(()=>{
      if(weddings.length < 1)
          dispatch(getAllWeddings(language))
      else{
        if(wedding && !reception){
          dispatch(getReception({weddingId: wedding.id.toString(), language: language}))
        }
      }
      
  },[])

  function menuItemAdd(menuItem: IMenuOption){
    console.log("MENUITEM attempted added")
    console.log(menuItem)

    setMenuItems([...menuItems, { dishType: menuItem.dishType, 
        id: menuItem.id, image: menuItem.image, tags: menuItem.tags, language: language, isDefaultLanguage: true }])

    if(reception){
        var menuOptionRequest : IMenuOptionRequest =  {
            reception_id: reception.id,
            menuOption: menuItem
        }
       dispatch(createMenuOptionThunk(menuOptionRequest))
    }
  }

  function setContent(option: IMenuOption){
    
    return `${option.dishType} ${option.tags}`
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
      <UpdateLocationForm location={reception.location}></UpdateLocationForm>
      <CreateMenuItemForm menuItemAdd={menuItemAdd}></CreateMenuItemForm>
      <List<IMenuOption> listItems={reception.menuOptions} name="menuOptions" setContentFunction={setContent} onclickEvent={onMenuOptionClick} ></List>
      <ReceptionTranslationForm receptionId={reception.id.toString()} weddingId={wedding?.id.toString()}/>
      </> }

    </>
  )
}

export default ReceptionMenu