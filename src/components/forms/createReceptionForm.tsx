import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IReceptionRequest } from '../../API/CreateReception';
import { ILocation } from '../../models/ILocation';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectLocations } from '../../redux/selectors/selectLocations';
import { getAllLocations } from '../../redux/slices/locationSlice';
import { createReceptionThunk } from '../../redux/slices/weddingSlice';
import HandleLocationForm from './handleLocationForm';
import { selectLanguage } from '../../redux/selectors/selectLanguage';


interface IProps {
    wedding_id: number
}


function CreateReceptionForm(props : IProps) {
    const locations = useAppSelector(selectLocations);
    const language  = useAppSelector(selectLanguage).language;
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
            language: language,
            isDefaultLanguage: true,
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