import { useEffect } from "react";
import { ILocationRequest } from "../../API/CreateLocation";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectLanguage } from "../../redux/selectors/selectLanguage";
import { selectCeremony } from "../../redux/selectors/selectWeddingSlice";
import { createLocationThunk } from "../../redux/slices/locationSlice";
import LocationForm from "./LocationForm";
import './createLocationForm.sass';

function CreateLocationForm() {
    const dispatch = useAppDispatch();
    const ceremony = useAppSelector(selectCeremony)
    const language = useAppSelector(selectLanguage).language;

    useEffect(()=>{
        console.log("REEEEEEEEEEEEEEEEEERENDER")



    }, [])

    function updateLocation(formData :any){
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
                lng: 0,
                language: language,
                isDefaultLanguage: true
            } as ILocationRequest

            if(location){
                console.log(formData)
                dispatch(createLocationThunk(location))
            }

    }


  return (
    <>
        <div>createLocationForm</div>
        <label>{ceremony?.location.address}</label>
        <LocationForm handleLocationSubmit={updateLocation}></LocationForm>
    </>
  )
}

export default CreateLocationForm