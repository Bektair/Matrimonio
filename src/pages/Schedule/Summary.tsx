import { googleApiKey } from "../../constants/environment"
import { ILocation } from "../../models/ILocation"
import { isFuture } from "../../utils/dateCompare"
import './Summary.sass'

interface IProps {
    location : ILocation
    startDate: number
    endDate: number
    showDate: boolean
}

function Summary(props: IProps) {
    return (
        <div>
            <div className='summaryTab'>
                <h3>{props.location.title}</h3>
                { props.showDate && isFuture(props.endDate) ? 
                   <label>{new Date(props.startDate).toLocaleString()}-{new Date(props.endDate).toLocaleTimeString()}</label> 
                    : <label>{new Date(props.startDate).toLocaleString()}</label> 
                }        
                <iframe
                    className="location-frame"
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