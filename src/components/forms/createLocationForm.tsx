import { useEffect } from "react";
import { ILocationRequest } from "../../API/CreateLocation";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectCeremony } from "../../redux/selectors/selectWeddingSlice";
import { ICreateLocation, createLocationThunk } from "../../redux/slices/locationSlice";
import LocationForm from "./LocationForm";
import './createLocationForm.sass';

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