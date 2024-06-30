import { useEffect } from "react"
import UpdateLocationForm from "../../../components/forms/UpdateLocationForm"
import CreateCeremonyForm from "../../../components/forms/createCeremonyForm"
import WeddingList from "../../../components/lists/WeddingList"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectCeremony, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import { selectWeddings } from "../../../redux/selectors/selectWeddingsSlice"
import { getAllWeddings } from "../../../redux/slices/weddingsSlice"
import Summary from "../../Schedule/Summary"
import { selectCurrentLocation, selectCurrentLocationId, selectLocations } from "../../../redux/selectors/selectLocations"

function CeremonyMenu() {

    const weddings = useAppSelector(selectWeddings)
    const wedding = useAppSelector(selectWedding)
    const ceremony = useAppSelector(selectCeremony)
    const dispatch = useAppDispatch();
    const currentLocation = useAppSelector(selectCurrentLocation)
    useEffect(()=>{
        if(weddings.length < 1)
            dispatch(getAllWeddings)
        else{

        }
        
    },[currentLocation])


  //Location, Wedding, Descriptuion, StartDate, EndDate
  return (
    <>
        <WeddingList weddings={weddings} ceremony={true}></WeddingList>
        {!ceremony && wedding && <><label>You can add a ceremony to wedding with id {wedding.id}</label>
        <CreateCeremonyForm wedding_id={wedding?.id}></CreateCeremonyForm></>}
        { ceremony && wedding && <>
          <label>Ceremony</label>
          <Summary location={currentLocation ?? ceremony.location} startDate={ceremony.startDate} endDate={ceremony.endDate}></Summary>
          <UpdateLocationForm location={ceremony.location}></UpdateLocationForm>
        </> }
        
    </>
  )
}

export default CeremonyMenu