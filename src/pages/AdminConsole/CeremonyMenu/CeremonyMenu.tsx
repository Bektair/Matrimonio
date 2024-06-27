import { useEffect } from "react"
import WeddingList from "../../../components/lists/WeddingList"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectCeremony, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import { selectWeddings } from "../../../redux/selectors/selectWeddingsSlice"
import { getAllWeddings } from "../../../redux/slices/weddingsSlice"
import { getCeremony } from "../../../redux/slices/weddingSlice"
import CreateCeremonyForm from "../../../components/forms/createCeremonyForm"
import Summary from "../../Schedule/Summary"

function CeremonyMenu() {

    const weddings = useAppSelector(selectWeddings)
    const wedding = useAppSelector(selectWedding)
    const ceremony = useAppSelector(selectCeremony)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(weddings.length < 1)
            dispatch(getAllWeddings)
        else{
        }
        
    },[])


  //Location, Wedding, Descriptuion, StartDate, EndDate
  return (
    <>
        <WeddingList weddings={weddings} ceremony={true}></WeddingList>
        {!ceremony && wedding && <><label>You can add a ceremony to wedding with id {wedding.id}</label>
        <CreateCeremonyForm wedding_id={wedding?.id}></CreateCeremonyForm></>}
        { ceremony && <><label>Ceremony</label><Summary location={ceremony.location} startDate={ceremony.startDate} endDate={ceremony.endDate}></Summary></> }
        
    </>
  )
}

export default CeremonyMenu