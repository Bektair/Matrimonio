import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectCeremony, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import { getCeremony } from "../../../redux/slices/weddingSlice";
import { selectLanguage } from "../../../redux/selectors/selectLanguage";
import { isFuture } from "../../../utils/dateCompare";

function Ceremony() {
  const ceremony = useAppSelector(selectCeremony)
  const wedding = useAppSelector(selectWedding)
  const language = useAppSelector(selectLanguage).language
  const dispatch = useAppDispatch();

  useEffect(()=> {
    console.log("TRYING TO RENDER BOYS!!!!!!!!!!!!")
    console.log(wedding)
    if(wedding && !ceremony){
      setTimeout(function() {dispatch(getCeremony({weddingId: wedding?.id.toString(), language: language}));}, 500)
    }
  }, [])

  return (

          <>
      { ceremony ? 
      <div className="reception-content">
        <h2>{ceremony.location.title}</h2>
        <img src={ceremony.location.image}></img>

        { isFuture(ceremony.endDate) ? 
          <label>{new Date(ceremony.startDate).toLocaleString()}-{new Date(ceremony.endDate).toLocaleTimeString()}</label> 
          : <label>{new Date(ceremony.startDate).toLocaleString()}</label> 
        }        
        <label>{ceremony.description}</label>
      </div> :  <div>Ceremony not added yet</div>

      }
    </>

  )
}

export default Ceremony