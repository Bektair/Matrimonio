import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ILocationRequest } from "../../API/CreateLocation";
import { googleApiKey } from "../../constants/environment";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { ICreateLocation, createLocationThunk } from "../../redux/slices/locationSlice";
import './createLocationForm.sass';
import LocationForm from "./LocationForm";
import { selectCeremony } from "../../redux/selectors/selectWeddingSlice";

function CreateLocationForm() {
    const dispatch = useAppDispatch();
    const ceremony = useAppSelector(selectCeremony)

    useEffect(()=>{
        console.log("REEEEEEEEEEEEEEEEEERENDER")



    }, [])

    function updateCeremony(formData :any){
        console.log(formData)


            var location = {
                title: formData.title,
                address: formData.address,
                placeName: "",
                body: formData.body,
                image: formData.img,
                country: "",
                region:"",
                lat: 0,
                lng: 0
            } as ILocationRequest

            if(location){
                console.log(formData)
                var myLocationRequest = { location: location, reception: false} as ICreateLocation
                if(myLocationRequest)
                    dispatch(createLocationThunk(myLocationRequest))
            }

    }


  return (
    <>
        <div>createLocationForm</div>
        <label>{ceremony?.location.address}</label>
        <LocationForm handleLocationSubmit={updateCeremony}></LocationForm>
    </>
  )
}

export default CreateLocationForm