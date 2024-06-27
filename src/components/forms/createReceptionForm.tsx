import React, { useEffect, useState } from 'react'
import { ILocation } from '../../models/ILocation';
import { selectCurrentLocation, selectLocations } from '../../redux/selectors/selectLocations';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { useForm } from 'react-hook-form';
import { getAllLocations } from '../../redux/slices/locationSlice';
import HandleLocationForm from './handleLocationForm';
import { createReceptionThunk } from '../../redux/slices/weddingSlice';
import { IReceptionRequest } from '../../API/CreateReception';

interface IProps {
    wedding_id: number
}


function CreateReceptionForm(props : IProps) {
    const [location, setLocation] = useState<ILocation | undefined>()
    const current_location = useAppSelector(selectCurrentLocation);
    const locations = useAppSelector(selectLocations);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();



    
    useEffect(()=>{
        console.log("RENDERING " + locations.length)
    
        if(locations.length < 1)
          dispatch(getAllLocations())
    }, [])
    
    function receptionFormHandler(formdata : any){

        console.log(formdata)
        if(current_location){
          var reception : IReceptionRequest = {
            description: formdata.description,
            startDate: formdata.start_date,
            endDate: formdata.end_date,
            locationId: current_location,
            weddingId: props.wedding_id,
            menuOptions:[]

          }
          if(reception)
            dispatch(createReceptionThunk(reception));
        }
        
    
      }


  return (
    <>
        <HandleLocationForm></HandleLocationForm>
        <div>
          <label>createCeremonyForm</label>
          <form onSubmit={handleSubmit(receptionFormHandler)}>
            <label>Start: <input {...register("start_date")} type='datetime-local'></input></label>
            <label>End: <input {...register("end_date")} type='datetime-local'></input></label>
            <label>Description: <textarea {...register("description")}></textarea></label>
            <button type='submit'>Send</button>
          </form>
        </div>
    </>
  )
}


export default CreateReceptionForm