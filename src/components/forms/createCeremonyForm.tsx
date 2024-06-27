import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ICeremonyRequest } from '../../API/CreateCeremony'
import { ILocation } from '../../models/ILocation'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { selectCurrentLocation, selectLocations } from '../../redux/selectors/selectLocations'
import { getAllLocations, setCurrentLocation } from '../../redux/slices/locationSlice'
import { createCeremonyThunk } from '../../redux/slices/weddingSlice'
import List from '../lists/genericlist'
import CreateLocationForm from './createLocationForm'
import HandleLocationForm from './handleLocationForm'

interface IProps {
    wedding_id: number
}




function CreateCeremonyForm(props : IProps) {
  const current_location = useAppSelector(selectCurrentLocation);
  const locations = useAppSelector(selectLocations);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(()=>{
    console.log("RENDERING " + locations.length)

    if(locations.length < 1)
      dispatch(getAllLocations())
  }, [])



  function ceremonyFormHandler(formdata : any){

    console.log(formdata)
    if(current_location){
      var ceremony : ICeremonyRequest = {
        description: formdata.description,
        startDate: formdata.start_date,
        endDate: formdata.end_date,
        locationId: current_location,
        weddingId: props.wedding_id
      }
      if(ceremony)
        dispatch(createCeremonyThunk(ceremony));
    }
    

  }



  return (
    <>
        <HandleLocationForm></HandleLocationForm>
        <div>
          <label>createCeremonyForm</label>
          <form onSubmit={handleSubmit(ceremonyFormHandler)}>
            <label>Start: <input {...register("start_date")} type='datetime-local'></input></label>
            <label>End: <input {...register("end_date")} type='datetime-local'></input></label>
            <label>Description: <textarea {...register("description")}></textarea></label>
            <button type='submit'>Send</button>
          </form>
        </div>
    </>
  )
}

export default CreateCeremonyForm