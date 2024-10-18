import { useEffect } from "react"
import UpdateLocationForm from "../../../components/forms/UpdateLocationForm"
import CreateCeremonyForm from "../../../components/forms/createCeremonyForm"
import WeddingList from "../../../components/lists/WeddingList"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectCurrentLocation } from "../../../redux/selectors/selectLocations"
import { selectCeremony, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import { selectWeddings } from "../../../redux/selectors/selectWeddingsSlice"
import { getAllWeddings } from "../../../redux/slices/weddingsSlice"
import Summary from "../../Schedule/Summary"
import { selectLanguage } from "../../../redux/selectors/selectLanguage"
import TranslationCeremonyForm from "../../../components/forms/TranslationCeremonyForm"

function CeremonyMenu() {

    const weddings = useAppSelector(selectWeddings)
    const wedding = useAppSelector(selectWedding)
    const ceremony = useAppSelector(selectCeremony)
    const dispatch = useAppDispatch();
    const currentLocation = useAppSelector(selectCurrentLocation)
    const language = useAppSelector(selectLanguage).language;

    useEffect(()=>{
        if(weddings.length < 1)
            dispatch(getAllWeddings(language))
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
          <Summary location={currentLocation ?? ceremony.location} startDate={ceremony.startDate} endDate={ceremony.endDate} showDate={true}></Summary>
          <UpdateLocationForm location={ceremony.location}></UpdateLocationForm>
          <TranslationCeremonyForm ceremonyId={ceremony.id.toString()} weddingId={wedding?.id.toString()}/>
        </> }
        
    </>
  )
}

export default CeremonyMenu