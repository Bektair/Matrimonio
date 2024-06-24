import { googleApiKey } from "../../constants/environment"
import { ILocation } from "../../models/ILocation"
import './Summary.sass'

interface IProps {
    location : ILocation
    startDate: number
    endDate: number
}

function Summary(props: IProps) {
    return (
        <div>
            <div className='summaryTab'>
                <h3>{props.location.title}</h3>
                <label>{new Date(props.startDate).toLocaleString()}-{new Date(props.endDate).toLocaleTimeString()}</label>
                <iframe
                    width="600"
                    height="450"
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}
                        &q=${props.location.address}`}>
                </iframe>
            </div>
            
        </div>
      )
}
    

export default Summary