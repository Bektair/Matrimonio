import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { googleApiKey } from '../../constants/environment';
import { ILocation } from '../../models/ILocation';

interface IProps {
    handleLocationSubmit: any
    location?: ILocation
}


function LocationForm(props : IProps) {
    const { register, handleSubmit } = useForm();
    const [address, setAddress] = useState(props.location?.address ?? "");

  return (
    <form id='locationUpdateComponent'  onSubmit={handleSubmit(props.handleLocationSubmit)}>
            <input {...register("title")} type="text" placeholder="title" name="title" defaultValue={props.location?.title}/>
            <input {...register("img")} type="text" placeholder="image" name="img" defaultValue={props.location?.image}/>
            <label>Updates on address change
            <input {...register("address")} type="text" placeholder="address" defaultValue={props.location?.address} onInput={(e : any)=> setAddress(e.target.value)} name="address"/></label>
            {address.length > 0 ? <iframe
                id="location-iframe"
                width="600"
                height="450"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}
                    &q=${address}` }> 
            </iframe>: <img id="loadingLocationMap" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Blank_Map_Pacific_World.svg/1200px-Blank_Map_Pacific_World.svg.png"></img> }
            <textarea {...register("body")} name="body" defaultValue={props.location?.body}></textarea>
            <button type="submit" name='Update'>Update</button>
            <button type="submit" name='Translate'>AddTranslation</button>
        </form>
  )
}

export default LocationForm