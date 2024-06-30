import { useAppSelector } from "../../../redux/Hooks/hooks"
import { selectCeremony } from "../../../redux/selectors/selectWeddingSlice"

function Ceremony() {
  const ceremony = useAppSelector(selectCeremony)



  return (

          <>
      { ceremony ? 
      <div className="reception-content">
        <h2>{ceremony.location.title}</h2>
        <img src={ceremony.location.image}></img>
        <label>{new Date(ceremony.startDate).toLocaleString()}-{new Date(ceremony.endDate).toLocaleTimeString()}</label>        
        <label>{ceremony.description}</label>
      </div> :  <div>Reception not added yet</div>

      }
    </>

  )
}

export default Ceremony