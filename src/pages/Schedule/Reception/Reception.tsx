import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks"
import { selectReception, selectWedding } from "../../../redux/selectors/selectWeddingSlice"
import './Reception.sass'
import { selectLanguage } from "../../../redux/selectors/selectLanguage"
import { getReception } from "../../../redux/slices/weddingSlice"
import { isFuture } from "../../../utils/dateCompare"

function Reception() {
  const wedding = useAppSelector(selectWedding)
  const language = useAppSelector(selectLanguage).language
  const dispatch = useAppDispatch();
  const reception = useAppSelector(selectReception)
  useEffect(()=> {
    console.log("TRYING TO RENDER BOYS!!!!!!!!!!!!")
    console.log(wedding)
    if(wedding && !reception){
      setTimeout(function() {dispatch(getReception({weddingId: wedding?.id.toString(), language: language}));}, 500)
    }
  }, [])
  return (
    <>
      { reception ? 
      <div className="reception-content">
        <h2>{reception.location.title}</h2>
        <img src={reception.location.image}></img>
        {/* { isFuture(reception.endDate) ? 
          <label>{new Date(reception.startDate).toLocaleString()}-{new Date(reception.endDate).toLocaleTimeString()}</label> 
          : <label>{new Date(reception.startDate).toLocaleString()}</label> 
        }  */}
                <label>{reception.description}</label>
      </div> :  <div>Reception not added yet</div>

      }
    </>

  )
}

export default Reception