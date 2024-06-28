import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IReceptionRequest } from '../../API/CreateReception';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectCurrentLocation, selectLocations } from '../../redux/selectors/selectLocations';
import { getAllLocations } from '../../redux/slices/locationSlice';
import { createMenuOptionThunk, createReceptionThunk } from '../../redux/slices/weddingSlice';
import CreateMenuItemForm from './createMenuItemForm';
import HandleLocationForm from './handleLocationForm';
import { IMenuOption } from '../../models/IMenuOption';
import { selectReception } from '../../redux/selectors/selectWeddingSlice';
import { IMenuOptionRequest } from '../../API/CreateMenuOption';
import { ILocation } from '../../models/ILocation';


interface IProps {
    wedding_id: number
}


function CreateReceptionForm(props : IProps) {
    const locations = useAppSelector(selectLocations);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const [location, setLocation] = useState<ILocation | undefined>()


    
    useEffect(()=>{
        console.log("RENDERING " + locations.length)
    
        if(locations.length < 1)
          dispatch(getAllLocations())
    }, [])
    
    function receptionFormHandler(formdata : any){

        console.log(formdata)
        if(location){
          var reception : IReceptionRequest = {
            description: formdata.description,
            startDate: formdata.start_date,
            endDate: formdata.end_date,
            locationId: location.id,
            weddingId: props.wedding_id, 
            menuOptions:[]

          }
          if(reception)
            dispatch(createReceptionThunk(reception));
        }
        
    
    }

    function locationHandler(location : ILocation){
        setLocation(location)
    }




  return (
    <>
        {!location && <HandleLocationForm locationHandler={locationHandler}></HandleLocationForm>}
        <div>
          <label>createReceptionForm</label>
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