import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ILocationRequest } from "../../API/CreateLocation";
import { googleApiKey } from "../../constants/environment";
import { useAppDispatch } from "../../redux/Hooks/hooks";
import './createLocationForm.sass';
import { ICreateLocation, createLocationThunk } from "../../redux/slices/locationSlice";

function CreateLocationForm() {
    const { register, handleSubmit } = useForm();
    const [address, setAddress] = useState("");
    const dispatch = useAppDispatch();
    const [error, setError] = useState(null);

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

    function setAddresGoogle(e : any){
        setAddress(e.target.value)
        
    }

  return (
    <>

        <div>createLocationForm</div>
        <label>{address}{error}</label>
        <form id='locationUpdateComponent'  onSubmit={handleSubmit(updateCeremony)}>
            <input {...register("title")} type="text" placeholder="title" name="title"></input>
            <input {...register("img")} type="text" placeholder="image" name="img"></input>
            <label>Updates on address change
            <input {...register("address")} type="text" placeholder="address" onInput={setAddresGoogle} name="address"/></label>
            {address.length > 0 ? <iframe
                id="location-iframe"
                width="600"
                height="450"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}
                    &q=${address}` }> 
            </iframe>: <img id="loadingLocationMap" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Blank_Map_Pacific_World.svg/1200px-Blank_Map_Pacific_World.svg.png"></img> }
            <textarea {...register("body")} name="body"></textarea>
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default CreateLocationForm