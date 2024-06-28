import { useEffect, useState } from 'react'
import { ILocation } from '../../models/ILocation'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { selectLocations } from '../../redux/selectors/selectLocations'
import { getAllLocations } from '../../redux/slices/locationSlice'
import List from '../lists/genericlist'
import CreateLocationForm from './createLocationForm'


interface IProps{
    locationHandler : any
}

function HandleLocationForm(props : IProps) {
    const [location, setLocation] = useState<ILocation | undefined>()
    const locations = useAppSelector(selectLocations);
    const dispatch = useAppDispatch();
  
    useEffect(()=>{
      console.log("RENDERING " + locations.length)
  
      if(locations.length < 1)
        dispatch(getAllLocations())
    }, [])
  
  
    function setCurrentLocationEvent(event : ILocation){
  
      console.log("EVENT?")
      console.log(event)
      props.locationHandler(event)
      setLocation(event);
    }
  
    function setContent(location: ILocation){
      var content = `${location.title} ${location.address}`
      return content;
    }
  
    function resetLocation(){
      props.locationHandler(undefined);
      setLocation(undefined);

    }


  return (
    <>
        {location ? <><h2>{location.id} {location.title}</h2><button onClick={resetLocation}>ResetLocation</button></> :
        <> <label>Pick or Create a Location</label> <List<ILocation> listItems={locations} name='locations' onclickEvent={setCurrentLocationEvent} setContentFunction={setContent}></List>
        <CreateLocationForm></CreateLocationForm></> }
    </>
  )
}

export default HandleLocationForm