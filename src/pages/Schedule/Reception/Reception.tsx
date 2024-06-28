import { useAppSelector } from "../../../redux/Hooks/hooks"
import { selectReception } from "../../../redux/selectors/selectWeddingSlice"
import './Reception.sass'

function Reception() {

  const reception = useAppSelector(selectReception)

  return (
    <>
      { reception ? 
      <div className="reception-content">
        <h2>{reception.location.title}</h2>
        <img src={reception.location.image}></img>
        <label>{new Date(reception.startDate).toLocaleString()}-{new Date(reception.endDate).toLocaleTimeString()}</label>        
        <label>{reception.description}</label>
      </div> :  <div>Reception not added yet</div>

      }
    </>

  )
}

export default Reception