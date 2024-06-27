import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectReception, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import { selectWeddings } from "../../../redux/selectors/selectWeddingsSlice"
import { getAllWeddings } from "../../../redux/slices/weddingsSlice"
import WeddingList from "../../../components/lists/WeddingList"
import Summary from "../../Schedule/Summary"
import CreateReceptionForm from "../../../components/forms/createReceptionForm"

function ReceptionMenu() {
  const weddings = useAppSelector(selectWeddings)
  const wedding = useAppSelector(selectWedding)
  const reception = useAppSelector(selectReception)
  const dispatch = useAppDispatch();

  useEffect(()=>{
      if(weddings.length < 1)
          dispatch(getAllWeddings)
      else{
      }
      
  },[])

  return (
    <>
      <div>ReceptionMenu</div>
      <WeddingList weddings={weddings} reception={true}></WeddingList>
      { wedding && !reception && <><label>You can add a reception to wedding with id {wedding.id}</label>
      <CreateReceptionForm wedding_id={wedding?.id}></CreateReceptionForm></>}

      { wedding && reception && <><label>Reception</label><Summary location={reception.location} startDate={reception.startDate} endDate={reception.endDate}></Summary></> }

    </>
  )
}

export default ReceptionMenu