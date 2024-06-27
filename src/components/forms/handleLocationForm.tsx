import React, { useEffect, useState } from 'react'
import { ILocation } from '../../models/ILocation'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { selectCurrentLocation, selectLocations } from '../../redux/selectors/selectLocations'
import { getAllLocations, setCurrentLocation } from '../../redux/slices/locationSlice'
import List from '../lists/genericlist'
import CreateLocationForm from './createLocationForm'

function HandleLocationForm() {
    const [location, setLocation] = useState<ILocation | undefined>()
    const current_location = useAppSelector(selectCurrentLocation);
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
      dispatch(setCurrentLocation(event.id));
      setLocation(event);
    }
  
    function setContent(location: ILocation){
      var content = `${location.title} ${location.address}`
      return content;
    }
  
    function resetLocation(){
      dispatch(setCurrentLocation(undefined));
    }


  return (
    <>
        { current_location && location ? <><h2>{current_location} {location.title}</h2><button onClick={resetLocation}>ResetLocation</button></> :
        <> <label>Pick or Create a Location</label> <List<ILocation> listItems={locations} name='locations' onclickEvent={setCurrentLocationEvent} setContentFunction={setContent}></List>
        <CreateLocationForm></CreateLocationForm></> }
    </>
  )
}

export default HandleLocationForm